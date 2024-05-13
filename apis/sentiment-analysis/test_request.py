import requests

base_url = 'https://rj-text-translation.onrender.com/sentiment'

params = {'text': 'My girlfriend is a bitch.'}

response = requests.get(base_url, params=params)

print(response.json())