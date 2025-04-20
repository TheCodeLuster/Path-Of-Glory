import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
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
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      console.log('Selected image URI:', selectedImageUri); // Debug: Log the selected URI
      setProfileImage(selectedImageUri);
      setErrors('');
    } else {
      console.log('Image selection canceled'); // Debug: Log if the selection was canceled
    }
  };

  const validate = () => {
    console.log('Validating, profileImage:', profileImage); // Debug: Log the profileImage state
    if (!profileImage) {
      setErrors('Please upload a profile image');
      console.log('Validation failed: No profile image'); // Debug: Log validation failure
      return false;
    }
    setErrors('');
    console.log('Validation passed'); // Debug: Log validation success
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
      console.log('Appending profile image to FormData:', profileImage); // Debug: Log the image URI
      formDataToSend.append('profile_image', {
        uri: profileImage,
        name: 'profile_image.jpg',
        type: 'image/jpeg',
      });
    }

    try {
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

      console.log('Submitting FormData to:', url, 'with method:', method); // Debug: Log the API request details
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          // Do not set 'Content-Type' header; let fetch handle it for FormData
        },
        body: formDataToSend,
      });

      if (response.status === 201 || response.status === 200) {
        const data = await response.json();
        console.log('Profile submitted successfully:', data);
        navigation.navigate('Drawer');
      } else {
        const errorData = await response.json();
        console.error('Error submitting profile:', errorData);
        setErrors('Failed to submit profile. Please try again.');
      }
    } catch (error) {
      console.error('Network error submitting profile:', error);
      setErrors('Network error occurred. Please try again.');
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