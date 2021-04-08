import json
import random
import string

codes_used = ['used']
short_names_used = ['used']

dummies = ['Fö Extern', 'Frl Gratis', 'NN Lektor']

# Random digits, select randomly between them
def getCourseCode():
  combos = ['NC', 'ND', 'NM', 'NR', 'NJ', 'RA']

  code = 'used'

  while code in codes_used:
    letters = random.choice(combos)
    numbers = random.randint(1111,9999)
    code = letters + str(numbers)

  codes_used.append(code)
  return code


def getShortName():
  sn = 'used'

  while sn in short_names_used:
    sn = ''.join(random.choices(string.ascii_lowercase, k=4))

  short_names_used.append(sn)
  return sn



def main():

  with open('json/merged.json', encoding='utf8') as json_file:
    data = json.load(json_file)

  data2 = dict(data['data1920']['courses'])

  
  original_codes = data2.keys()
  for key in original_codes:
    new_cc = getCourseCode()
    new_sn = getShortName()

    course_teachers = data['data1920']['courses'][key]['Teachers'].keys()
    course_responsible = data['data1920']['courses'][key]['Responsible']

    if course_responsible and course_responsible[0] not in course_teachers:
      course_teachers.append(course_responsible[0])

    for teacher in course_teachers:
      if teacher in dummies:
        continue 

      # Handle 'Responsible VT'
      resVT = data['data1920']['teachers'][teacher]['Responsible VT']
      new_resVT = [new_cc if x==key else x for x in resVT]
      data['data1920']['teachers'][teacher]['Responsible VT'] = new_resVT

      # Handle 'Responsible HT'
      resHT = data['data1920']['teachers'][teacher]['Responsible HT']
      new_resHT = [new_cc if x==key else x for x in resHT]
      data['data1920']['teachers'][teacher]['Responsible HT'] = new_resHT
      
      # Handle 'Course Hours Totals'
      if key in data['data1920']['teachers'][teacher]['Course Hours Totals'].keys():
        data['data1920']['teachers'][teacher]['Course Hours Totals'][new_cc] = data['data1920']['teachers'][teacher]['Course Hours Totals'].pop(key)

      # Handle 'VT Courses'
      for obj in data['data1920']['teachers'][teacher]['VT Courses']:
        if obj['Course Code'] == key:
          obj['Course Code'] = new_cc
          obj['Short Name'] = new_sn

      # Handle 'HT Courses'
      for obj in data['data1920']['teachers'][teacher]['HT Courses']:
        if obj['Course Code'] == key:
          obj['Course Code'] = new_cc
          obj['Short Name'] = new_sn

    # Handle Course cc and sn change
    data['data1920']['courses'][key]['Short Name'] = new_sn
    data['data1920']['courses'][new_cc] = data['data1920']['courses'].pop(key)


  # Write new json file 
  with open('json/anonMerged.json', 'w', encoding='utf8') as outfile:
    json.dump(data, outfile)

if __name__ == "__main__":
    main()