import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import useVerificationStore from '../stores/useVerificationStore';

const VerificationStatusScreen = () => {
  const { verificationStatus, verificationMessage, userData, resetVerification } = useVerificationStore();

  const handleReset = () => {
    Alert.alert(
      'Reset Verification',
      'Are you sure you want to start the verification process again?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetVerification();
            Alert.alert('Reset Complete', 'You can now start the verification process again.');
          }
        }
      ]
    );
  };

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'pending': return '⏳';
      case 'approved': return '✅';
      case 'rejected': return '❌';
      default: return '📋';
    }
  };

  const getStatusColor = () => {
    switch (verificationStatus) {
      case 'pending': return '#f59e0b';
      case 'approved': return '#10b981';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusTitle = () => {
    switch (verificationStatus) {
      case 'pending': return 'Verification Pending';
      case 'approved': return 'Verification Approved';
      case 'rejected': return 'Verification Rejected';
      default: return 'Verification Status';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Verification Status</Text>
        <Text style={styles.subtitle}>Faculty-backed verification</Text>
      </View>

      <View style={styles.statusCard}>
        <View style={styles.statusIcon}>
          <Text style={styles.iconText}>{getStatusIcon()}</Text>
        </View>

        <Text style={[styles.statusTitle, { color: getStatusColor() }]}>
          {getStatusTitle()}
        </Text>

        <Text style={styles.statusMessage}>
          {verificationMessage || 'Your verification request is being processed.'}
        </Text>

        {verificationStatus === 'pending' && (
          <View style={styles.pendingInfo}>
            <Text style={styles.pendingTitle}>What happens next?</Text>
            <Text style={styles.pendingText}>
              • Faculty will review your submitted documents{'\n'}
              • Verification typically takes 24-48 hours{'\n'}
              • You'll receive a notification when approved{'\n'}
              • Once verified, you'll have full access to Uniloop
            </Text>
          </View>
        )}

        {verificationStatus === 'approved' && (
          <View style={styles.approvedInfo}>
            <Text style={styles.approvedTitle}>🎉 Welcome to Uniloop!</Text>
            <Text style={styles.approvedText}>
              Your account has been verified successfully. You now have access to all campus features including:
            </Text>
            <Text style={styles.featuresText}>
              • Campus Genie AI Assistant{'\n'}
              • Community Feed & Groups{'\n'}
              • Mess Menu & Events{'\n'}
              • Safety Reporting{'\n'}
              • Study Partner Matching
            </Text>
          </View>
        )}

        {verificationStatus === 'rejected' && (
          <View style={styles.rejectedInfo}>
            <Text style={styles.rejectedTitle}>Verification Issues</Text>
            <Text style={styles.rejectedText}>
              Your verification was rejected. Please check the reason above and resubmit with correct information.
            </Text>
          </View>
        )}
      </View>

      <View style={styles.userInfoCard}>
        <Text style={styles.userInfoTitle}>Your Information</Text>
        <View style={styles.userInfoRow}>
          <Text style={styles.userInfoLabel}>Name:</Text>
          <Text style={styles.userInfoValue}>{userData.fullName || 'Not provided'}</Text>
        </View>
        <View style={styles.userInfoRow}>
          <Text style={styles.userInfoLabel}>Enrollment:</Text>
          <Text style={styles.userInfoValue}>{userData.enrollmentNumber || 'Not provided'}</Text>
        </View>
        <View style={styles.userInfoRow}>
          <Text style={styles.userInfoLabel}>Course:</Text>
          <Text style={styles.userInfoValue}>{userData.course || 'Not provided'}</Text>
        </View>
        <View style={styles.userInfoRow}>
          <Text style={styles.userInfoLabel}>Year:</Text>
          <Text style={styles.userInfoValue}>{userData.year || 'Not provided'}</Text>
        </View>
        <View style={styles.userInfoRow}>
          <Text style={styles.userInfoLabel}>Email:</Text>
          <Text style={styles.userInfoValue}>{userData.email || 'Not provided'}</Text>
        </View>
      </View>

      {(verificationStatus === 'rejected' || verificationStatus === 'not_started') && (
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>
            {verificationStatus === 'rejected' ? 'Resubmit Verification' : 'Start Verification'}
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.helpCard}>
        <Text style={styles.helpTitle}>Need Help?</Text>
        <Text style={styles.helpText}>
          If you're having trouble with verification, contact your faculty advisor or the IT department.
        </Text>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
  statusCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#222',
    alignItems: 'center',
  },
  statusIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 30,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  statusMessage: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  pendingInfo: {
    backgroundColor: '#1f2937',
    borderRadius: 8,
    padding: 16,
    width: '100%',
  },
  pendingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f59e0b',
    marginBottom: 8,
  },
  pendingText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  approvedInfo: {
    backgroundColor: '#064e3b',
    borderRadius: 8,
    padding: 16,
    width: '100%',
  },
  approvedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 8,
  },
  approvedText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 8,
  },
  featuresText: {
    fontSize: 14,
    color: '#a7f3d0',
    lineHeight: 20,
  },
  rejectedInfo: {
    backgroundColor: '#7f1d1d',
    borderRadius: 8,
    padding: 16,
    width: '100%',
  },
  rejectedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
    marginBottom: 8,
  },
  rejectedText: {
    fontSize: 14,
    color: '#fca5a5',
    lineHeight: 20,
  },
  userInfoCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#222',
  },
  userInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  userInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  userInfoLabel: {
    fontSize: 14,
    color: '#888',
  },
  userInfoValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  resetButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  helpCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 12,
  },
  helpButton: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  helpButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default VerificationStatusScreen;
