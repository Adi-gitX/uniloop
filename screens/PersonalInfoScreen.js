import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import useVerificationStore from '../stores/useVerificationStore';

const PersonalInfoScreen = () => {
  const [formData, setFormData] = useState({
    enrollmentNumber: '',
    fullName: '',
    course: '',
    year: '',
    hostel: '',
    phoneNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { updateUserData, updateStep, userData } = useVerificationStore();

  const courses = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical', 'Chemical', 'Other'];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Masters', 'PhD'];
  const hostels = ['Boys Hostel A', 'Boys Hostel B', 'Girls Hostel A', 'Girls Hostel B', 'Day Scholar'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    // Validation
    if (!formData.enrollmentNumber.trim()) {
      Alert.alert('Missing Information', 'Please enter your enrollment number');
      return;
    }
    if (!formData.fullName.trim()) {
      Alert.alert('Missing Information', 'Please enter your full name');
      return;
    }
    if (!formData.course) {
      Alert.alert('Missing Information', 'Please select your course');
      return;
    }
    if (!formData.year) {
      Alert.alert('Missing Information', 'Please select your year');
      return;
    }

    setIsLoading(true);

    // Simulate data processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    updateUserData(formData);
    updateStep(2);
    setIsLoading(false);
  };

  const handleBack = () => {
    updateStep(0);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Personal Information</Text>
          <Text style={styles.subtitle}>Step 2 of 4</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Enrollment Number *</Text>
            <TextInput
              style={styles.textInput}
              value={formData.enrollmentNumber}
              onChangeText={(value) => handleInputChange('enrollmentNumber', value)}
              placeholder="CS2023001"
              placeholderTextColor="#666"
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name *</Text>
            <TextInput
              style={styles.textInput}
              value={formData.fullName}
              onChangeText={(value) => handleInputChange('fullName', value)}
              placeholder="Enter your full name"
              placeholderTextColor="#666"
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Course *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {courses.map((course) => (
                <TouchableOpacity
                  key={course}
                  style={[
                    styles.chip,
                    formData.course === course && styles.chipSelected
                  ]}
                  onPress={() => handleInputChange('course', course)}
                >
                  <Text style={[
                    styles.chipText,
                    formData.course === course && styles.chipTextSelected
                  ]}>
                    {course}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Year *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {years.map((year) => (
                <TouchableOpacity
                  key={year}
                  style={[
                    styles.chip,
                    formData.year === year && styles.chipSelected
                  ]}
                  onPress={() => handleInputChange('year', year)}
                >
                  <Text style={[
                    styles.chipText,
                    formData.year === year && styles.chipTextSelected
                  ]}>
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Hostel</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {hostels.map((hostel) => (
                <TouchableOpacity
                  key={hostel}
                  style={[
                    styles.chip,
                    formData.hostel === hostel && styles.chipSelected
                  ]}
                  onPress={() => handleInputChange('hostel', hostel)}
                >
                  <Text style={[
                    styles.chipText,
                    formData.hostel === hostel && styles.chipTextSelected
                  ]}>
                    {hostel}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              value={formData.phoneNumber}
              onChangeText={(value) => handleInputChange('phoneNumber', value)}
              placeholder="+91 9876543210"
              placeholderTextColor="#666"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleNext}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Processing...' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>🔒 Privacy & Security</Text>
            <Text style={styles.infoText}>
              Your personal information is encrypted and only accessible to verified faculty members for verification purposes.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
  content: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  chip: {
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  chipSelected: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  chipText: {
    color: '#ccc',
    fontSize: 14,
  },
  chipTextSelected: {
    color: '#fff',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: '#333',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flex: 0.45,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flex: 0.45,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#333',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
});

export default PersonalInfoScreen;
