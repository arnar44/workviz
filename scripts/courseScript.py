import pandas as pd
import re
import json
from math import isnan
from datetime import date

filename = './spreadsheets/STAFF-Visualisation-FULL.xlsx'
sheetname = ['VT20', 'HT20']
outputName = './json/courses.json'
dublicateAppend = ['V', 'H']
periods = ['1','2','3','4','Summer']
courses = {}
readingHT = False
keyList = []
keyOffset = 0
centralLineKeys = {
    3: 'Balans (kr)', 
    10: 'SU-studentar',
    19: 'Larartimmar/elevpoang', 
    20: 'Emplyee cost+LKP (kr)'
}
tripleLineKeys = {
    4: 'Kursdata Forelasningar (h)',
    5: 'Kursdata Ovningar (h)',
    6: 'Kursdata Datorlabb-timmar (h)',
    7: 'Kursdata Salstentor (st)',
    8: 'Kursdata Grupper (st)',
    9: 'Kursdata KTH-Studenter (st)'
}
doubleLineKeys = {
    11: 'Forelasning (Frl)',
    12: 'Ovning (Ovn)',
    13: 'Laboration (La)',
    14: 'Handledning (Ha)',
    15: 'Examination (Ex)',
    16: 'Kursutveckling (Ku)',
    17: 'Administration (Adm)',
    18: 'Totalt',
}
roles = ['Frl', 'Ovn', 'Lab', 'Ha', 'Ex', 'Ku', 'Adm']


def isEmpty(val):
    return isinstance(val, float) and isnan(float(val))

def isfloat(val):
    try:
        val = float(val)
    except ValueError:
        return False
    else: 
        return True

def isint(val):
    try:
        a = float(val)
        b = int(a)
    except ValueError:
        return False
    else:
        return a == b
 
def getProportionNumber(val, sub):
    if isinstance(val, float) or isinstance(val, int):
        val = str(val)
    
    if not isinstance(val, str):
        raise ValueError(f'Proportion number must be int, float, string. Got: {val} | type: {type(val)}')
    
    val = val.replace('−','-').replace(',', '.').replace(' ', '').replace('%', '')
    val = val.replace(u'\xa0', '').replace(r'\r','')

    try:
        val = float(val)
        val = 'NA' if isnan(val) else val
    except ValueError:
        val = sub
    
    return val

def replaceEmpty(value, sub):
    '''
    If column was empty it will be read as NaN. If the column was empty we will replace it with
    "sub" if it was not we will return the column value
    '''
    if isinstance(value, float) and isnan(float(value)):
        return sub
    return value

def cleanNumber(numb):
    '''
    numb is a string representing a number. Many values in spreadsheet include dash instead of minus symbol
    and \r or % endings, we will replace these incorrect values with the correct ones. Return a float, i.e. turn string into
    number when it has been cleaned.
    '''
    numb = numb.replace('−','-').replace(',', '.').replace(' ', '').replace(u'\xa0', '')
    numb = numb if not re.search(r'\r', numb) else numb[:-1]
    numb = numb[:-1] if numb.endswith('%') else numb
    numb = 0 if numb == '.' else numb
    return float(numb)

def determineValue(val, sub):
    # If is empty
    if isEmpty(val):
        return sub
    
    # If it is not string, int or float we throw an error
    if not isinstance(val, str) and not isinstance(val, int) and not isinstance(val, float):
        raise ValueError(f'Metric Value must be int, float, string. Got: {val} | type: {type(val)}')

    # clean the value
    val = cleanNumber(str(val))

    # Determine if it is floar or int
    if isint(val):
        return int(val)
    elif isfloat(val):
        return float(val)

    # If no match
    raise ValueError(f'Final value was neither int nor float. Got: {val} | type: {type(val)}')
   
def notEmptyString(val):
    if (isinstance(val, float) and isnan(float(val))) or not isinstance(val, str):
        raise ValueError(f'Expected string, got empty/not string: {val}')

def notEmptyFloat(val):
    if isEmpty(val):
        raise ValueError(f'Empty column value not allowed: {val}')

    if isinstance(val, str):
        val = cleanNumber(val)

    if isinstance(val, int):
        val = float(val)

    if not isinstance(val, float):
        raise ValueError(f'Expected float got: {val} of type: {type(val)}')

    return val

def isPercentage(val):
    if isEmpty(val):
        raise ValueError(f'Expected percentage, got empty column: {val}')

    if isinstance(val, str) or isinstance(val, int):
        val = float(val)

    if not isinstance(val, float): 
        raise ValueError(f'Expected percentage value to be of type float or int: {val}')
    if not (0.0 <= val <= 1.0):
        raise ValueError(f'Expected percentage value between 0-1 got: {val}')

    return val

