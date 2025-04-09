import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Placeholder icons (replace with actual assets)
const personalDetailsIcon = require('../../images/personal-details.png');
const communityIcon = require('../../images/community.png');
const premiumIcon = require('../../images/premium.png');
const timetableIcon = require('../../images/timetable.png');
const historyIcon = require('../../images/history.png');
const portfolioIcon = require('../../images/portfolio.png');
const coachingIcon = require('../../images/coaching.png');
const logoutIcon = require('../../images/logout.png');

export default function DrawerMenu(props) {
  const { navigation, setIsLoggedIn } = props;

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      setIsLoggedIn(false);
      navigation.closeDrawer();
      console.log('Logged out successfully');
    } catch (error) {
      console.log('Logout Error:', error);
    }
  };

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <Text style={styles.title}>Menu</Text>
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
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('History')}>
          <Image source={historyIcon} style={styles.menuIcon} />
          <Text style={styles.menuText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Portfolio')}>
          <Image source={portfolioIcon} style={styles.menuIcon} />
          <Text style={styles.menuText}>Portfolio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PersonaliseCoaching')}>
          <Image source={coachingIcon} style={styles.menuIcon} />
          <Text style={styles.menuText}>Personalise Coaching</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>PRIVACY POLICY • TERMS OF SERVICE</Text>
        <TouchableOpacity style={styles.footerItem}>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Raleway-bold',
    color: '#1A1A1A',
    padding: 15,
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