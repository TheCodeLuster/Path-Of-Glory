// src/components/DrawerMenu.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const personalDetailsIcon = require('../../images/profile.png');
const communityIcon = require('../../images/community.png');
const premiumIcon = require('../../images/premium.png');
const timetableIcon = require('../../images/time-table.png');
const historyIcon = require('../../images/history.png');
const logoutIcon = require('../../images/logout.png');
const backArrowIcon = require('../../images/arrow.png'); 
const helpIcon = require('../../images/help.png');

export default function DrawerMenu(props) {
  const { navigation, setIsLoggedIn } = props;

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      navigation.closeDrawer();
      console.log('Logged out successfully');
      // Update the logged-in state, which will trigger the navigation change in App.js
      setIsLoggedIn(false);
    } catch (error) {
      console.log('Logout Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <Image source={backArrowIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Menu</Text>
      </View>

      {/* Divider under “Menu” */}
      <View style={styles.divider} />

      {/* Menu Items */}
      <View style={styles.menuItems}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PersonalDetails')}>
          <Image source={personalDetailsIcon} style={styles.menuIcon} />
          <Text style={styles.menuText}>Personal Details</Text>
        </TouchableOpacity>
        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Community')}>
          <Image source={communityIcon} style={styles.menuIcon} />
          <Text style={styles.menuText}>Community</Text>
        </TouchableOpacity>
        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Premium')}>
          <Image source={premiumIcon} style={styles.menuIcon} />
          <Text style={styles.menuText}>Premium</Text>
        </TouchableOpacity>
        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('TimeTable')}>
          <Image source={timetableIcon} style={styles.menuIcon} />
          <Text style={styles.menuText}>Time Table</Text>
          <View style={styles.selectedDot} />
        </TouchableOpacity>
        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('History')}>
          <Image source={historyIcon} style={styles.menuIcon} />
          <Text style={styles.menuText}>History</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerPolicy}>
          <Text style={styles.footerText}>
            Privacy Policy • Terms of Service
          </Text>
        </View>

        <View style={styles.footerDivider} />

        <View style={styles.footerActions}>
          <TouchableOpacity style={styles.footerItem}>
            <Image source={helpIcon} style={styles.footerIcon} />
            <Text style={styles.footerText1}>Help and feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={handleLogout}>
            <Image source={logoutIcon} style={styles.footerIcon} />
            <Text style={styles.footerText1}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 80,
    borderBottomRightRadius: 60
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 50,
  },
  backIcon: {
    width: 33, 
    height: 30,
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Raleway-bold',
    color: '#1A1A1A',
  },
  menuItems: {
    paddingHorizontal: 0,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15, 
    paddingLeft: 20,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    fontFamily: 'Raleway-regular',
    color: '#1A1A1A',
  },
  selectedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'red',
    marginLeft: 5,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    marginTop: 200
  },
  footerPolicy: {
    paddingBottom: 10,
  },
  footerDivider: {
    height: 2,
    backgroundColor: '#000',
    marginBottom: 10,
    width: '119.2%',         
    alignSelf: 'stretch',
    marginHorizontal: -20, 
  },
  footerActions: {
    // empty on purpose (actions stack naturally)
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerIcon: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Raleway-regular',
    color: '#000',
    textTransform: 'capitalize',
  },
  divider: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 7,  // space above/below the line
    height: 2,
  },
  footerText1: {
    fontSize: 14
  }
});