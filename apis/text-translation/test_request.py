import requests

base_url = 'https://rj-text-translation.onrender.com/translate'

params = {'text': 'I have done it', 'source_language': 'en', 'target_language': 'af'}

response = requests.get(base_url, params=params)

print(response.json())