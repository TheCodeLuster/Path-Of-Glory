// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

import LoginScreen from './src/components/Login';
import SignupScreen from './src/components/SignUp';
import HomeScreen from './src/components/Home';
import JoinNow from './src/components/JoinNow';


const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Check for token on app start
  useEffect(() => {
    AsyncStorage.getItem('accessToken')
      .then(t => {
        setToken(t);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token == null ? (
          <>
            <Stack.Screen name="JoinNow" component={JoinNow} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} token={token} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
