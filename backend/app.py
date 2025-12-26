from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import os

app = Flask(__name__)
CORS(app)

# OpenRouter API configuration
OPENROUTER_API_KEY = os.environ.get('OPENROUTER_API_KEY', 'your-api-key')
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

@app.route('/')
def home():
    return jsonify({"message": "Assignment Automation API", "status": "running"})

@app.route('/api/generate', methods=['POST'])
def generate_assignment():
    try:
        data = request.json
        assignment_topic = data.get('topic', '')
        assignment_type = data.get('type', 'essay')
        word_count = data.get('wordCount', 500)
        language = data.get('language', 'english')
        
        if not assignment_topic:
            return jsonify({"error": "Topic is required"}), 400
        
        # Prepare prompt based on assignment type
        prompt = create_prompt(assignment_topic, assignment_type, word_count, language)
        
        # Call OpenRouter API with DeepSeek model
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5000",
            "X-Title": "Assignment Automation"
        }
        
        payload = {
            "model": "deepseek/deepseek-chat",
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "temperature": 0.7,
            "max_tokens": word_count * 2
        }
        
        response = requests.post(OPENROUTER_URL, headers=headers, json=payload)
        
        if response.status_code == 200:
            result = response.json()
            generated_text = result['choices'][0]['message']['content']
            
            return jsonify({
                "success": True,
                "content": generated_text,
                "topic": assignment_topic,
                "type": assignment_type
            })
        else:
            return jsonify({
                "error": "API request failed",
                "details": response.text
            }), 500
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/improve', methods=['POST'])
def improve_text():
    try:
        data = request.json
        original_text = data.get('text', '')
        improvement_type = data.get('improvementType', 'grammar')
        
        if not original_text:
            return jsonify({"error": "Text is required"}), 400
        
        prompt = create_improvement_prompt(original_text, improvement_type)
        
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5000",
            "X-Title": "Assignment Automation"
        }
        
        payload = {
            "model": "deepseek/deepseek-chat",
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "temperature": 0.5,
            "max_tokens": 2000
        }
        
        response = requests.post(OPENROUTER_URL, headers=headers, json=payload)
        
        if response.status_code == 200:
            result = response.json()
            improved_text = result['choices'][0]['message']['content']
            
            return jsonify({
                "success": True,
                "improvedText": improved_text
            })
        else:
            return jsonify({
                "error": "API request failed",
                "details": response.text
            }), 500
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def create_prompt(topic, assignment_type, word_count, language):
    prompts = {
        'essay': f"Write a comprehensive {word_count}-word essay about '{topic}' in {language}. Include an introduction, body paragraphs with clear arguments, and a conclusion.",
        'research': f"Create a detailed {word_count}-word research paper about '{topic}' in {language}. Include citations, methodology, findings, and references.",
        'report': f"Generate a professional {word_count}-word report on '{topic}' in {language}. Include executive summary, analysis, and recommendations.",
        'summary': f"Write a {word_count}-word summary about '{topic}' in {language}. Be concise and cover the main points.",
        'analysis': f"Provide a critical {word_count}-word analysis of '{topic}' in {language}. Include evaluation and interpretation."
    }
    
    return prompts.get(assignment_type, prompts['essay'])

def create_improvement_prompt(text, improvement_type):
    prompts = {
        'grammar': f"Improve the grammar and spelling of the following text while keeping the original meaning:\n\n{text}",
        'clarity': f"Rewrite the following text to make it clearer and more concise:\n\n{text}",
        'academic': f"Rewrite the following text in a more academic and professional tone:\n\n{text}",
        'expand': f"Expand and elaborate on the following text with more details and examples:\n\n{text}"
    }
    
    return prompts.get(improvement_type, prompts['grammar'])

if __name__ == '__main__':
    app.run(debug=True, port=5000)