def validatePeriods(val):
    for i in val:
        if i not in periods:
            raise ValueError(f'Value: {i} is not a valid period')

def getPeriod(value):
    '''
    First column in the first row for each course is the periods that course is tought in.
    In some cases the periods got saved as dates. Need to read the periods and validate.
    '''
    if isinstance(value, date):
        res = [str(value.month), str(value.day)]

    elif 'summer' in str(value):
        res = ['Summer']

    else:
        res = str(value).split()

    validatePeriods(res)
    return res
    
def getSeason(period):
    if period == ['1','2','3','4']:
        return 'All'
    elif period == ['1'] or period == ['2'] or period == ['1','2']:
        return 'HT'
    elif period == ['3'] or period == ['4'] or period == ['3','4']:
        return 'VT'
    elif period == ['Summer']:
        return 'Summer'
    else:
        raise ValueError(f'Unknown Season for period: {period}')

def createCourse(period, code):
    '''
    When we read the first row we are reading the course Code and which periods its tought in.
    '''
    # Handle period
    period = getPeriod(period)
    # Add Season key -> VT, HT, Summer
    season = getSeason(period)

    tmp = {
        'Period': period,
        'Season': season
    }

    code = code.upper()

    # If couse is in both VT and HT, append V and H to course name
    if code in courses:
        courses[code + '-' + dublicateAppend[not readingHT]] = courses.pop(code)
        courses[code + '-' + dublicateAppend[readingHT]] = tmp
        ind = keyList.index(code)
        keyList[ind] = f'{code}-{dublicateAppend[not readingHT]}'
        keyList.append(f'{code}-{dublicateAppend[readingHT]}')
    else:
        courses[code] = tmp
        keyList.append(code)

def addShortName(p1, p2, shortName, ind):
    '''
    Reads Second line in sheet which includes 2 Unknown percentages
    and the short name for the course.
    '''
    # Validate inputs
    notEmptyString(shortName)
    p1 = isPercentage(p1)
    p2 = isPercentage(p2)
    # Get for what course this data is for
    key = keyList[ind + keyOffset]
    # Add data to course
    courses[key]['Short Name'] = shortName
    '''
    # TODO: Un-comment if data is needed
    courses[key]['Percentage 1'] = p1 
    courses[key]['Percentage 2'] = p2
    '''

def addCredits(marked, cred, ukVal, ind):
    '''
    Third line: First col is 1 or empty, second col is course credits and third
    column is empty or some financial sum. Usage of first and last column is unknown.
    Set first column as 1 if it is 1 otherwise 0. Set third column as value if present
    otherwise as N/A.
    '''
    # Validate inputs
    marked = replaceEmpty(marked, '0')
    cred = notEmptyFloat(cred)
    ukVal = replaceEmpty(ukVal, '0')
    ukVal = cleanNumber(str(ukVal))
    ukVal = int(ukVal) if ukVal != 0.0 else 'NA'
    # Get for that course this data is for
    key = keyList[ind + keyOffset]
    # Add data to course
    courses[key]['Credits'] = str(cred)
    '''
    # TODOD: Un-comment if data is needed
    courses[key]['Marked'] = marked
    courses[key]['Unknown credit sum'] = ukVal 
    '''

def addCentralLine(val, innerKey, caseNo, ind):
    '''
    Handles lines that only hava a value in the middle column. There are 4 different rows like this.
    2 have cost numbers, one has a proportion number and one has count.
    '''
    key = keyList[ind + keyOffset]

    # Deal with cost numbers
    if caseNo in [3, 20]:
        val = replaceEmpty(val, '0')
        val = int(cleanNumber(str(val)))

    # Deal with proportion number
    elif caseNo == 19:
        val = getProportionNumber(val, 'NA')

    # Deal with count
    else:
        val = replaceEmpty(val, 'NA')
        val = val if isinstance(val, str) else int(val)

    courses[key][innerKey] = val

def addTripleLines(val1, val2, val3, innerKey, ind):
    '''
    Lines inbetween (not including) Balans - SU-studentar, most of them have values in all columns.
    It is not a 100% clear what the metrics on left and right mean so the name of them needs to be looked at.
    '''
    key = keyList[ind + keyOffset]
    val1 = determineValue(val1, 'NA')
    val2 = determineValue(val2, 'NA')
    val3 = determineValue(val3, 'NA')
    courses[key][f'{innerKey} Left'] = val1
    courses[key][f'{innerKey} Central'] = val2
    courses[key][f'{innerKey} Right'] = val3

