from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from flasgger import Swagger
from textblob import TextBlob
from better_profanity import profanity

app = Flask(__name__)
api = Api(app)
swagger = Swagger(app)

class SentimentAnalyser(Resource):

    def post(self):
        """
        This method responds to the POST request for this endpoint and returns the sentiment of the text
        ---
        tags:
        - Sentiment Analysis
        parameters:
            - name: text
              in: query
              type: string
              required: true
              description: The text to be analyzed
        responses:
            200:
                description: A successful POST request
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                censored_text:
                                    type: string
                                    description: The censored text
            400:
                description: Bad request
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                error:
                                    type: string
                                    description: The error message
        """
        # retrieve the text from the request
        text = request.args.get("text")

        try:
            # Perform sentiment analysis
            blob = TextBlob(text)
            sentiment = blob.sentiment.polarity

            # Censor bad words
            censored_text = profanity.censor(text)

            return jsonify({"censored_text": censored_text})

        except Exception as e:
            return jsonify({"error": str(e)}), 400

api.add_resource(SentimentAnalyser, "/sentiment")

if __name__ == "__main__":
    app.run(debug=True)