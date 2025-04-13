// src/components/PersonalDetails3.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BASE_URL } from '../../App';

export default function PersonalDetails3({ navigation, route }) {
  const { formData = {}, userData, token } = route.params || {};
  const [profileImage, setProfileImage] = useState(formData.profileImage || null);
  const [errors, setErrors] = useState('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false, // Only one image allowed
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setErrors('');
    }
  };

  const validate = () => {
    if (!profileImage) {
      setErrors('Please upload a profile image');
      return false;
    }
    setErrors('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const updatedFormData = { ...formData, profileImage };

    // Prepare form data for submission
    const formDataToSend = new FormData();
    formDataToSend.append('user', userData.id);
    formDataToSend.append('date_of_birth', formData.date_of_birth || '');
    formDataToSend.append('occupation', formData.occupation || '');
    formDataToSend.append('skill_owned', formData.skill_owned || '');
    formDataToSend.append('experience', formData.experience || 0);
    formDataToSend.append('location', formData.location || '');
    formDataToSend.append('work_link', formData.work_link || '');
    formDataToSend.append('description', formData.description || '');
    formDataToSend.append('achievements', formData.achievements || '');

    if (profileImage) {
      formDataToSend.append('profile_image', {
        uri: profileImage,
        name: 'profile_image.jpg',
        type: 'image/jpeg',
      });
    }

    try {
      // Check if a UserProfile already exists
      let method = 'POST';
      let url = `${BASE_URL}/userprofile/`;
      const checkResponse = await fetch(`${BASE_URL}/userprofile/${userData.id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (checkResponse.status === 200) {
        method = 'PATCH';
        url = `${BASE_URL}/userprofile/${userData.id}/`;
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.status === 201 || response.status === 200) {
        const data = await response.json();
        console.log('Profile submitted successfully:', data);
        navigation.navigate('Drawer'); // Navigate to Drawer (Home)
      } else {
        const errorData = await response.json();
        console.error('Error submitting profile:', errorData);
        setErrors('Failed to submit profile. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting profile:', error);
      setErrors('Network error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload your Picture</Text>
      <Text style={styles.subtitle}>Personalize your account with a profile picture upload</Text>

      <View style={styles.uploadContainer}>
        <TouchableOpacity style={styles.uploadField} onPress={pickImage}>
          <Text style={styles.uploadText}>↑ Upload Picture</Text>
        </TouchableOpacity>
        <Text style={styles.instruction}>Please upload 1 profile picture</Text>
      </View>

      {errors ? <Text style={styles.error}>{errors}</Text> : null}

      <View style={styles.navigation}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>⟵</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.doneButton} onPress={handleSubmit}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF7D4',
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Raleway-Bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Raleway-Regular',
    marginBottom: 30,
  },
  uploadContainer: {
    backgroundColor: '#FFE9AA',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  uploadField: {
    backgroundColor: '#B89653',
    borderWidth: 2,
    borderColor: '#D9D9D9',
    borderStyle: 'dashed',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
    color: '#333',
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Raleway-Regular',
    marginTop: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 10,
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
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
  doneButton: {
    backgroundColor: '#3B3227',
    padding: 16,
    borderRadius: 60,
    alignItems: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 18,
    fontFamily: 'Raleway-Regular',
    letterSpacing: 1,
  },
});