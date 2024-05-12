from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from flasgger import Swagger
from googletrans import Translator

app = Flask(__name__)
api = Api(app)
swagger = Swagger(app)
translator = Translator()

LANGUAGES = {
    'af': 'afrikaans',
    'sq': 'albanian',
    'am': 'amharic',
    'ar': 'arabic',
    'hy': 'armenian',
    'az': 'azerbaijani',
    'eu': 'basque',
    'be': 'belarusian',
    'bn': 'bengali',
    'bs': 'bosnian',
    'bg': 'bulgarian',
    'ca': 'catalan',
    'ceb': 'cebuano',
    'ny': 'chichewa',
    'zh-cn': 'chinese (simplified)',
    'zh-tw': 'chinese (traditional)',
    'co': 'corsican',
    'hr': 'croatian',
    'cs': 'czech',
    'da': 'danish',
    'nl': 'dutch',
    'en': 'english',
    'eo': 'esperanto',
    'et': 'estonian',
    'tl': 'filipino',
    'fi': 'finnish',
    'fr': 'french',
    'fy': 'frisian',
    'gl': 'galician',
    'ka': 'georgian',
    'de': 'german',
    'el': 'greek',
    'gu': 'gujarati',
    'ht': 'haitian creole',
    'ha': 'hausa',
    'haw': 'hawaiian',
    'iw': 'hebrew',
    'he': 'hebrew',
    'hi': 'hindi',
    'hmn': 'hmong',
    'hu': 'hungarian',
    'is': 'icelandic',
    'ig': 'igbo',
    'id': 'indonesian',
    'ga': 'irish',
    'it': 'italian',
    'ja': 'japanese',
    'jw': 'javanese',
    'kn': 'kannada',
    'kk': 'kazakh',
    'km': 'khmer',
    'ko': 'korean',
    'ku': 'kurdish (kurmanji)',
    'ky': 'kyrgyz',
    'lo': 'lao',
    'la': 'latin',
    'lv': 'latvian',
    'lt': 'lithuanian',
    'lb': 'luxembourgish',
    'mk': 'macedonian',
    'mg': 'malagasy',
    'ms': 'malay',
    'ml': 'malayalam',
    'mt': 'maltese',
    'mi': 'maori',
    'mr': 'marathi',
    'mn': 'mongolian',
    'my': 'myanmar (burmese)',
    'ne': 'nepali',
    'no': 'norwegian',
    'or': 'odia',
    'ps': 'pashto',
    'fa': 'persian',
    'pl': 'polish',
    'pt': 'portuguese',
    'pa': 'punjabi',
    'ro': 'romanian',
    'ru': 'russian',
    'sm': 'samoan',
    'gd': 'scots gaelic',
    'sr': 'serbian',
    'st': 'sesotho',
    'sn': 'shona',
    'sd': 'sindhi',
    'si': 'sinhala',
    'sk': 'slovak',
    'sl': 'slovenian',
    'so': 'somali',
    'es': 'spanish',
    'su': 'sundanese',
    'sw': 'swahili',
    'sv': 'swedish',
    'tg': 'tajik',
    'ta': 'tamil',
    'te': 'telugu',
    'th': 'thai',
    'tr': 'turkish',
    'uk': 'ukrainian',
    'ur': 'urdu',
    'ug': 'uyghur',
    'uz': 'uzbek',
    'vi': 'vietnamese',
    'cy': 'welsh',
    'xh': 'xhosa',
    'yi': 'yiddish',
    'yo': 'yoruba',
    'zu': 'zulu',
}

class TranslateText(Resource):

    def get(self):
        """
        This method responds to the GET request for this endpoint and returns the data in the specified target language.
        ---
        tags:
        - Text Processing
        parameters:
            - name: text
              in: query
              type: string
              required: true
              description: The text to be translated
            - name: source_language
              in: query
              type: string
              required: true
              description: The source language of the text
            - name: target_language
              in: query
              type: string
              required: true
              description: The target language to which the text will be translated
        responses:
            200:
                description: A successful GET request
                content:
                    application/json:
                      schema:
                        type: object
                        properties:
                            text:
                                type: string
                                description: The text translated to the specified target language
            400:
                description: Bad request
                content:
                    application/json:
                      schema:
                        type: object
                        properties:
                            error:
                                type: string
                                description: Unsupported source or target language
        """
        text = request.args.get('text')
        source_language = request.args.get('source_language')
        target_language = request.args.get('target_language')

        # Check if both source and target languages are supported by the translator

        if source_language not in LANGUAGES or target_language not in LANGUAGES:
            return {"error": "Source or target language not supported"}, 400

        translation = translator.translate(text, src=source_language, dest=target_language)

        return jsonify({"text": translation.text})
    
class DetectLanguage(Resource):

    def get(self):
        """
        This method responds to the GET request for this endpoint and returns the detected language of the text
        ---
        tags:
        - Text Processing
        parameters:
            - name: text
              in: query
              type: string
              required: true
              description: The text to be analyzed
        responses:
            200:
                description: A successful GET request
                content:
                    application/json:
                      schema:
                        type: object
                        properties:
                            language:
                                type: string
                                description: The detected language of the text
            400:
                description: Bad request
                content:
                    application/json:
                      schema:
                        type: object
                        properties:
                            error:
                                type: string
                                description: Unsupported source or target language
        """
        text = request.args.get('text')

        # Check if both source and target languages are supported by the translator

        try:
            detected_language = translator.detect(text).lang

            return jsonify({"language": detected_language})

        except Exception as e:
            return {"error": str(e)}, 400    

api.add_resource(TranslateText, "/translate")
api.add_resource(DetectLanguage, "/detect")

if __name__ == "__main__":
    app.run(debug=True)
