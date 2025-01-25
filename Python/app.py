from flask import Flask, request, jsonify, render_template
from PIL import Image
import numpy as np
import tensorflow as tf

app = Flask(__name__)

# Load your TensorFlow model
model = tf.keras.models.load_model('trained.h5')

def preprocess_image(image):
    # Resize and preprocess the image as required by your model
    image = image.resize((224, 224))  # Adjust size based on your model
    image = np.array(image) / 255.0  # Normalize if required
    return image.reshape(1, 224, 224, 3)  # Adjust dimensions based on your model


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        class_names = [
        "battery", "biological", "brown-glass", "cardboard", "clothes",
        "green-glass", "metal", "paper", "plastic", "shoes",
        "trash", "white-glass"]
        threshold=0.95
        image = Image.open(file.stream)
        processed_image = preprocess_image(image)
        prediction = model.predict(processed_image)
        # print(prediction)
        prediction_res=np.array([[prediction]])
        # print(prediction_res)
        prediction_index=np.argmax(prediction_res)
        prediction_prob=np.max(prediction_res)
        print(prediction_prob*100)
        if prediction_prob>=threshold:
            predicted_class = class_names[prediction_index]
            print(predicted_class)

        # print(prediction)
            return jsonify(predicted_class=predicted_class),200
        else:
            # predicted_class="unknown"
            return jsonify(predicted_class='unknown'),202
    except Exception as e:
        return e, 500

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=5000)
