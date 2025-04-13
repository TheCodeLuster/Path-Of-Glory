// src/components/Signup.js
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../App'; 

export default function Signup({ navigation, setToken }) {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    phone_number: ''
  });
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const responseData = await response.json();

      if (response.status !== 201) {
        console.log('Signup error response:', responseData);
        throw new Error('Signup failed: ' + JSON.stringify(responseData));
      }

      const accessToken = responseData.token;
      const userId = responseData.id;

      if (!accessToken || !userId) {
        throw new Error('Token or user ID not returned from server');
      }

      // Store token in AsyncStorage
      await AsyncStorage.setItem('accessToken', accessToken);
      
      // Navigate to DateOfBirth first
      navigation.replace('DateOfBirth', {
        userData: { id: userId, ...form },
        token: accessToken,
      });

      // Update token state after navigation
      setToken(accessToken);
    } catch (err) {
      console.error('Signup error:', err);
      setError('Signup error: ' + err.message);
    }
  };

  const fields = [
    { key: 'email', placeholder: 'Email' },
    { key: 'username', placeholder: 'Username' },
    { key: 'password', placeholder: 'Password', secure: true },
    { key: 'first_name', placeholder: 'First name' },
    { key: 'last_name', placeholder: 'Last name' },
    { key: 'phone_number', placeholder: 'Phone' },
  ];

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF7D4" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.description}>
            Create an account and enjoy a world of learning and connections.
          </Text>

          {fields.map(field => (
            <TextInput
              key={field.key}
              placeholder={field.placeholder}
              secureTextEntry={field.secure}
              value={form[field.key]}
              onChangeText={text => setForm({ ...form, [field.key]: text })}
              style={styles.input}
              placeholderTextColor="#666"
            />
          ))}

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7D4',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 33,
    marginBottom: 8,
    color: '#000',
    fontFamily: 'Raleway-Bold',
  },
  description: {
    fontSize: 15,
    color: '#333',
    marginBottom: 30,
    lineHeight: 22,
    fontFamily: 'Raleway-Regular',
  },
  input: {
    backgroundColor: '#FFF9E0',
    borderWidth: 2,
    borderColor: '#000000',
    padding: 16,
    marginBottom: 14,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Raleway-Regular',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontFamily: 'Raleway-Regular',
  },
  button: {
    backgroundColor: '#3B3227',
    padding: 16,
    borderRadius: 60,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
    fontFamily: 'Raleway-Regular',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#333',
    fontFamily: 'Raleway-Regular',
  },
  loginLink: {
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Bold',
  },
});