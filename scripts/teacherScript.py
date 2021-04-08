import pandas as pd
import json
import re
from math import isnan

filename = './spreadsheets/STAFF-Visualisation-FULL.xlsx'
sheetname = '2020-Summary'
outputName = './json/teachers.json'
mergedOutputName = './json/merged.json'
# List of possible types of positions and departments
positionList = ['Professor', 'Lektor', 'Doktorand', 'Adjunkt', 'Bitr Lektor', 'External', 'Forskare', 'Teknolog', 'Postdoc']
departmentList = ['MID', 'External', 'TMH', 'RPL', 'CST', 'COS', 'SCS']
# Object we will save in a JSON file
teachers = {}
# Courses both in VT and HT in course file
dublicateCourses = ['DH2642', 'DH2632', 'DH2400'] # TODO: this is a manually added list (may change)

roles = ['Frl', 'Ovn', 'Lab', 'Ha', 'Ex', 'Ku', 'Adm']
keyMap = {
            'Frl' : 'Forelasning (Frl) Allocated',
            'Ovn' : 'Ovning (Ovn) Allocated',
            'Lab' : 'Laboration (La) Allocated',
            'Ha' : 'Handledning (Ha) Allocated',
            'Ex' : 'Examination (Ex) Allocated',
            'Ku' : 'Kursutveckling (Ku) Allocated',
            'Adm' : 'Administration (Adm) Allocated'
        }
alloKeys = [
            'Forelasning (Frl) Allocated',
            'Ovning (Ovn) Allocated',
            'Laboration (La) Allocated',
            'Handledning (Ha) Allocated',
            'Examination (Ex) Allocated',
            'Kursutveckling (Ku) Allocated',
            'Administration (Adm) Allocated'
            ]

budgKeys = [
            'Forelasning (Frl) Budgeted',
            'Ovning (Ovn) Budgeted',
            'Laboration (La) Budgeted',
            'Handledning (Ha) Budgeted',
            'Examination (Ex) Budgeted',
            'Kursutveckling (Ku) Budgeted',
            'Administration (Adm) Budgeted',
            ]

alloTotalKey = 'Totalt Allocated'
budgTotalKey = 'Totalt Budgeted'


def isEmpty(val, sub):
    if isinstance(val, float) and isnan(float(val)):
        return sub
    return val

def cleanNumber(numb):
    # Change dash to minus
    numbNoDash = numb.replace('−','-')
    # Change , into .
    numbNoComma = numbNoDash.replace(',', '.')
    # remove \r endings
    numbNoEscape = numbNoComma if not re.search(r'\r', numbNoComma) else numbNoComma[:-1]
    # Remove % sign from end
    numbNoProc = numbNoEscape[:-1] if numbNoEscape.endswith('%') else numbNoEscape
    # If only . then replace with zero
    numbNoEmpty = 0 if numbNoProc == '.' else numbNoProc
    return float(numbNoEmpty)

def addName(name):
    # Check if name has already occured
    if name in teachers:
        raise ValueError(f'Name {name} cannot occur more than ones')
    else:
        teachers[name] = {}

def addPosition(name, position):
    # Check if position is one of available positions
    if position not in positionList:
        raise ValueError(f'{name}: has position {position} which is not a valid position')
    else:
        teachers[name]['Position'] = position

def addDepartment(name, department):
    # Check if department is one of available departments
    if department not in departmentList:
        raise ValueError(f'{name}: has department {department} which is not a valid department')
    else:
        teachers[name]['Department'] = department

def addColumnType1(name, value, key, sub, minVal, maxVal):
    if isinstance(value, float):
        # If column is empty replace with some value
        if isnan(float(value)):
            teachers[name][key] = sub
            return

        # if value if between 0 and 1 it is decimal
        if value > 0 and value < 1:
            value = str(value * 100)
        else:
            value = str(value)

    if isinstance(value, int):
        value = str(value)       

    result = cleanNumber(value) 
    
    # Check that result is between 0-500 (most should be 0-100 but some "teachers" are temp teacher values that can be higher, check if reasonable)
    if result < minVal or result > maxVal:
        raise ValueError(f'{name}: for column {key} value is {result} which is not between 0-100')
    
    # Limit to 3 notable characters
    teachers[name][key] = round(result, 3)  

