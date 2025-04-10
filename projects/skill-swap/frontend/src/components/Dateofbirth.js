// src/components/DateOfBirth.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DateOfBirth({ navigation, route }) {
  const { userData } = route.params || {};
  const [selectedDate, setSelectedDate] = useState('2003-05-06');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await fetch(
          `https://dbc1-46-119-171-85.ngrok-free.app/api/userprofile/${userData?.id}/`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const profileData = await response.json();
          if (profileData.date_of_birth) {
            setSelectedDate(profileData.date_of_birth);
          }
        }
      } catch (error) {
        console.log('No existing UserProfile found, will create a new one.');
      }
    };

    if (userData?.id) {
      fetchUserProfile();
    }
  }, [userData]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleContinue = async () => {
    setIsLoading(true);

    const date = new Date(selectedDate);
    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
    if (date > minAgeDate) {
      Alert.alert('Error', 'You must be at least 13 years old to proceed.');
      setIsLoading(false);
      return;
    }

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      let method = 'POST';
      let url = 'https://dbc1-46-119-171-85.ngrok-free.app/api/userprofile/';
      const checkResponse = await fetch(
        `https://dbc1-46-119-171-85.ngrok-free.app/api/userprofile/${userData?.id}/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (checkResponse.status === 200) {
        method = 'PATCH';
        url = `https://daa5-46-119-171-85.ngrok-free.app/api/userprofile/${userData?.id}/`;
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(
          method === 'POST'
            ? {
                user: userData?.id,
                date_of_birth: selectedDate,
                occupation: 'Teacher',
                skill_owned: 'Teaching',
                experience: 0,
                location: 'Unknown',
                work_link: 'https://example.com',
                description: 'New user',
                achievements: 'None',
                profile_image: 'https://example.com/image.jpg',
              }
            : { date_of_birth: selectedDate }
        ),
      });

      if (response.status === 201 || response.status === 200) {
        navigation.replace('PersonalDetails1');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to save date of birth');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF7D4" />
      <View style={styles.container}>
        {/* Title and Description */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Date of Birth</Text>
          <Text style={styles.description}>
            Enter your date of birth for better skill matching and personalized recommendations.
          </Text>
        </View>

        {/* Calendar */}
        <View style={styles.datePickerContainer}>
          <Calendar
            current={'2003-05-06'}
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#000' },
            }}
            theme={{
              backgroundColor: '#FBEAA0',
              calendarBackground: '#FBEAA0',
              textSectionTitleColor: '#000',
              selectedDayBackgroundColor: '#000',
              selectedDayTextColor: '#FFF',
              todayTextColor: '#3B3227',
              dayTextColor: '#000',
              textDisabledColor: '#999',
              arrowColor: '#000',
              monthTextColor: '#000',
              textDayFontFamily: 'Raleway-Regular',
              textMonthFontFamily: 'Raleway-Bold',
              textDayHeaderFontFamily: 'Raleway-Regular',
              textDayFontSize: 22, // Larger day numbers
              textMonthFontSize: 26, // Larger month/year
              textDayHeaderFontSize: 18, // Larger day headers
            }}
            style={styles.calendar}
            maxDate={new Date().toISOString().split('T')[0]}
            enableSwipeMonths={true} // Enable month navigation
          />
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.nextButton, isLoading && styles.buttonDisabled]}
            onPress={handleContinue}
            disabled={isLoading}
          >
            <Text style={styles.nextButtonText}>
              {isLoading ? 'Saving...' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 110, // Adjust this to move the text higher or lower
    backgroundColor: '#FFF7D4',
  },
  textContainer: {
    alignItems: 'flex-start', // Left-align text
    marginBottom: 50, // Space between description and calendar
  },
  title: {
    fontSize: 33,
    color: '#000',
    fontFamily: 'Raleway-Bold',
    textAlign: 'left',
    marginBottom: 7,
  },
  description: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    fontFamily: 'Raleway-Regular',
    textAlign: 'left',
  },
  datePickerContainer: {
    backgroundColor: '#FBEAA0',
    borderRadius: 10,
    width: '100%',
  },
  calendar: {
    width: '100%',
    height: '50%',
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 'auto', // Push buttons to the bottom
    paddingBottom: 110, // Adjust this to position buttons lower
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
  },
  nextButton: {
    backgroundColor: '#3B3227',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
  },
  buttonDisabled: {
    backgroundColor: '#666',
  },
});
