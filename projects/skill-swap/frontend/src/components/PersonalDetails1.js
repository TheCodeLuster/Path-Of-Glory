// src/components/PersonalDetails1.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker } from 'react-native';

export default function PersonalDetails1({ navigation, route }) {
  const { formData = {}, userData, token } = route.params || {};
  const [occupation, setOccupation] = useState(formData.occupation || '');
  const [skillOwned, setSkillOwned] = useState(formData.skill_owned || '');
  const [experience, setExperience] = useState(formData.experience || 0);
  const [location, setLocation] = useState(formData.location || '');
  const [errors, setErrors] = useState({});

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
    if (!occupation) newErrors.occupation = 'Occupation is required';
    if (!skillOwned) newErrors.skillOwned = 'Skill Owned is required';
    if (experience === undefined || experience < 0) newErrors.experience = 'Experience is required';
    if (!location) newErrors.location = 'Location is required';
    if (!formData.date_of_birth) newErrors.date_of_birth = 'Date of Birth is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      const updatedFormData = { ...formData, occupation, skill_owned: skillOwned, experience, location };
      navigation.navigate('PersonalDetails2', {
        userData,
        token,
        formData: updatedFormData,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Details</Text>
      <Text style={styles.subtitle}>
        Provide your personal details to enhance your Skill Swap experience and connect with like-minded individuals
      </Text>

      {/* Occupation */}
      <View style={styles.formField}>
        <Text style={styles.label}>Occupation*</Text>
        <Picker
          selectedValue={occupation}
          onValueChange={(itemValue) => setOccupation(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Select" value="" />
          {occupationChoices.map((choice) => (
            <Picker.Item key={choice} label={choice} value={choice} />
          ))}
        </Picker>
        {errors.occupation && <Text style={styles.error}>{errors.occupation}</Text>}
      </View>

      {/* Skill Owned */}
      <View style={styles.formField}>
        <Text style={styles.label}>Skill Owned*</Text>
        <TextInput
          style={styles.input}
          placeholder="Web developer, Fitness Coach, etc"
          value={skillOwned}
          onChangeText={setSkillOwned}
        />
        {errors.skillOwned && <Text style={styles.error}>{errors.skillOwned}</Text>}
      </View>

      {/* Experience */}
      <View style={styles.formField}>
        <Text style={styles.label}>Experience*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter years of experience (e.g., 5.5)"
          value={experience.toString()}
          onChangeText={(text) => setExperience(parseFloat(text) || 0)}
          keyboardType="numeric"
        />
        {errors.experience && <Text style={styles.error}>{errors.experience}</Text>}
      </View>

      {/* Location */}
      <View style={styles.formField}>
        <Text style={styles.label}>Location*</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Enter your location"
            value={location}
            onChangeText={setLocation}
          />
          <Text style={styles.locationIcon}>⨀</Text>
        </View>
        {errors.location && <Text style={styles.error}>{errors.location}</Text>}
      </View>

      {/* Date of Birth Validation */}
      {errors.date_of_birth && <Text style={styles.error}>{errors.date_of_birth}</Text>}

      {/* Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>⟵</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
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
  formField: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
    fontFamily: 'Raleway-Regular',
  },
  input: {
    borderWidth: 2,
    borderColor: '#D9D9D9',
    borderStyle: 'dashed',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#FBEAA0',
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 20,
    marginLeft: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Raleway-Regular',
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
  nextButton: {
    backgroundColor: '#3B3227',
    padding: 16,
    borderRadius: 60,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 18,
    fontFamily: 'Raleway-Regular',
    letterSpacing: 1,
  },
});