def addCourses(name, value, keyResponsible, keyCourses, gruVal, gruKey, appendix):
    courseResponsible = []
    allCourses = []

    # Handle empty columns
    if isinstance(value, float) and isnan(float(value)):
        teachers[name][keyResponsible] = courseResponsible
        teachers[name][keyCourses] = allCourses

        # If Gru empty, replace with 0.0
        if isinstance(gruVal, float):
            teachers[name][gruKey] = 0.0

        else: 
            cleanGru = cleanNumber(gruVal)
            if cleanGru != 0.0:
                raise ValueError(f'For {name} {keyCourses} are empty but {gruKey} has value {cleanGru}')
        
            teachers[name][gruKey] = cleanGru
        return

    gruSum = 0.0
    # Get all courses in column, they are seperated by '\n'
    courses = value.split('\n')
    for i in range(len(courses)):
        # Split course line into course code, short name and %
        line = courses[i].split(' ')
        # If course responsible
        if line[0][0] == '*':
            code = line[0][1:].upper()
            if code in dublicateCourses:
                code += appendix
            courseResponsible.append(code)
        else:
            code = line[0].upper()
            if code in dublicateCourses:
                code += appendix

        # Remove ':' from short name
        shortName = line[1][:-1] if line[1][-1] == ':' else line[1]
        workPercentage = cleanNumber(line[2])

        if len(code) > 8 or len(code) < 6:
            raise ValueError(f'{name} has course with code {code}, length of code should be 6-8')

        if len(shortName) > 11 or len(shortName) < 1:
            raise ValueError(f'{name} has course {code} which has shortname {shortName}, length of shortname should be 1-11')

        if workPercentage > 100 or workPercentage < 0:
            raise ValueError(f'{name} has course {code} which has invalid work %: {workPercentage}')
        
        gruSum += workPercentage
        tmp = {
            'Course Code': code,
            'Short Name': shortName,
            'Work %': workPercentage
        }

        allCourses.append(tmp)

    cleanGru = cleanNumber(gruVal)
    # TODO: Add more precision if data is corrected
    if round( (gruSum - 0.1), 4) <= cleanGru <= round((gruSum + 0.1), 4):
        teachers[name][keyResponsible] = courseResponsible
        teachers[name][keyCourses] = allCourses
        teachers[name][gruKey] = cleanGru
    else:
        raise ValueError(f'{name}: Sum of work does not match gru value. {gruKey}: {cleanGru} | Sum: {gruSum}')
    
def gruCheck(name):
    bem = teachers[name]['Bemnnad HCT Gru (%)']
    gruVt = teachers[name]['Gru VT (%)']
    gruHt = teachers[name]['Gru HT (%)']
    selfDev = teachers[name]['Self-development & Friskvard (%)']
    extra = teachers[name]['Extra (%)']
    # Bemnnad has more precision than Other columns so we have to allow margin of error
    # Extra seems to be rounded to 1 number so it looses a lot of precision, need to allow larger margin of error if extra is not 0
    # TODO: Add more precision if data is corrected
    margin = 0.5 if extra > 0 else 0.1
    summed = round(gruVt + gruHt + selfDev + extra, 3)
    if (bem - margin) <= summed <= (bem + margin):
        return
    
    raise ValueError(f'{name}: Sum: {summed} | Bemnnad: {bem} | margin: {margin}')

def addBalance(name, value):
    bem = teachers[name]['Bemnnad HCT Gru (%)']
    kon = teachers[name]['Kontering HCT (%)']

    # If empty, calculate the value
    if isinstance(value, float) and isnan(float(value)):
        value = round( (bem - kon) ,2)

    cleanVal = cleanNumber(str(value))

    # Check that our calculated value matches the balance column
    if cleanVal != round((bem - kon), 2):
        #print(f'{name}: Balance: {cleanVal} | calc balance: {round(bem-kon, 3)}| Kontering: {kon} | Bemnnad: {bem}')
        raise ValueError(f'{name}: Balance: {cleanVal} | Kontering: {kon} | Bemnnad: {bem}')
        
    teachers[name]['Balance (%)'] = cleanVal

