import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
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
    <DrawerContentScrollView {...props} style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <Image source={backArrowIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Menu</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuItems}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PersonalDetails')}>
          <Image source={personalDetailsIcon} style={styles.menuIcon} />
          <Text style={styles.menuText}>Personal Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Community')}>
          <Image source={communityIcon} style={styles.menuIcon} />
          <Text style={styles.menuText}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Premium')}>
          <Image source={premiumIcon} style={styles.menuIcon} />
          <Text style={styles.menuText}>Premium</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('TimeTable')}>
          <Image source={timetableIcon} style={styles.menuIcon} />
          <Text style={styles.menuText}>Time Table</Text>
          <View style={styles.selectedDot} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('History')}>
          <Image source={historyIcon} style={styles.menuIcon} />
          <Text style={styles.menuText}>History</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>PRIVACY POLICY • TERMS OF SERVICE</Text>
        <TouchableOpacity style={styles.footerItem}>
          <Image source={helpIcon} style={styles.menuIcon} />
          <Text style={styles.footerText}>Help and feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={handleLogout}>
          <Image source={logoutIcon} style={styles.menuIcon} />
          <Text style={styles.footerText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Raleway-bold',
    color: '#1A1A1A',
  },
  menuItems: {
    paddingHorizontal: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
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
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    padding: 15,
    marginTop: 20,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Raleway-regular',
    color: '#1A1A1A',
  },
});