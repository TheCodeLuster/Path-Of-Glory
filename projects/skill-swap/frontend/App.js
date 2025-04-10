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
import Dateofbirth from './src/components/Dateofbirth';
import DrawerMenu from './src/components/DrawerMenu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator for authenticated screens
function DrawerNavigator({ token, setToken, navigation }) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerMenu {...props} setIsLoggedIn={() => setToken(null)} />}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        options={{ headerShown: false }}
      >
        {(props) => <HomeScreen {...props} token={token} setIsLoggedIn={() => setToken(null)} />}
      </Drawer.Screen>
      {/* Add other authenticated screens here if needed */}
    </Drawer.Navigator>
  );
}

// Main App
export default function App() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load fonts
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

  // Check for token
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

  // Create a navigation ref to access the navigator outside of components
  const navigationRef = React.useRef(null);

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
        <Stack.Navigator>
          {token == null ? (
            <>
              <Stack.Screen name="JoinNow" component={JoinNow} options={{ headerShown: false }} />
              <Stack.Screen name="Login" options={{ headerShown: false }}>
                {(props) => <LoginScreen {...props} setToken={setToken} />}
              </Stack.Screen>
              <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Dateofbirth" component={Dateofbirth} options={{ headerShown: false }} />
            </>
          ) : (
            <Stack.Screen name="Drawer" options={{ headerShown: false }}>
              {(props) => <DrawerNavigator {...props} token={token} setToken={setToken} navigation={navigationRef.current} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}