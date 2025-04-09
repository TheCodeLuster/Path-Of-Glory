import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// Placeholder icons (replace with actual assets)
const menuIcon = require('../../images/menu.png');
const searchIcon = require('../../images/search.png');
const premiumIcon = require('../../images/premium.png');
const heartIcon = require('../../images/like.png');
const shareIcon = require('../../images/chat1.png');
const plusIcon = require('../../images/chat2.png');
const bookmarkIcon = require('../../images/home.png');
const swapImage = require('../../images/swap.png'); // Replace with actual image
const courseImage = require('../../images/logo.png'); // Replace with actual image

export default function Home({ setIsLoggedIn }) {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      setIsLoggedIn(false);
      console.log('Logged out successfully');
    } catch (error) {
      console.log('Logout Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={menuIcon} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.topBarRight}>
          <TouchableOpacity>
            <Image source={searchIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={premiumIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Swap, learn, grow</Text>

        {/* Most Collaborated Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Most Collaborated</Text>
          <Text style={styles.cardSubtitle}>
            Discover the most accomplished and influential professionals
          </Text>
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Image source={heartIcon} style={styles.statIcon} />
              <Text style={styles.statText}>20k+</Text>
            </View>
            <View style={styles.statItem}>
              <Image source={shareIcon} style={styles.statIcon} />
              <Text style={styles.statText}>500</Text>
            </View>
            <View style={styles.statItem}>
              <Image source={plusIcon} style={styles.statIcon} />
              <Text style={styles.statText}>1k+</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        </View>

        {/* Free Learning Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Free Learning</Text>
            <TouchableOpacity>
              <Text style={styles.seeMore}>See more</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.courseCard}>
            <Image source={courseImage} style={styles.courseImage} />
            <Text style={styles.courseTitle}>UX DESIGNER IN 3 MONTHS</Text>
            <View style={styles.courseStats}>
              <Text style={styles.courseStat}>21,390 students</Text>
              <Text style={styles.courseStat}>10h 26m</Text>
            </View>
            <Text style={styles.courseDescription}>
              Learn UI/UX Design, Figma and Prototyping
            </Text>
            <Text style={styles.courseAuthor}>— Brad Frost</Text>
            <TouchableOpacity style={styles.bookmark}>
              <Image source={bookmarkIcon} style={styles.bookmarkIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7D4',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF7D4',
  },
  topBarRight: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Raleway-bold',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFE082',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Raleway-bold',
    color: '#1A1A1A',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: 'Raleway-regular',
    color: '#1A1A1A',
    marginBottom: 15,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  statText: {
    fontSize: 14,
    fontFamily: 'Raleway-regular',
    color: '#1A1A1A',
  },
  seeMore: {
    fontSize: 14,
    fontFamily: 'Raleway-regular',
    color: '#1A1A1A',
    textDecorationLine: 'underline',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Raleway-bold',
    color: '#1A1A1A',
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    elevation: 2,
  },
  courseImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Raleway-bold',
    color: '#1A1A1A',
    marginBottom: 5,
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  courseStat: {
    fontSize: 12,
    fontFamily: 'Raleway-regular',
    color: '#666',
  },
  courseDescription: {
    fontSize: 14,
    fontFamily: 'Raleway-regular',
    color: '#1A1A1A',
    marginBottom: 5,
  },
  courseAuthor: {
    fontSize: 12,
    fontFamily: 'Raleway-regular',
    color: '#666',
  },
  bookmark: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  bookmarkIcon: {
    width: 20,
    height: 20,
  },
});