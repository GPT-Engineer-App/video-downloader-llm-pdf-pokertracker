from flask import Flask, request, send_file
from utils.video_processing import download_video, extract_frames
from utils.llm_interaction import analyze_frames
from utils.pdf_generation import create_pdf_storybook
from utils.database import init_db, save_player_stats, get_player_stats

app = Flask(__name__)
init_db()

@app.route('/download_video', methods=['POST'])
def download_video_route():
    video_url = request.json['video_url']
    video_path = download_video(video_url)
    return {"video_path": video_path}

@app.route('/extract_frames', methods=['POST'])
def extract_frames_route():
    video_path = request.json['video_path']
    frames = extract_frames(video_path)
    return {"frames": frames}

@app.route('/analyze_frames', methods=['POST'])
def analyze_frames_route():
    frames = request.json['frames']
    analysis = analyze_frames(frames)
    return {"analysis": analysis}

@app.route('/create_pdf', methods=['POST'])
def create_pdf_route():
    analysis = request.json['analysis']
    pdf_path = create_pdf_storybook(analysis)
    return send_file(pdf_path, as_attachment=True)

@app.route('/save_stats', methods=['POST'])
def save_stats_route():
    stats = request.json['stats']
    save_player_stats(stats)
    return {"status": "success"}

@app.route('/get_stats', methods=['GET'])
def get_stats_route():
    player_id = request.args.get('player_id')
    stats = get_player_stats(player_id)
    return {"stats": stats}

if __name__ == '__main__':
    app.run(debug=True)