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

const EmailVerificationScreen = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { updateUserData, updateStep } = useVerificationStore();

  const handleEmailSubmit = async () => {
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate email verification
    await new Promise(resolve => setTimeout(resolve, 1500));

    updateUserData({ email });
    updateStep(1);
    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Uniloop</Text>
          <Text style={styles.subtitle}>Your Campus, Connected</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.stepTitle}>Step 1: Email Verification</Text>
          <Text style={styles.stepDescription}>
            Enter your university email address to get started with verification.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>University Email</Text>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              placeholder="your.name@university.edu"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleEmailSubmit}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Sending...' : 'Send Verification Email'}
            </Text>
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>📧 What happens next?</Text>
            <Text style={styles.infoText}>
              • We'll send a verification link to your email{'\n'}
              • Click the link to confirm your email address{'\n'}
              • Then proceed to complete your profile
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
    marginBottom: 40,
    marginTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
  },
  content: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 30,
    lineHeight: 20,
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
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 30,
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

export default EmailVerificationScreen;
