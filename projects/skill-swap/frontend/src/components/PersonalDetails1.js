// src/components/PersonalDetails1.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Occupation options based on the Django serializer
const occupations = [
  'Accountant', 'Actor', 'Actuary', 'Administrative Assistant', 'Architect', 'Artist', 'Biologist',
  'Business Analyst', 'Carpenter', 'Chef', 'Civil Engineer', 'Consultant', 'Dentist', 'Designer',
  'Web Developer', 'Economist', 'Electrician', 'Engineer', 'Financial Analyst', 'Firefighter',
  'Graphic Designer', 'Human Resources Manager', 'Journalist', 'Lawyer', 'Librarian', 'Manager',
  'Mechanic', 'Nurse', 'Nutritionist', 'Optometrist', 'Pharmacist', 'Photographer', 'Physician',
  'Physicist', 'Pilot', 'Plumber', 'Police Officer', 'Professor', 'Programmer', 'Psychologist',
  'Receptionist', 'Salesperson', 'Scientist', 'Secretary', 'Software Engineer', 'Teacher',
  'Technician', 'Therapist', 'Translator', 'Writer'
];

export default function PersonalDetails1({ navigation, route }) {
  const { userData } = route.params || {};
  const [occupation, setOccupation] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch existing UserProfile data to prefill fields
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
          if (profileData.occupation) setOccupation(profileData.occupation);
          if (profileData.description) setDescription(profileData.description);
        }
      } catch (error) {
        console.log('No existing UserProfile found, will create a new one.');
      }
    };

    if (userData?.id) {
      fetchUserProfile();
    }
  }, [userData]);

  // Handle the "Next" button press
  const handleContinue = async () => {
    setIsLoading(true);

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
        url = `https://dbc1-46-119-171-85.ngrok-free.app/api/userprofile/${userData?.id}/`;
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(
          method === 'POST'
            ? { user: userData?.id, occupation, description }
            : { occupation, description }
        ),
      });

      if (response.status === 201 || response.status === 200) {
        navigation.navigate('PersonalDetails2'); // Adjust to your next screen
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to save personal details');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Hide the default header
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF7D4" />
      <View style={styles.container}>
        {/* Title and Description */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Personal Details</Text>
          <Text style={styles.description}>
            Provide your occupation and a brief description about yourself.
          </Text>
        </View>

        {/* Occupation Dropdown */}
        <Text style={styles.label}>Occupation</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={occupation}
            onValueChange={(itemValue) => setOccupation(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select an occupation" value="" />
            {occupations.map((occ, index) => (
              <Picker.Item key={index} label={occ} value={occ} />
            ))}
          </Picker>
        </View>

        {/* Description Text Area */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textArea}
          value={description}
          onChangeText={setDescription}
          placeholder="Tell us about yourself..."
          multiline={true}
          numberOfLines={4}
        />

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

// Styles matching the screenshot
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#FFF7D4',
    justifyContent: 'space-between',
  },
  textContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 33,
    color: '#000',
    fontFamily: 'Raleway-Bold',
    textAlign: 'left',
  },
  description: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    fontFamily: 'Raleway-Regular',
    textAlign: 'left',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
    fontFamily: 'Raleway-Regular',
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 10,
    backgroundColor: '#FFF9E0',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  textArea: {
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 10,
    backgroundColor: '#FFF9E0',
    padding: 15,
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
    textAlignVertical: 'top',
    height: 120,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
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