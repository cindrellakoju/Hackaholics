import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { StackNavigationProp } from '@react-navigation/stack'; // Import navigation prop type
import { RootStackParamList } from './type'; // Import navigation types

interface Work {
  imageUri: string;
  title: string;
}

const works: Work[] = [
  { imageUri: 'https://files.worldwildlife.org/wwfcmsprod/images/Tiger_resting_Bandhavgarh_National_Park_India/hero_small/6aofsvaglm_Medium_WW226365.jpg', title: 'Nature' },
  { imageUri: 'https://files.worldwildlife.org/wwfcmsprod/images/Tiger_resting_Bandhavgarh_National_Park_India/hero_small/6aofsvaglm_Medium_WW226365.jpg', title: 'My Art' },
  { imageUri: 'https://files.worldwildlife.org/wwfcmsprod/images/Tiger_resting_Bandhavgarh_National_Park_India/hero_small/6aofsvaglm_Medium_WW226365.jpg', title: 'People' },
  { imageUri: 'https://files.worldwildlife.org/wwfcmsprod/images/Tiger_resting_Bandhavgarh_National_Park_India/hero_small/6aofsvaglm_Medium_WW226365.jpg', title: 'Nature' },
  { imageUri: 'https://files.worldwildlife.org/wwfcmsprod/images/Tiger_resting_Bandhavgarh_National_Park_India/hero_small/6aofsvaglm_Medium_WW226365.jpg', title: 'My Art' },
  { imageUri: 'https://files.worldwildlife.org/wwfcmsprod/images/Tiger_resting_Bandhavgarh_National_Park_India/hero_small/6aofsvaglm_Medium_WW226365.jpg', title: 'People' },
];

const UserInfo = () => {
  // Define navigation type for this screen
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'UserInfo'>>();

  const handleSettingsPress = () => {
    navigation.dispatch(StackActions.push('Settings')); // Navigate to Settings screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Settings Button at the top right */}
      <View style={styles.settingsContainer}>
        <TouchableOpacity onPress={handleSettingsPress}>
          <Icon name="settings-outline" size={30} color="black" paddingRight={10} /> {/* Settings icon */}
        </TouchableOpacity>
      </View>

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
    </ScrollView>
  );
};

// Styles (same as in your code)
const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 90,
    backgroundColor: '#fff',
  },
  settingsContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
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
