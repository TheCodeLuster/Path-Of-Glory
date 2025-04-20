import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

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

          {/* Work Link */}
          <View style={styles.formField}>
            <Text style={styles.label}>
              Work Link<Text style={styles.required}>*</Text>
            </Text>
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
              <Text style={styles.label}>
              Description<Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
              placeholder="Add something about yourself..."
              placeholderTextColor="#666" // Explicitly set the color
              value={description}
              onChangeText={setDescription}
              multiline
            />
            <Text style={styles.wordCount}>{wordCount}/100 words</Text>
            {errors.description && <Text style={styles.error}>{errors.description}</Text>}
          </View>

          {/* Achievements */}
          <View style={styles.formField}>
            <Text style={styles.label}>
              Achievements<Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, { height: 110, textAlignVertical: 'top' }]}
              placeholder="Add your achievements..."
              placeholderTextColor="#666" // Explicitly set the color
              value={achievements}
              onChangeText={setAchievements}
              multiline
            />
            {errors.achievements && <Text style={styles.error}>{errors.achievements}</Text>}
          </View>

          {/* Navigation */}
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
  },
  label: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Raleway-Bold',
    marginBottom: 8,
    textAlign: 'left',
    alignSelf: 'center',
    width: '100%',
  },
  required: {
    color: 'red',
    fontSize: 14,
  },
  input: {
    borderWidth: 2,
    borderColor: '#000',
    borderStyle: 'solid',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#FBEAA0',
    fontSize: 14,
    fontFamily: 'Raleway-regular',
    color: '#000',
    height: 55,
  },
  wordCount: {
    fontSize: 12,
    color: '#000',
    textAlign: 'right',
    marginTop: 5,
    fontFamily: 'Raleway-Regular',
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
