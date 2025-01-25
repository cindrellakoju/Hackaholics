import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import Settings from "./setting"

interface Work {
  imageUri: string;
  title: string;
}

const works: Work[] = [
  { imageUri: 'http://192.168.31.99:3000/uploads/23-1727358604996.jpg', title: 'Pen Vase' },
  { imageUri: 'http://192.168.31.99:3000/uploads/19-1727356762179.jpg', title: 'Basket' },
  { imageUri: 'http://192.168.31.99:3000/uploads/18-1727356056530.jpg', title: 'Pig' },
  { imageUri: 'http://192.168.31.99:3000/uploads/13-1727355193558.jpg', title: 'Lamp' },
  { imageUri: 'http://192.168.31.99:3000/uploads/16-1727355711516.jpg', title: 'My Art' },
  { imageUri: 'http://192.168.31.99:3000/uploads/21-1727357263204.jpg', title: 'Flower' },
];

const UserInfo = () => {
  const [showSettings, setShowSettings] = useState(false);

  const handleSettingsPress = () => {
    setShowSettings(prevState => !prevState); // Toggle the visibility of the Settings component
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Settings Button at the top right */}
      <View style={styles.settingsContainer}>
      <TouchableOpacity onPress={handleSettingsPress} style={{ paddingRight: 10 }}>
  <Icon name="settings-outline" size={30} color="black" />
</TouchableOpacity>
      </View>

      {/* Conditionally render the Settings component */}
      {showSettings ?( <Settings />):(
        <>

      <View style={styles.header}>
          <Image
            source={{ uri: 'http://192.168.31.99:3000/uploads/default.png' }} // Replace with actual image URL
            style={styles.profileImage}
          />
          <Text style={styles.name}>Caroline Steele</Text>
          <Text style={styles.subtitle}>Photographer and Artist</Text>
          <Text style={styles.description}>
            Hi, my name is Aashish. I am currently working on project to make the waste clean and world a better place.
          </Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>❤️ 15k </Text>
          </View>
        </View>

        {/* My Works Section */}
        <Text style={styles.sectionTitle}>My Crafts</Text>

        <FlatList
          data={works}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.workItem}>
              <Image source={{ uri: item.imageUri }} style={styles.workImage} />
              <Text style={styles.imageTitle}>{item.title}</Text>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.worksContainer}
        />
      </>
    )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 90,
    backgroundColor: '#fff',
  },
  settingsContainer: {
    position: 'absolute', // Absolute positioning to place it in the top-right corner
    top: 40,  // Adjust as necessary to your design
    right: 20, // Adjust as necessary
    zIndex: 1, // Ensure it's on top of other elements
  },
  header: {
    alignItems: 'center',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 80,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
  description: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
  },
  worksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  workItem: {
    width: 150,
    marginRight: 10,
  },
  workImage: {
    width: 150,
    height: 220,
    borderRadius: 10,
  },
  imageTitle: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
});

export default UserInfo;
