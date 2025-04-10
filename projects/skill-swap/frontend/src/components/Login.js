import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation, setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://dbc1-46-119-171-85.ngrok-free.app/api/token/', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      if (data.access) {
        console.log('Access Token:', data.access);
        await AsyncStorage.setItem('accessToken', data.access);
        console.log('Token stored successfully');
        // Update the token state in App.js to trigger navigation to Drawer
        setToken(data.access);
      } else {
        console.log('Login Error Response:', data);
        const errorMessage = data.detail ? String(data.detail) : 'Invalid credentials';
        setError(errorMessage);
      }
    } catch (err) {
      console.log('Fetch Error:', err);
      setError('Network error: ' + err.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Handle back button press to always navigate to Signup
  const handleBackPress = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.welcomeTitle}>Hi, Welcome Back! 👋</Text>
      <Text style={styles.welcomeSubtitle}>Hello again, You have been missed!</Text>

      <Text style={styles.inputLabel}>Username</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
        placeholderTextColor="#999"
      />

      <Text style={styles.inputLabel}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
          <Text>{showPassword ? '🐵' : '🙈'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.passwordOptionsRow}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setRememberPassword(!rememberPassword)}
          >
            {rememberPassword && <View style={styles.checkboxInner} />}
          </TouchableOpacity>
          <Text style={styles.rememberText}>Remember Password</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password ?</Text>
        </TouchableOpacity>
      </View>

      {error ? (
        <Text style={styles.error}>
          {typeof error === 'string' ? error : JSON.stringify(error)}
        </Text>
      ) : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            style={styles.socialButton}
            source={require('../../images/google.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            style={styles.socialButton}
            source={require('../../images/facebook.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            style={styles.socialButton}
            source={require('../../images/apple.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF7D4',
    paddingTop: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  backButtonText: {
    fontSize: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Raleway-bold',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
    fontFamily: 'Raleway-regular',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
    fontFamily: 'Raleway-regular',
  },
  input: {
    borderWidth: 2,
    borderColor: '#000000',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#FFF9E0',
    fontSize: 16,
    fontFamily: 'Raleway-regular',
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#FFF9E0',
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    fontFamily: 'Raleway-regular',
  },
  eyeIcon: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#FFC107',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: '#FFC107',
  },
  rememberText: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Raleway-Regular',
  },
  forgotText: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Raleway-Regular',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#3B3227',
    padding: 16,
    borderRadius: 60,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 18,
    fontFamily: 'Raleway-regular',
    letterSpacing: 1,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    paddingHorizontal: 10,
    color: '#222',
    fontSize: 20,
    height: 32,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  socialButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 19,
  },
});