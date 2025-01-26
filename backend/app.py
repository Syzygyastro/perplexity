from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from duckduckgo_search import DDGS
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI

import os

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize OpenAI
openai_api_key = os.getenv("OPENAI_API_KEY")

# Initialize LangChain's ChatOpenAI model
llm = ChatOpenAI(model="gpt-4", openai_api_key=openai_api_key)

# Define a LangChain prompt template for summarizing search results
prompt = PromptTemplate(
    input_variables=["query", "results"],
    template="""
    You are a helpful assistant. Below are search results for a user's query:
    Query: {query}

    Search Results:
    {results}

    Summarize these results into a clear and concise response.
    """
)

# Create a LangChain summarization chain
chain = LLMChain(llm=llm, prompt=prompt)


@app.route('/api/query', methods=['POST'])
def query_openai_with_search():
    data = request.json
    user_query = data.get('query', '')

    if not user_query:
        return jsonify({'error': 'No query provided'}), 400

    try:
        # Step 1: Perform a DuckDuckGo search
        ddg = DDGS()
        search_results = ddg.text(user_query, max_results=5)

        # Check if search results are empty
        if not search_results:
            return jsonify({'response': "No relevant search results found."})

        # Step 2: Extract snippets and links from search results
        snippets = []
        links = []

        for result in search_results:
            if 'body' in result:
                snippets.append(result['body'])
            if 'href' in result:
                links.append(result['href'])

        # Combine snippets into a single string for LangChain
        combined_results = "\n".join(snippets)

        # Step 3: Use LangChain to generate a response
        summary = chain.run(query=user_query, results=combined_results)

        # Step 4: Return both the summary and the links
        return jsonify({'response': summary, 'links': links})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    print("Starting Backend!")
    app.run(debug=True)
