import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons
import Logo from "../images/logo.png";


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields.');
    } else {
      Alert.alert('Success', `Welcome, ${email}!`);
    }
  };

  const handleSignUp = () => {
    Alert.alert('Sign Up', 'Redirecting to sign-up page...');
    // Here, you would navigate to your Sign-Up page
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.companyName}>JunkSewa</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="email" size={24} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={24} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            color="#555"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign-Up Link */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#c7ecdb',
    padding: 20,
    paddingTop: 200,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  companyName: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 30,
    fontFamily: 'cursive',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 60,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 15,
    marginBottom: 25,
    paddingHorizontal: 10,
    backgroundColor: '#c7ecdb',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 18,   
  },
  button: {
    width: '50%',
    height: 50,
    backgroundColor: '#082317',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 25,
  },
  signUpText: {
    fontSize: 16,
    color: '#555',
  },
  signUpLink: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginPage;