def addDoubleLines(val1, val2, innerKey, ind):
    '''
    Lines inbetween (not including) SU-studentar - Lärartimmar/elevpoäng, most of them have values in left and right 
    column. Columns can be empty but should generally be in hours. They represent budgeted
    and allocated hours.
    '''
    key = keyList[ind + keyOffset]
    # If empty set 0
    val1 = replaceEmpty(val1, '0')
    val2 = replaceEmpty(val2, '0')
    # Clean numbers
    val1 = cleanNumber(str(val1))
    val2 = cleanNumber(str(val2))
    # Insert
    courses[key][f'{innerKey} Budgeted'] = int(val1)
    courses[key][f'{innerKey} Allocated'] = int(val2)

def addTeacherDistribution(role, teacher, hours, ind):
    '''
    These are the rows 22 and onward. On the left is the Activity (Adm, Ex...). In the middle
    ther is the teacher and on the right, are the hours. If the left or middle value is empty
    we leave that row. If only the right value is empty we replace it with '0'. 
    '''
    key = keyList[ind + keyOffset]
    innerKey = 'Teachers'

    # Skip line if either role or teacher column are empty
    if isEmpty(role) or isEmpty(teacher):
        return

    # Check that role and teacher are strings
    if not isinstance(role, str) or not isinstance(teacher, str):
        raise ValueError(f'{key}: Teacher and Role should be a string, got: {role} | {teacher}')
    
    # Both 'Lab' and 'La' are used for 'Laboration' in the sheets, Save all under 'Lab'
    role = 'Lab' if role == 'La' else role
    role = 'Ha' if role == 'HaH' else role

    # Check if role is a valid role
    if role not in roles:
        raise ValueError(f'{key}: Role {role} is not defined')

    # Get int or float value of hours, empty columns will be fille with 0
    hours = determineValue(hours, 0)

    # Check if 'Teachers' key has been created for course, if not create it
    if innerKey not in courses[key]:
        courses[key][innerKey] = {}

    # Check if teacher key has been created for course, if not create it
    if teacher not in courses[key][innerKey]:
        courses[key][innerKey][teacher] = {}

    # Check if teacher already has hours for same activity in course, if so, add to that sum, else create it
    if role in courses[key][innerKey][teacher]:
        courses[key][innerKey][teacher][role] += hours
    else:
        courses[key][innerKey][teacher][role] = hours

def main():
    global readingHT
    global keyOffset
    global centralLineKeys
    global tripleLineKeys
    global doubleLineKeys
        
    # Loop sheets
    for si in range(2):

        # Read excel file and specific sheet
        df = pd.read_excel(filename, sheetname[si], header=None)
        # First 4 columns are not courses, remove them. Now every 3 columns represent a course.
        df = df.drop(df.columns[[0, 1, 2, 3]], axis=1)
        
        colIndex = 4 # Removed first 4 columns
        numRows = len(df)
        numCols = len(df.columns) + colIndex

        # Number of columns should be divisable by 3 (each course is 3 columns)
        assert(len(df.columns) % 3 == 0)

        # Loop rows
        for ri in range(numRows):
            # Loop columns (3 at a time -> each course takes 3 columns in spreadsheet)
            keyIndex = 0
            for ci in range(colIndex, numCols, 3):

                if ri == 0:
                    createCourse(df[ci][ri], df[ci+1][ri])                            
                elif ri == 1:
                    addShortName(df[ci][ri], df[ci+2][ri], df[ci+1][ri], keyIndex)
                elif ri == 2:
                    addCredits(df[ci][ri], df[ci+1][ri], df[ci+2][ri], keyIndex)
                elif ri in [3, 20]: # TODO: Set back to [3,10,19,20] if data is needed.
                    addCentralLine(df[ci+1][ri], centralLineKeys[ri], ri, keyIndex)
                elif ri == 9: # TODO: set ri in [4,5,6,7,8,9] if data is needed (set input as triplelinekeys[ri] instead of KTH-Students)
                    addCentralLine(df[ci+1][ri], 'KTH-Students', ri, keyIndex)
                elif ri in [11, 12, 13, 14, 15, 16, 17, 18]:
                    addDoubleLines(df[ci][ri], df[ci+2][ri], doubleLineKeys[ri], keyIndex)
                elif ri > 21:
                    addTeacherDistribution(df[ci][ri], df[ci+1][ri], df[ci+2][ri], keyIndex)

                keyIndex += 1

        readingHT = True
        keyOffset = int((numCols - colIndex) / 3)

    # Add comment and responsible templates for each course
    for course in courses:
        courses[course]['Admin Comments'] = []
        courses[course]['User Comments'] = []
        courses[course]['Responsible'] = []

    # There where 72 courses in the sheets
    assert(len(keyList) == 72)
    assert(len(list(courses)) == 72)

    #print(courses)
    with open(outputName, 'w', encoding='utf8') as outfile:
            json.dump(courses, outfile, ensure_ascii=False)
    

if __name__ == "__main__":
    main()