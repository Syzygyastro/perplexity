from dotenv import load_dotenv
from openai import OpenAI
import os
from flask import Flask, jsonify, request
from flask_cors import CORS

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

client = OpenAI()

@app.route('/api/query', methods=['POST'])
def query_openai():
    data = request.json
    user_query = data.get('query', '')

    if not user_query:
        return jsonify({'error': 'No query provided'}), 400

    try:
        # Query OpenAI's ChatCompletion endpoint
        response = client.chat.completions.create(
            model="gpt-4o-mini-2024-07-18",  # Use "gpt-4" if you want GPT-4
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_query}
            ],
            max_tokens=150,
            temperature=0.7
        )
        
        # Extract the response message
        message = response.choices[0].message.content
        return jsonify({'response': message})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("Starting Backend !")
    import multiprocessing
    print(multiprocessing.cpu_count())  # Number of available CPU cores

    app.run(debug=True)