def addHistoryBalance(name, gru19, gru20):
    '''
    Gru = Balance, don't need to check if it is empty since we already processed tha column and calculated the value if it was not there.
    Gru19 can be empty but then we replace that value with '0'
    Gru20 can be empty but then we calculate the value.
    '''
    # Get current Gru (balance)
    gru = teachers[name]['Balance (%)']
    # Check if gru19 is empty, then insert '0'. Process value
    cleanGru19 = cleanNumber(isEmpty(gru19, '0.0'))
    # Check if gru20 is empty, then calculate it. Process value
    cleanGru20 = cleanNumber(isEmpty( gru20, str(round( cleanGru19 + gru , 2)) ))

    '''
    TODO: This is an assumption. Where Gru19 is empty and Gru20 is equal to Kontering, I assume that this is an error in the sheet
    and set Gru20 as the current balance.
    '''
    kon = teachers[name]['Kontering HCT (%)']
    if isinstance(gru19, float) and isnan(float(gru19)):
        if cleanGru20 == -kon:
            teachers[name]['BOY Balance'] = cleanGru19
            teachers[name]['EOY Balance'] = gru
            return


    if cleanGru20 != round( cleanGru19 + gru, 2):
        #print(f'{name}: Gru20: {cleanGru20} | Calc Gru20: {round(cleanGru19 + gru, 2)} | balance: {gru} | gru19: {cleanGru19}')
        raise ValueError(f'{name}: Gru20: {cleanGru20} | Calc Gru20: {round(cleanGru19 + gru, 2)} | balance: {gru} | gru19: {cleanGru19}')

    teachers[name]['BOY Balance'] = cleanGru19
    teachers[name]['EOY Balance'] = cleanGru20

def teacherHoursMatchAllocated(courses, toAssert):

    for course in courses:
        sums = {
            'Frl' : 0,
            'Ovn' : 0,
            'Lab' : 0,
            'Ha' : 0,
            'Ex' : 0,
            'Ku' : 0,
            'Adm' : 0
        }

        # Sum all teacher hours for each role (Adm, Ovn,...)
        for teacher in courses[course]['Teachers']:
            for teacherRole in courses[course]['Teachers'][teacher]:
                sums[teacherRole] += courses[course]['Teachers'][teacher][teacherRole] 

        # Summed hours for each role should match 'Allocated' hours for that role
        for role in roles:
            if toAssert == True:
                assert(sums[role] == courses[course][keyMap[role]])
            else:
                # If it does not match -> overwrite with calculated value
                if sums[role] != courses[course][keyMap[role]]:
                    courses[course][keyMap[role]] = sums[role]

def checkIfTotalMatches(courses, toAssert):
    for course in courses:
        alloSum = 0
        budgSum = 0
        for aKey in alloKeys:
            alloSum += courses[course][aKey]
        
        for bKey in budgKeys:
            budgSum += courses[course][bKey]

        if toAssert == True:
            assert(alloSum == courses[course][alloTotalKey])
            assert(budgSum == courses[course][budgTotalKey])
        else:
            if alloSum != courses[course][alloTotalKey]:
                courses[course][alloTotalKey] = alloSum
            
            if budgSum != courses[course][budgTotalKey]:
                courses[course][budgTotalKey] = budgSum 

