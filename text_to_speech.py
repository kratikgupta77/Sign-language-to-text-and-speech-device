import gspread
from oauth2client.service_account import ServiceAccountCredentials
import pyttsx3
import time
scope = ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('C:/Users/91977/Desktop/ESD_project/esdchipmaster-e6b56107d039.json', scope)
client = gspread.authorize(creds)
# Access the Google Sheet by its ID
sheet_id = '19y5RhCCJWDloytZ-g_5v7GUDf5r-pTnUvZ_es5KeGHU'
sheet = client.open_by_key(sheet_id).sheet1
try:
    with open("last_processed_row.txt", "r") as file:
        last_processed_row1 = int(file.read().strip())
except FileNotFoundError:
    last_processed_row1 = 1

# Convert text to speech
engine = pyttsx3.init()

while True:
    print("running")
    column_c_data = sheet.col_values(3, value_render_option='UNFORMATTED_VALUE')[last_processed_row1 - 1:]

    for idx, text in enumerate(column_c_data, start=last_processed_row1):
        if text:  
            engine.say(text)
            engine.runAndWait()
            last_processed_row1 = idx + 1 
    with open("C:/Users/91977/Desktop/ESD_project/last_processed_row.txt", "w") as file:
        file.write(str(last_processed_row1))
    time.sleep(2)
