import tensorflow as tf
from tensorflow.keras.applications import VGG16
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Flatten, Dense
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Set parameters
img_size = (224, 224)
num_classes = 12  # Update to reflect your dataset
batch_size = 32
epochs = 50
validation_split = 0.2  # Reserve 20% of the training data for validation

# Load the VGG16 model without the top layer
base_model = VGG16(weights='imagenet', include_top=False, input_shape=(img_size[0], img_size[1], 3))

# Freeze the base model layers
for layer in base_model.layers:
    layer.trainable = False

# Add custom classifier on top
x = base_model.output
x = Flatten()(x)
x = Dense(256, activation='relu')(x)
predictions = Dense(num_classes, activation='softmax')(x)

# Create the full model
model = Model(inputs=base_model.input, outputs=predictions)

# Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Data preprocessing
train_datagen = ImageDataGenerator(rescale=1./255, validation_split=validation_split)

# Load training data with validation split
train_generator = train_datagen.flow_from_directory(
    'C:/Users/ACER/Desktop/mbmc hackathon/trainning/dataset',  # Update with your path
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical',
    subset='training'  # Set as training data
)

validation_generator = train_datagen.flow_from_directory(
    'C:/Users/ACER/Desktop/mbmc hackathon/trainning/dataset',  # Use the same path for validation
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical',
    subset='validation'  # Set as validation data
)

# Train the model
model.fit(train_generator, 
          epochs=epochs, 
          validation_data=validation_generator)

# Save the model (optional)
model.save('vgg16_transfer_learning_model.h5')

# Evaluate the model
loss, accuracy = model.evaluate(validation_generator)
print(f"Validation accuracy: {accuracy:.2f}")
