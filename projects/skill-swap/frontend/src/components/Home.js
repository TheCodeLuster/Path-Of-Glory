// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ token, navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/current_user/', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(setUser)
      .catch(console.error);
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    navigation.replace('Login');
  };

  if (!user) {
    return <ActivityIndicator style={{flex:1}} />;
  }

  return (
    <View style={styles.container}>
      <Text>Welcome, {user.first_name}!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center' },
});
