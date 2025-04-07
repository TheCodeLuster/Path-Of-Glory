import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function JoinNow({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Avatar images in rounded squares */}
      <View style={styles.gradientOverlay} />
      <View style={styles.gradientLayer} />
      <View style={styles.avatarsContainer}>
        <View style={[styles.avatarBox, styles.topLeftAvatar]}>
          <Image
            source={require('../../images/3.jpg')}
            style={styles.avatar}
            resizeMode="contain"
          />
        </View>
        
        <View style={[styles.avatarBox, styles.topRightAvatar]}>
          <Image
            source={require('../../images/4.jpg')}
            style={styles.avatar}
            resizeMode="contain"
          />
        </View>
        
        <View style={[styles.avatarBox, styles.bottomLeftAvatar]}>
          <Image
            source={require('../../images/2.jpg')}
            style={styles.avatar}
            resizeMode="contain"
          />
        </View>
        
        <View style={[styles.avatarBox, styles.bottomRightAvatar]}>
          <Image
            source={require('../../images/1.jpg')}
            style={styles.avatar}
            resizeMode="contain"
          />
        </View>
      </View>
      
      {/* Main title */}
      <Text style={styles.title}>Let's Get{'\n'}Started</Text>
      
      {/* Description */}
      <Text style={styles.description}>
        Unlock a world of limitless skills and knowledge{'\n'}
        with our free skill swapping app, where sharing is caring!
      </Text>
      
      {/* Join Now button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.buttonText}>Join Now</Text>
      </TouchableOpacity>
      
      {/* Login link */}
      <Text style={styles.loginContainer}>
        Already have an account? <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>Login</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'flex-end', // Align content to bottom
    paddingBottom: 50,
    position: 'relative', // Add relative positioning
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFB800', // Orange
  },
  gradientLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFDC52', // Yellow
    opacity: 0.7, // Adjust for blend effect
  },
  avatarsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
    padding: 20,
  },
  avatarBox: {
    position: 'absolute',
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLeftAvatar: {
    top: 75,
    left: 70,
    width: 120,
    height: 120,
    transform: [{ rotate: '-5deg' }],
    width: '31%',
    height: '31%',
  },
  topRightAvatar: {
    top: 50,
    left: 230,
    width: 90,
    height: 90,
    transform: [{ rotate: '3deg' }],
    width: '25%',
    height: '25%',
  },
  bottomLeftAvatar: {
    top: 170,
    left: 5,
    width: 100,
    height: 110,
    transform: [{ rotate: '3deg' }],
    width: '35%',
    height: '35%',
  },
  bottomRightAvatar: {
    top: 150,
    right: 10,
    width: 232.17,
    height: 225.48,
    transform: [{ rotate: '-6deg' }],
    width: '65%',
    height: '65%',
  },
  avatar: {
    width: '105%',
    height: '105%',
  },
  title: {
    fontSize: 47,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#000',
    lineHeight: 50,
  },
  description: {
    fontSize: 14,
    color: '#000',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 16,
    borderRadius: 80,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '400',
  },
  loginContainer: {
    fontSize: 16,
    color: '#5a5a5a',
    textAlign: 'center',
  },
  loginText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
