// src/components/PersonalDetails1.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_MAPS_API_KEY } from '@env';

// Initialize Geocoder with your Google Maps API key
Geocoder.init(GOOGLE_MAPS_API_KEY);

export default function PersonalDetails1({ navigation, route, setIsSignupFlow }) {
  const { formData = {}, userData, token } = route.params || {};
  const [occupation, setOccupation] = useState(formData.occupation || '');
  const [skillOwned, setSkillOwned] = useState(formData.skill_owned || '');
  const [experience, setExperience] = useState(formData.experience?.toString() || '0');
  const [location, setLocation] = useState(formData.location || '');
  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState(null);

  const occupationChoices = [
    'Accountant', 'Actor', 'Actuary', 'Administrative Assistant', 'Architect', 'Artist',
    'Biologist', 'Business Analyst', 'Carpenter', 'Chef', 'Civil Engineer', 'Consultant',
    'Dentist', 'Designer', 'Web Developer', 'Economist', 'Electrician', 'Engineer',
    'Financial Analyst', 'Firefighter', 'Graphic Designer', 'Human Resources Manager',
    'Journalist', 'Lawyer', 'Librarian', 'Manager', 'Mechanic', 'Nurse', 'Nutritionist',
    'Optometrist', 'Pharmacist', 'Photographer', 'Physician', 'Physicist', 'Pilot',
    'Plumber', 'Police Officer', 'Professor', 'Programmer', 'Psychologist', 'Receptionist',
    'Salesperson', 'Scientist', 'Secretary', 'Software Engineer', 'Teacher', 'Technician',
    'Therapist', 'Translator', 'Writer'
  ];

  const validate = () => {
    const newErrors = {};
    if (!occupation) newErrors.occupation = 'Please select an occupation';
    if (!skillOwned) newErrors.skillOwned = 'Please enter a skill you own';
    if (!experience || parseFloat(experience) < 0) newErrors.experience = 'Please enter a valid experience (0 or more)';
    if (!location) newErrors.location = 'Please enter your location';
    if (!formData.date_of_birth) newErrors.date_of_birth = 'Date of Birth is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      const updatedFormData = {
        ...formData,
        occupation,
        skill_owned: skillOwned, // Use the actual value from the input
        experience: parseFloat(experience) || 0,
        location,
      };
      navigation.navigate('PersonalDetails2', {
        userData,
        token,
        formData: updatedFormData,
        setIsSignupFlow,
      });
    }
  };

  const handleIncrement = () => {
    const newValue = parseFloat(experience) + 1;
    setExperience(newValue.toString());
  };

  const handleDecrement = () => {
    const currentValue = parseFloat(experience);
    const newValue = currentValue > 0 ? currentValue - 1 : 0;
    setExperience(newValue.toString());
  };

  const handleOccupationSelect = (item) => {
    setOccupation(item);
    setModalVisible(false);
  };

  const handleMapPress = async (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedCoords(coordinate);

    try {
      const response = await Geocoder.from(coordinate.latitude, coordinate.longitude);
      const address = response.results[0].formatted_address;
      setLocation(address);
      setMapModalVisible(false);
    } catch (error) {
      console.error('Geocoding error:', error);
      setLocation('Unable to fetch address');
      setMapModalVisible(false);
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
          <Text style={styles.title}>Personal Details</Text>
          <Text style={styles.subtitle}>
            Provide your personal details to enhance your Skill Swap experience and connect with like-minded individuals
          </Text>

          <View style={styles.formField}>
            <Text style={styles.label}>
              Occupation<Text style={styles.required}>*</Text>
            </Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.inputText}>
                {occupation || '                         ----  Select  ----'}
              </Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <FlatList
                    data={occupationChoices}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <Pressable
                        style={styles.modalItem}
                        onPress={() => handleOccupationSelect(item)}
                      >
                        <Text style={styles.modalItemText}>{item}</Text>
                      </Pressable>
                    )}
                    showsVerticalScrollIndicator={true}
                    style={styles.flatList}
                  />
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            {errors.occupation && <Text style={styles.error}>{errors.occupation}</Text>}
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>
              Skill Owned<Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Web developer, Fitness Coach, etc"
              placeholderTextColor="#666"
              value={skillOwned}
              onChangeText={setSkillOwned}
            />
            {errors.skillOwned && <Text style={styles.error}>{errors.skillOwned}</Text>}
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>
              Experience<Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputWrapper}>
              <TouchableOpacity style={styles.counterButtonLeft} onPress={handleDecrement}>
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={[styles.input, styles.experienceInput]}
                placeholder="0"
                placeholderTextColor="#000000"
                value={experience}
                onChangeText={(text) => setExperience(text)}
                keyboardType="numeric"
                textAlign="center"
              />
              <TouchableOpacity style={styles.counterButtonRight} onPress={handleIncrement}>
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            {errors.experience && <Text style={styles.error}>{errors.experience}</Text>}
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>
              Location<Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, styles.locationInput]}
                placeholder="Enter your location"
                placeholderTextColor="#666"
                value={location}
                onChangeText={setLocation}
                editable={false}
              />
              <TouchableOpacity
                style={styles.locationButton}
                onPress={() => setMapModalVisible(true)}
              >
                <Text style={styles.locationIcon}>📍</Text>
              </TouchableOpacity>
            </View>
            {errors.location && <Text style={styles.error}>{errors.location}</Text>}
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={mapModalVisible}
            onRequestClose={() => setMapModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.mapModalContent}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: 49.8397,
                    longitude: 24.0297,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  onPress={handleMapPress}
                >
                  {selectedCoords && (
                    <Marker coordinate={selectedCoords} />
                  )}
                </MapView>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setMapModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {errors.date_of_birth && <Text style={styles.error}>{errors.date_of_birth}</Text>}

          <View style={styles.navigation}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Next</Text>
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
    color: '#000000',
    fontFamily: 'Raleway-Regular',
    lineHeight: 19,
    marginBottom: 30,
    textAlign: 'left',
    alignSelf: 'center',
    width: '100%',
    marginBottom: 50,
  },
  formField: {
    marginBottom: 40,
    width: '100%',
    fontFamily: 'Raleway-Bold',
  },
  label: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Raleway-Bold',
    marginBottom: 7,
    textAlign: 'left',
    alignSelf: 'center',
    width: '100%',
  },
  required: {
    color: 'red',
    fontSize: 14,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    borderWidth: 2,
    borderColor: '#000',
    borderStyle: 'solid',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#FBEAA0',
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
    color: '#000',
    height: 50,
  },
  inputText: {
    fontSize: 15,
    fontFamily: 'Raleway-bold',
    color: '#000000',
  },
  experienceInput: {
    paddingHorizontal: 40,
  },
  locationInput: {
    paddingRight: 40,
  },
  counterButtonLeft: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -15 }],
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  counterButtonRight: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -15 }],
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  counterButtonText: {
    fontSize: 20,
    color: '#000',
  },
  locationButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -15 }],
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 20,
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapModalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: '90%',
    height: '70%',
    padding: 20,
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '85%',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#3B3227',
    borderRadius: 50,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
  },
  modalContent: {
    backgroundColor: '#FBEAA0',
    borderRadius: 8,
    width: '80%',
    maxHeight: '70%',
    padding: 20,
  },
  mapModalContent: {
    backgroundColor: '#FBEAA0',
    borderRadius: 8,
    width: '90%',
    height: '70%',
    padding: 10,
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '90%',
    marginBottom: 10,
  },
  flatList: {
    scrollbarThumbVertical: '#000000',
  },
  modalItem: {
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  modalItemText: {
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
    color: '#000',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Raleway-Regular',
    textAlign: 'left',
    alignSelf: 'center',
    width: '100%',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
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
});
