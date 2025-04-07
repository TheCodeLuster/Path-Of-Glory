// src/components/Signup.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Signup({ navigation }) {
  const [form, setForm] = useState({ 
    email: '',
    username: '', 
    password: '', 
    first_name: '', 
    last_name: '', 
    phone_number: ''
  });
  const [error, setError] = useState('');

  const handleSignup = () => {
    fetch('https://1d22-46-119-171-85.ngrok-free.app/api/user/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => {
        if (res.status === 201) return res.json();
        throw new Error('Signup failed');
      })
      .then(data => {
        navigation.replace('Login');
      })
      .catch(() => setError('Signup error'));
  };

  // Fields in the correct order as specified
  const fields = [
    { key: 'email', placeholder: 'Email' },
    { key: 'username', placeholder: 'Username' },
    { key: 'password', placeholder: 'Password', secure: true },
    { key: 'first_name', placeholder: 'First name' },
    { key: 'last_name', placeholder: 'Last name' },
    { key: 'phone_number', placeholder: 'Phone' },
  ];

  return (
    <View style={styles.container}>
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
          onChangeText={text => setForm({...form, [field.key]: text})}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center',
    backgroundColor: '#FFF7D4',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  description: {
    fontSize: 15,
    color: '#333',
    marginBottom: 30,
    lineHeight: 22,
  },
  input: { 
    backgroundColor: '#FFF9E0',
    borderWidth: 1, 
    borderColor: '#D9D0A7',
    padding: 16, 
    marginBottom: 14,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  error: { 
    color: 'red', 
    marginBottom: 10
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
    fontWeight: '600',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#333',
  },
  loginLink: {
    color: '#000',
    fontWeight: 'bold',
  }
});