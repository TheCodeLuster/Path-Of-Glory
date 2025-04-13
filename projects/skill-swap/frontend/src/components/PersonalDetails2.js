// src/components/PersonalDetails2.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function PersonalDetails2({ navigation, route }) {
  const { formData = {}, userData, token } = route.params || {};
  const [workLink, setWorkLink] = useState(formData.work_link || '');
  const [description, setDescription] = useState(formData.description || '');
  const [achievements, setAchievements] = useState(formData.achievements || '');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!workLink) newErrors.workLink = 'Work Link is required';
    if (!description) newErrors.description = 'Description is required';
    if (!achievements) newErrors.achievements = 'Achievements are required';
    const wordCount = description.split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount > 100) newErrors.description = 'Description must be 100 words or less';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      const updatedFormData = { ...formData, work_link: workLink, description, achievements };
      navigation.navigate('PersonalDetails3', {
        userData,
        token,
        formData: updatedFormData,
      });
    }
  };

  const wordCount = description.split(/\s+/).filter(word => word.length > 0).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Details</Text>
      <Text style={styles.subtitle}>
        Provide your personal details to enhance your Skill Swap experience and connect with like-minded individuals
      </Text>

      {/* Work Link */}
      <View style={styles.formField}>
        <Text style={styles.label}>Work Link*</Text>
        <TextInput
          style={styles.input}
          placeholder="E.g. LinkedIn Profile: [Enter your LinkedIn profile URL]"
          value={workLink}
          onChangeText={setWorkLink}
        />
        {errors.workLink && <Text style={styles.error}>{errors.workLink}</Text>}
      </View>

      {/* Description */}
      <View style={styles.formField}>
        <Text style={styles.label}>Description*</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Add something about yourself..."
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <Text style={styles.wordCount}>{wordCount}/100 words</Text>
        {errors.description && <Text style={styles.error}>{errors.description}</Text>}
      </View>

      {/* Achievements */}
      <View style={styles.formField}>
        <Text style={styles.label}>Achievements*</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Add your achievements..."
          value={achievements}
          onChangeText={setAchievements}
          multiline
        />
        {errors.achievements && <Text style={styles.error}>{errors.achievements}</Text>}
      </View>

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
  wordCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 5,
    fontFamily: 'Raleway-Regular',
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