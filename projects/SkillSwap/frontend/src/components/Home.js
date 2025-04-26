// src/components/Home.js
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const menuIcon = require('../../images/menu.png');
const searchIcon = require('../../images/search.png');
const premiumIcon = require('../../images/premium.png');
const heartIcon = require('../../images/like.png');
const shareIcon = require('../../images/chat1.png');
const plusIcon = require('../../images/chat2.png');
const swapImage = require('../../images/swap.png');
const courseImage = require('../../images/logo.png');
const homeIcon = require('../../images/home.png');
const starIcon = require('../../images/star.png');
const userIcon = require('../../images/user.png');
const avatar1 = require('../../images/avatar1.png');
const avatar2 = require('../../images/avatar2.png');
const avatar3 = require('../../images/avatar3.png');

export default function Home({ setIsLoggedIn }) {
  const navigation = useNavigation();

  // Set navigation options to ensure no header/status bar interference
  useEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ensure no navigation header is shown
    });
  }, [navigation]);

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
          <View style={styles.avatarsContainer}>
            <Image source={avatar1} style={[styles.avatar, { zIndex: 3 }]} />
            <Image source={avatar2} style={[styles.avatar, { marginLeft: -10, zIndex: 2 }]} />
            <Image source={avatar3} style={[styles.avatar, { marginLeft: -10, zIndex: 1 }]} />
            <Text style={styles.avatarsText}>100+</Text>
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
            <View style={styles.courseImageContainer}>
              <Image source={courseImage} style={styles.courseImage} />
            </View>
            <View style={styles.courseStats}>
              <Text style={styles.courseStat}>21,390 students</Text>
              <Text style={styles.courseStat}>10h 26m</Text>
            </View>
            <Text style={styles.courseDescription}>
              Learn UI/UX Design, Figma and
            </Text>
            <Text style={styles.courseDescription}>
              Prototyping
            </Text>
            <Text style={styles.courseAuthor}>— Brad Frost</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity>
          <Image source={homeIcon} style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={starIcon} style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={swapImage} style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={userIcon} style={styles.bottomIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7D4',
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 20,
    backgroundColor: '#B89653',
    width: '100%',
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 27,
    height: 27,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Raleway-bold',
    color: '#1A1A1A',
    marginBottom: 30,
    marginTop: 30,
    textAlign: 'left',
  },
  card: {
    backgroundColor: '#FFE082',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    alignSelf: 'left',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Raleway-bold',
    color: '#1A1A1A',
    marginBottom: 5,
    textAlign: 'left',
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: 'Raleway-regular',
    color: '#1A1A1A',
    marginBottom: 15,
    textAlign: 'left',
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
  avatarsContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
  },
  avatarsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginLeft: 5,
  },
  seeMore: {
    fontSize: 14,
    fontFamily: 'Raleway-regular',
    color: '#1A1A1A',
    textDecorationLine: 'underline',
    textAlign: 'left',
  },
  section: {
    marginBottom: 10,
    width: '100%',
    alignSelf: 'left',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Raleway-bold',
    color: '#1A1A1A',
    textAlign: 'left',
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    borderWidth: 2,
    borderColor: '#FFE27F',
    elevation: 2,
    width: '100%',
    height: '67%',
    alignSelf: 'left',
    borderWidth: 4
  },
  courseImageContainer: {
    backgroundColor: '#FFD95A',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: -20, // Extend the yellow container horizontally
    marginTop: -15, // Extend the yellow container at the top
    marginBottom: 10,
    padding: 10, // Add padding to keep the image inside the white container
  },
  courseImage: {
    width: '100%',
    height: 160,
    borderRadius: 10,
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  courseStat: {
    fontSize: 12,
    fontFamily: 'Raleway-regular',
    color: '#666',
  },
  courseDescription: {
    fontSize: 16,
    fontFamily: 'Raleway-bold',
    color: '#1A1A1A',
    lineHeight: 17,
    textAlign: 'left',
    letterSpacing: 1.1
  },
  courseAuthor: {
    fontSize: 12,
    fontFamily: 'Raleway-regular',
    color: '#666',
    marginTop: 10,
    textAlign: 'left',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 81,
    backgroundColor: '#B89653',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomIcon: {
    width: 27,
    height: 27,
    tintColor: '#1A1A1A',
  },
});