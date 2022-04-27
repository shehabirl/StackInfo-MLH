# csjvon -- CSV to JSON script (package to be)

# Open the csv file
# Read each row after the headers
# assign a variable for each header in a row
# trim and split the elements inside the stacks,progLangs,frontend,backend column for each row
# put it inside a jsonObject
# Append the jsonObject inside the jsonArray

# use json.dumps to format it as json
# write in the jsonFile
import csv
import json


def csv_to_json(csvFilePath, jsonFilePath):
    jsonArray = []
    with open(csvFilePath, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        name = ""
        logo = ""
        logoBackground = ""
        url = ""
        stacks = []
        progLangs = []
        frontend = []
        backend = []
        offersInternships = False
        isHiring = True
        location = {}
        p = 0  # priority
        for row in reader:

            # Variables for each key in the JSON object
            name = row['name'].strip()
            logoBackground = row['logoBackground'].strip()
            logo = row['logo'].strip()
            url = row['url'].strip()
            p = int(row['p'].strip())
            # Splitting the stacks based on the delimmiter ","
            # then strip(trim them from whitespaces) each element inside the list
            stacks = [elem.strip() for elem in row['stacks'].split(",")]
            progLangs = [elem.strip() for elem in row['progLangs'].split(",")]
            frontend = [elem.strip() for elem in row['frontend'].split(",")]
            backend = [elem.strip() for elem in row['backend'].split(",")]
            state = row['State'].strip()
            country = row['Country'].strip()
            address = row['Address'].strip()
            offersInternships = bool(row['offersInternships'].strip().capitalize())
            jsonObject = {
                'name': name,
                'logoBackground': logoBackground,
                'p': p,
                'offerInternships': offersInternships,
                'isHiring': isHiring,
                'logo': logo,
                'url': url,
                'stacks': stacks,
                'progLangs': progLangs,
                'frontend': frontend,
                'backend': backend,
                'location': {
                    'country': country,
                    'state': state,
                    'address': address
                }
            }
            jsonArray.append(jsonObject)

    # convert python jsonArray to JSON String and write to file
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonString = json.dumps(jsonArray, indent=4)
        jsonf.write(jsonString)


csvFilePath = 'D:\\Stackcity\\Stack-Info\\Data\\initialdataModified.csv'
jsonFilePath = r'data.json'
csv_to_json(csvFilePath, jsonFilePath)
