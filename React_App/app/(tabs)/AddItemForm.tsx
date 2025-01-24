import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";

interface AddItemFormProps {
  onClose: () => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    console.log("New Item:", { title, images, description });
    onClose(); // Close the form after submission
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Images (comma-separated URLs)"
        value={images}
        onChangeText={setImages}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add" onPress={handleSubmit} />
        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
  },
  buttonContainer: {
    marginTop: 20,
  },
  cancelButton: {
    marginTop: 10,
    alignItems: "center",
  },
  cancelText: {
    color: "#FF0000",
    fontWeight: "bold",
  },
});

export default AddItemForm;