def main():

    # Read excel file and specific sheet
    data = pd.read_excel(filename, sheetname)
    # Remove empty rows (rows where there is not teacher name)
    data = data[data['Name'].notnull()]
    # Remove "Unnamed columns", there are a lot of columns that are not being used in spreadsheet
    data = data.loc[:, ~data.columns.str.contains('^Unnamed')]
    # Reomve "kurs columns", empty columns that are named Kurs 1, Kurs2, ....
    data = data.loc[:, ~data.columns.str.contains('^Kurs')]

    for index, row in data.iterrows():
        name = row['Name']
        # Check if name, position and department are OK and add to dictonary
        addName(name)
        addPosition(name, row['Position'])
        addDepartment(name, row['Dept'])

        # Validate column number and add to json
        addColumnType1(name, row['Kontering HCT (%)'], 'Kontering HCT (%)', 0.0, 0.0, 100.0)
        addColumnType1(name, row['Bemnnad HCT Gru (%)'], 'Bemnnad HCT Gru (%)', 0.0, 0.0, float('inf'))
        
        # Add courses, course responsible and sum of work (Gru)
        addCourses(name, row['VT courses + exjobb'], 'Responsible VT', 'VT Courses', row['Gru VT (%).1'], 'Gru VT (%)', '-V')
        addCourses(name, row['HT courses'], 'Responsible HT', 'HT Courses', row['Gru HT (%).1'], 'Gru HT (%)', '-H')
        
        # Add Self-dev and extra
        addColumnType1(name, row['Self-development &Friskvård (%)'], 'Self-development & Friskvard (%)', 0.0, 0.0, 100.0)
        addColumnType1(name, row['Extra (%)'], 'Extra (%)', 0.0, 0.0, 100.0)

        # Assert that Gru VT + Gru Ht + Self-dev + Extra equals Bemnnad HCT
        gruCheck(name) # TODO: Change precision if spreadsheet improved

        # Read and validate Balance (%)
        addBalance(name, row['Balance (%)'])
        addHistoryBalance(name, row['GRU balance 19'], row['GRU balance 20']) # TODO: A lot of assumptions made


    # Loop course data and add hour totals to teacherdata
    #courseFN = './json/courses.json'
    with open('./json/courses.json', encoding='utf-8') as f:
        courseData = json.load(f)

    for teacher in teachers:
        teacherTotals = {
            'Frl': 0,
            'Ovn': 0,
            'Lab': 0,
            'Ha': 0,
            'Ex': 0,
            'Ku': 0,
            'Adm': 0
        }
        courseTotals = {}
        for course in courseData:
            if teacher in courseData[course]['Teachers']:
                courseTotal = 0
                for role in courseData[course]['Teachers'][teacher]:
                    teacherTotals[role] += courseData[course]['Teachers'][teacher][role]
                    courseTotal += courseData[course]['Teachers'][teacher][role]

                courseTotals[course] = courseTotal

        # Get Total hours for teacher
        total = sum(teacherTotals.values())
        # Add total to object
        teacherTotals['Total'] = total
        # Validate that data seems correct
        if total == 0 and teachers[teacher]['Bemnnad HCT Gru (%)'] != 0:
           raise ValueError(f'{teacher} has bemnnad gru work but was not found in any courses')
        
        # Add hours broken down to teacher data
        teachers[teacher]['Hours'] = teacherTotals

        # Course totals should match teacher totals
        ct = sum(courseTotals.values())
        if ct != total:
            raise ValueError(f'{teacher} sum of course hours chould match sum of breakdwon hours. CourseH: {ct} | breakdownh: {total}')

        teachers[teacher]['Course Hours Totals'] = courseTotals

        # Add "Yearly hours" for teachers, this is an estimate of how many hours the teacher is hired to work
        defaultValues = {
            'Professor': 1732,
            'Lektor': 1732,
            'Doktorand': 1600,
            'Adjunkt': 1732,
            'Bitr Lektor': 1330,
            'External': 1700,
            'Forskare': 1550,
            'Teknolog': 1700,
            'Postdoc': 1700
        }
        yh = 0
        if teachers[teacher]['Bemnnad HCT Gru (%)'] == 0.0 or teachers[teacher]['Hours']['Total'] == 0:
            yh = defaultValues[ teachers[teacher]['Position'] ]
        else: 
            yh = round( ( teachers[teacher]['Hours']['Total'] / (teachers[teacher]['Bemnnad HCT Gru (%)'] / 100) ) , 0)

        teachers[teacher]['Yearly Hours'] = int(yh)

        # Add comment slots
        teachers[teacher]['Admin Comments'] = []
        teachers[teacher]['User Comments'] = []

        # Add responsible to course data
        for courseVT in teachers[teacher]['Responsible VT']:
            assert(courseVT in courseData)
            courseData[courseVT]['Responsible'].append(teacher)

        for courseHT in teachers[teacher]['Responsible HT']:
            assert(courseHT in courseData)
            courseData[courseHT]['Responsible'].append(teacher)

    
    
    teacherHoursMatchAllocated(courseData, False)
    checkIfTotalMatches(courseData, False)

    teacherHoursMatchAllocated(courseData, True)
    checkIfTotalMatches(courseData, True)

    # Save as JSON
    with open(outputName, 'w', encoding='utf8') as outfile:
            json.dump(teachers, outfile, ensure_ascii=False)

    # Merge teachers and courses into one json
    with open(mergedOutputName, 'w', encoding='utf8') as outfile:
        merged = {
            'data1920': {
                'teachers': teachers,
                'courses': courseData
            }
        }
        json.dump(merged, outfile, ensure_ascii=False)

        







    




    #print(teachers)
        



if __name__ == "__main__":
    main()