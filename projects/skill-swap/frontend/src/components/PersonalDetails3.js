// src/components/PersonalDetails3.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BASE_URL } from '../../App';

export default function PersonalDetails3({ navigation, route }) {
  const { formData = {}, userData, token, setIsSignupFlow } = route.params || {};
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
      allowsMultipleSelection: false,
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
      console.log('Appending profile image to FormData:', profileImage);
      formDataToSend.append('profile_image', {
        uri: profileImage,
        name: 'profile_image.jpg',
        type: 'image/jpeg',
      });
    }

    try {
      let method = 'POST';
      let url = `${BASE_URL}/userprofile/`;
      console.log('Checking if profile exists for user ID:', userData.id);
      console.log('Token being sent for GET request:', token);
      const checkResponse = await fetch(`${BASE_URL}/userprofile/${userData.id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Check response status:', checkResponse.status);
      const checkContentType = checkResponse.headers.get('content-type');
      if (!checkContentType || !checkContentType.includes('application/json')) {
        const checkText = await checkResponse.text();
        console.log('Check request non-JSON response:', checkText);
        throw new Error(`Expected JSON for check request, but received: ${checkText.slice(0, 100)}... (Status: ${checkResponse.status})`);
      }

      const checkData = await checkResponse.json();
      console.log('Check response data:', checkData);

      if (checkResponse.status === 200) {
        method = 'PATCH';
        url = `${BASE_URL}/userprofile/${userData.id}/`;
        console.log('Profile exists, switching to PATCH');
      } else if (checkResponse.status === 404) {
        console.log('Profile does not exist, proceeding with POST');
      } else {
        throw new Error(`Profile check failed with status ${checkResponse.status}: ${JSON.stringify(checkData)}`);
      }

      console.log('Token being sent for submit request:', token);
      console.log('Submitting FormData to:', url, 'with method:', method);
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', [...response.headers.entries()]);

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.log('Non-JSON response:', text);
        throw new Error(`Expected JSON, but received: ${text.slice(0, 100)}... (Status: ${response.status})`);
      }

      const data = await response.json();

      if (response.status === 201 || response.status === 200) {
        console.log('Profile submitted successfully:', data);
        setIsSignupFlow(false);
        navigation.navigate('Drawer');
      } else if (response.status === 400 && data.error === 'UserProfile already exists for this user') {
        console.log('Profile already exists, but GET request failed to find it. Switching to PATCH and retrying...');
        method = 'PATCH';
        url = `${BASE_URL}/userprofile/${userData.id}/`;
        const retryResponse = await fetch(url, {
          method: method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        });

        console.log('Retry response status:', retryResponse.status);
        const retryContentType = retryResponse.headers.get('content-type');
        if (!retryContentType || !retryContentType.includes('application/json')) {
          const retryText = await retryResponse.text();
          console.log('Retry non-JSON response:', retryText);
          throw new Error(`Expected JSON on retry, but received: ${retryText.slice(0, 100)}... (Status: ${retryResponse.status})`);
        }

        const retryData = await retryResponse.json();
        if (retryResponse.status === 200) {
          console.log('Profile updated successfully on retry:', retryData);
          setIsSignupFlow(false);
          navigation.navigate('Drawer');
        } else {
          console.error('Retry failed:', retryData);
          setErrors(`Failed to update profile on retry: ${JSON.stringify(retryData)} (Status: ${retryResponse.status})`);
        }
      } else {
        console.error('Error submitting profile:', data);
        setErrors(`Failed to submit profile: ${JSON.stringify(data)} (Status: ${response.status})`);
      }
    } catch (error) {
      console.error('Network error submitting profile:', error);
      setErrors(`Network error: ${error.message}`);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.keyboardAvoidingContainer, { backgroundColor: '#FFF7D4' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={[styles.scrollContainer, { backgroundColor: '#FFF7D4' }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Upload your Pictures</Text>
          <Text style={styles.subtitle}>Personalize your account with a profile picture upload</Text>

          <View style={styles.uploadContainer}>
            <TouchableOpacity style={[styles.uploadField, styles.upperUploadField]} onPress={pickImage}>
              <View style={styles.innerUploadField}>
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.selectedImage} />
                ) : (
                  <>
                    <Image source={require('../../images/upload.png')} style={styles.uploadIcon} />
                    <Text style={styles.uploadText}>Upload Picture</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.uploadField, styles.lowerUploadField]} onPress={pickImage}>
              <View style={styles.innerUploadField}>
                <Image source={require('../../images/upload.png')} style={styles.uploadIcon} />
              </View>
            </TouchableOpacity>
            <Text style={styles.instruction}>Please upload a minimum of 1 picture from the available 2</Text>
          </View>

          {errors ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorIcon}>⚠</Text>
              <Text style={styles.error}>{errors}</Text>
            </View>
          ) : null}

          <View style={styles.navigation}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.doneButton} onPress={handleSubmit}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#FFF7D4',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF7D4',
    alignItems: 'center',
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    fontFamily: 'Raleway-Bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'left',
    alignSelf: 'center',
    width: '100%',
    marginTop: 80,
  },
  subtitle: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'Raleway-Regular',
    lineHeight: 19,
    marginBottom: 50,
    textAlign: 'left',
    alignSelf: 'center',
    width: '100%',
  },
  uploadContainer: {
    backgroundColor: '#FFE9AA',
    borderRadius: 8,
    alignItems: 'center',
    width: 380,
    height: 404,
    justifyContent: 'center',
  },
  uploadField: {
    backgroundColor: '#B89653',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  innerUploadField: {
    borderWidth: 2,
    borderColor: '#D9D9D9',
    borderStyle: 'dashed',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  upperUploadField: {
    width: 332,
    height: 217,
    marginBottom: 10,
  },
  lowerUploadField: {
    width: 350,
    height: 94,
  },
  uploadIcon: {
    width: 30,
    height: 30,
    tintColor: '#000',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  uploadText: {
    fontSize: 14,
    fontFamily: 'Raleway-Regular',
    color: '#000',
    marginTop: 10,
  },
  instruction: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
    marginVertical: 10,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  errorIcon: {
    fontSize: 12,
    color: 'red',
    marginRight: 5,
  },
  error: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#000',
  },
  doneButton: {
    backgroundColor: '#3B3227',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
  },
});