import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PersonalInfo {
  username: string;
  fullName: string;
  email: string;
  dob: string;
  contactNumber: string;
  location: string;
}

const personalInfo: PersonalInfo = {
  username: 'carol_steele',
  fullName: 'Caroline Steele',
  email: 'carol.steele@example.com',
  dob: '1990-05-12',
  contactNumber: '+1234567890',
  location: 'Bandhavgarh, India',
};

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Information</Text>
      <Text style={styles.text}>Username: {personalInfo.username}</Text>
      <Text style={styles.text}>Full Name: {personalInfo.fullName}</Text>
      <Text style={styles.text}>Email: {personalInfo.email}</Text>
      <Text style={styles.text}>Date of Birth: {personalInfo.dob}</Text>
      <Text style={styles.text}>Contact Number: {personalInfo.contactNumber}</Text>
      <Text style={styles.text}>Location: {personalInfo.location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
});

export default Settings;
