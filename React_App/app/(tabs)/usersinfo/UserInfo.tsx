import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const UserInfo = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://files.worldwildlife.org/wwfcmsprod/images/Tiger_resting_Bandhavgarh_National_Park_India/hero_small/6aofsvaglm_Medium_WW226365.jpg' }} // Replace with actual image URL
          style={styles.profileImage}
        />
        <Text style={styles.name}>Caroline Steele</Text>
        <Text style={styles.subtitle}>Photographer and Artist</Text>
        <Text style={styles.description}>
          Hi, my name is Carol and I love photography! It's my greatest passion in life.
        </Text>
      </View>
   {/* Stats Section */}
   <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>15k</Text>
          <Text style={styles.statLabel}>Likes ❤️</Text>
        </View>
      </View>

      {/* My Works Section */}
      <Text style={styles.sectionTitle}>My Works</Text>
      <View style={styles.worksContainer}>
        <View style={styles.workItem}>
          <Image
            source={{ uri: 'https://files.worldwildlife.org/wwfcmsprod/images/Tiger_resting_Bandhavgarh_National_Park_India/hero_small/6aofsvaglm_Medium_WW226365.jpg' }} // Replace with actual image URL
            style={styles.workImage}
            />
          <Text style={styles.imageTitle}>Nature</Text>
        </View>
        <View style={styles.workItem}>
          <Image
            source={{ uri: 'https://files.worldwildlife.org/wwfcmsprod/images/Tiger_resting_Bandhavgarh_National_Park_India/hero_small/6aofsvaglm_Medium_WW226365.jpg' }} // Replace with actual image URL
            style={styles.workImage}
            />
          <Text style={styles.imageTitle}>My Art</Text>
        </View>
        <View style={styles.workItem}>
          <Image
            source={{ uri: 'https://files.worldwildlife.org/wwfcmsprod/images/Tiger_resting_Bandhavgarh_National_Park_India/hero_small/6aofsvaglm_Medium_WW226365.jpg' }} // Replace with actual image URL
            style={styles.workImage}
          />
          <Text style={styles.imageTitle}>People</Text>
        </View>
        {/* <View style={styles.workItem}>
          <Image
            source={{ uri: 'https://files.worldwildlife.org/wwfcmsprod/images/Tiger_resting_Bandhavgarh_National_Park_India/hero_small/6aofsvaglm_Medium_WW226365.jpg' }} // Replace with actual image URL
            style={styles.workImage}
          />
          <Text style={styles.imageTitle}>People</Text>
        </View> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 90,
    backgroundColor: '#fff',
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  followButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  messageButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  statLabel: {
    color: 'gray',
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
    // alignItems: 'center',
    width: 120,
  },
  workImage: {
    width: 150,
    height: 220,
    borderRadius: 10,
  },
  imageTitle: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: 'gray',
  },
  socialMediaContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  socialLink: {
    fontSize: 16,
    color: '#FF6F61',
    marginVertical: 5,
  },
});

export default UserInfo;
