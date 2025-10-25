import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import useVerificationStore from '../stores/useVerificationStore';

const ProfileScreen = () => {
  const { userData } = useVerificationStore();

  const userProfile = {
    name: userData.fullName,
    enrollment: userData.enrollmentNumber,
    year: userData.year,
    course: userData.course,
    hostel: userData.hostel,
    interests: ['Programming', 'Photography', 'Music'],
    verified: true,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImage}>
          <Text style={styles.profileInitial}>P</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{userProfile.name}</Text>
          <Text style={styles.enrollment}>{userProfile.enrollment}</Text>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✓ Verified</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Academic Info</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Year:</Text>
          <Text style={styles.infoValue}>{userProfile.year}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Course:</Text>
          <Text style={styles.infoValue}>{userProfile.course}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Hostel:</Text>
          <Text style={styles.infoValue}>{userProfile.hostel}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interests</Text>
        <View style={styles.interestsContainer}>
          {userProfile.interests.map((interest, index) => (
            <View key={index} style={styles.interestTag}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Privacy Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Help & Support</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.sosButton}
        onPress={() => {
          // Navigate to SOS screen
          Alert.alert('SOS', 'Emergency alert triggered! Campus security has been notified.');
        }}
      >
        <Text style={styles.sosText}>🚨 SOS</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInitial: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  enrollment: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  verifiedBadge: {
    backgroundColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  verifiedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#888',
  },
  infoValue: {
    fontSize: 14,
    color: '#fff',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    color: '#fff',
    fontSize: 12,
  },
  actionButton: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#222',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
  },
  sosButton: {
    backgroundColor: '#dc2626',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  sosText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
