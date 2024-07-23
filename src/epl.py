import requests
import json 

res = requests.get('https://api.football-data.org/v4/competitions/PL/matches')
response = json.loads(res.text)

print(response)