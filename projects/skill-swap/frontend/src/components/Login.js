// src/components/Login.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Track password visibility

  const handleLogin = () => {
    fetch('http://127.0.0.1:8000/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(async data => {
        if (data.access) {
          await AsyncStorage.setItem('accessToken', data.access);
          navigation.replace('Home');
        } else {
          setError('Invalid credentials');
        }
      })
      .catch(() => setError('Network error'));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* Welcome Text */}
      <Text style={styles.welcomeTitle}>Hi ,Welcome Back! 👋</Text>
      <Text style={styles.welcomeSubtitle}>Hello again , You have been missed!</Text>

      {/* Email Input */}
      <Text style={styles.inputLabel}>Email</Text>
      <TextInput
        placeholder="Email, phone & username"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      {/* Password Input */}
      <Text style={styles.inputLabel}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword} // Toggle based on showPassword state
          style={styles.passwordInput}
        />
        <TouchableOpacity 
          style={styles.eyeIcon}
          onPress={togglePasswordVisibility} // Add the toggle function
        >
          <Text>{showPassword ? '🐵' : '🙈'}</Text>
          {/* You can use different eye icons to represent open/closed states */}
        </TouchableOpacity>
      </View>

      {/* Remember Password & Forgot Password */}
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

      {/* Error Message */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.divider} />
      </View>

      {/* Social Login */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
                      <Image style={styles.socialButton}
                        source={require('../../images/google.png')}
                        resizeMode="contain"
                      />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
                      <Image style={styles.socialButton}
                        source={require('../../images/facebook.png')}
                        resizeMode="contain"
                      />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
                      <Image style={styles.socialButton}
                        source={require('../../images/apple.png')}
                        resizeMode="contain"
                      />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Your existing styles remain the same
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#FFF7D4',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
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
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc',
    padding: 15, 
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#FFF9E0',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#FFF9E0',
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
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
  },
  forgotText: {
    fontSize: 14,
    color: 'red',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#3B3227',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
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
    color: '#555',
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
  socialIcon: {
    fontSize: 20,
  },
});