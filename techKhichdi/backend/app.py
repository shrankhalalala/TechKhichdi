from flask import Flask, request, jsonify
from flask_cors import CORS
from stackrecommender import recommend_stack

app = Flask(__name__)
CORS(app) 

@app.route('/api/recommend', methods=['POST'])
def get_recommendation():
    try:
        data = request.get_json()
        full_stack, top_picks = recommend_stack(data)
        return jsonify({
            "success": True,
            "categorized": full_stack,
            "topPicks": top_picks
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
