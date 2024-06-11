import openai

openai.api_key = 'YOUR_OPENAI_API_KEY'

def analyze_frames(frames):
    # Convert frames to text descriptions using GPT-4
    descriptions = []
    for frame in frames:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt="Describe the poker hand in this frame.",
            max_tokens=50
        )
        descriptions.append(response.choices[0].text.strip())
    return descriptions