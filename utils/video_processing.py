import cv2
from pytube import YouTube

def download_video(url):
    yt = YouTube(url)
    stream = yt.streams.filter(file_extension='mp4').first()
    video_path = stream.download()
    return video_path

def extract_frames(video_path):
    cap = cv2.VideoCapture(video_path)
    frames = []
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        frames.append(frame)
    cap.release()
    return frames