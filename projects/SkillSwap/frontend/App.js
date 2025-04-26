// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, StatusBar } from 'react-native';
import * as Font from 'expo-font';

import LoginScreen from './src/components/Login';
import SignupScreen from './src/components/SignUp';
import HomeScreen from './src/components/Home';
import JoinNow from './src/components/JoinNow';
import DateOfBirth from './src/components/Dateofbirth';
import PersonalDetails1 from './src/components/PersonalDetails1';
import PersonalDetails2 from './src/components/PersonalDetails2';
import PersonalDetails3 from './src/components/PersonalDetails3';
import DrawerMenu from './src/components/DrawerMenu';

export const BASE_URL = 'https://5207-178-212-111-254.ngrok-free.app';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator({ token, setToken, navigation }) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerMenu {...props} setIsLoggedIn={() => setToken(null)} />}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" options={{ headerShown: false }}>
        {(props) => <HomeScreen {...props} token={token} setIsLoggedIn={() => setToken(null)} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isSignupFlow, setIsSignupFlow] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
        'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('accessToken');
        setToken(storedToken);
        setLoading(false);
      } catch (error) {
        console.log('Error checking token:', error);
        setLoading(false);
      }
    };
    checkToken();
  }, []);

  const navigationRef = React.useRef(null);

  // Reset navigation stack after token is loaded, but only if not in signup flow
  useEffect(() => {
    if (!loading && navigationRef.current && !isSignupFlow) {
      const initialRoute = token ? 'Drawer' : 'JoinNow';
      navigationRef.current.reset({
        index: 0,
        routes: [{ name: initialRoute }],
      });
    }
  }, [loading, token, isSignupFlow]);

  if (loading || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF7D4" />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="JoinNow">
          <Stack.Screen name="JoinNow" component={JoinNow} options={{ headerShown: false }} />
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => <LoginScreen {...props} setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen name="Signup" options={{ headerShown: false }}>
            {(props) => (
              <SignupScreen
                {...props}
                setToken={setToken}
                setIsSignupFlow={setIsSignupFlow}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="DateOfBirth" options={{ headerShown: false }}>
            {(props) => (
              <DateOfBirth {...props} setIsSignupFlow={setIsSignupFlow} />
            )}
          </Stack.Screen>
          <Stack.Screen name="PersonalDetails1" options={{ headerShown: false }}>
            {(props) => (
              <PersonalDetails1 {...props} setIsSignupFlow={setIsSignupFlow} />
            )}
          </Stack.Screen>
          <Stack.Screen name="PersonalDetails2" options={{ headerShown: false }}>
            {(props) => (
              <PersonalDetails2 {...props} setIsSignupFlow={setIsSignupFlow} />
            )}
          </Stack.Screen>
          <Stack.Screen name="PersonalDetails3" options={{ headerShown: false }}>
            {(props) => (
              <PersonalDetails3 {...props} setIsSignupFlow={setIsSignupFlow} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Drawer" options={{ headerShown: false }}>
            {(props) => (
              <DrawerNavigator
                {...props}
                token={token}
                setToken={setToken}
                navigation={navigationRef.current}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}