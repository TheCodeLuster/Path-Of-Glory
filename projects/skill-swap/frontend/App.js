import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabsNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, StatusBar, Image } from 'react-native';
import * as Font from 'expo-font';

import LoginScreen from './src/components/Login';
import SignupScreen from './src/components/SignUp';
import HomeScreen from './src/components/Home';
import JoinNow from './src/components/JoinNow';
import Dateofbirth from './src/components/Dateofbirth';
import DrawerMenu from './src/components/DrawerMenu';

// Placeholder screens for other tabs (replace with actual components)
const ChatsScreen = () => <View><Text>Chats Screen</Text></View>;
const SwapsScreen = () => <View><Text>Swaps Screen</Text></View>;
const ProfileScreen = () => <View><Text>Profile Screen</Text></View>;

// Icons for the tab bar (already provided in your code)
const homeIcon = require('../../images/home.png');
const chatsIcon = require('../../images/chat1.png');
const swapsIcon = require('../../images/swap.png');
const profileIcon = require('../../images/user.png');

const Stack = createStackNavigator();
const Tab = createBottomTabsNavigator();
const Drawer = createDrawerNavigator();

// Auth Stack for login/signup flow
function AuthStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator initialRouteName="JoinNow">
      <Stack.Screen
        name="JoinNow"
        component={(props) => <JoinNow {...props} setIsLoggedIn={setIsLoggedIn} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={(props) => <SignupScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dateofbirth"
        component={(props) => <Dateofbirth {...props} setIsLoggedIn={setIsLoggedIn} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={(props) => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Tab Navigator for the footer navigation
function MainTabs({ setIsLoggedIn }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          if (route.name === 'Home') {
            icon = homeIcon;
          } else if (route.name === 'Chats') {
            icon = chatsIcon;
          } else if (route.name === 'Swaps') {
            icon = swapsIcon;
          } else if (route.name === 'Profile') {
            icon = profileIcon;
          }
          return <Image source={icon} style={{ width: size, height: size, tintColor: color }} />;
        },
        tabBarActiveTintColor: '#3B3227',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#FFF7D4',
          borderTopWidth: 0,
          paddingBottom: 5,
          paddingTop: 5,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={(props) => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Swaps"
        component={SwapsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

// Drawer Navigator for the swipe menu
function MainDrawer({ setIsLoggedIn }) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerMenu {...props} setIsLoggedIn={setIsLoggedIn} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#FFFFFF',
          width: 250,
        },
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={(props) => <MainTabs {...props} setIsLoggedIn={setIsLoggedIn} />}
        options={{ headerShown: false }}
      />
      {/* Placeholder screens for drawer menu items */}
      <Drawer.Screen name="PersonalDetails" component={() => <Text>Personal Details</Text>} />
      <Drawer.Screen name="Community" component={() => <Text>Community</Text>} />
      <Drawer.Screen name="Premium" component={() => <Text>Premium</Text>} />
      <Drawer.Screen name="TimeTable" component={() => <Text>Time Table</Text>} />
      <Drawer.Screen name="History" component={() => <Text>History</Text>} />
      <Drawer.Screen name="Portfolio" component={() => <Text>Portfolio</Text>} />
      <Drawer.Screen name="PersonaliseCoaching" component={() => <Text>Personalise Coaching</Text>} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  // Check token and set login state
  useEffect(() => {
    AsyncStorage.getItem('accessToken')
      .then((token) => {
        setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Wait for both fonts and token to load
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
      <NavigationContainer>
        {isLoggedIn ? <MainDrawer setIsLoggedIn={setIsLoggedIn} /> : <AuthStack setIsLoggedIn={setIsLoggedIn} />}
      </NavigationContainer>
    </>
  );
}