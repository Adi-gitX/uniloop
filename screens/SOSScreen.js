import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Linking,
  Dimensions
} from 'react-native';
import useSafetyStore from '../stores/useSafetyStore';

const { width } = Dimensions.get('window');

const SOSScreen = () => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [showContactsModal, setShowContactsModal] = useState(false);
  const [showResourcesModal, setShowResourcesModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [reportData, setReportData] = useState({
    category: '',
    location: '',
    description: '',
    isAnonymous: false,
  });

  const {
    safetyCategories,
    emergencyContacts,
    safetyResources,
    userReports,
    submitSafetyReport,
    triggerEmergencyAlert,
    getContactsForCategory
  } = useSafetyStore();

  const handleEmergencyAlert = (category) => {
    Alert.alert(
      '🚨 EMERGENCY ALERT',
      'This will immediately notify campus security and emergency services. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'YES, ALERT NOW',
          style: 'destructive',
          onPress: () => {
            const result = triggerEmergencyAlert(category, 'Current Location');
            Alert.alert(
              'Alert Sent!',
              'Emergency services have been notified. Help is on the way.',
              [{ text: 'OK' }]
            );
          }
        }
      ]
    );
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setReportData(prev => ({ ...prev, category: category.key }));

    if (category.priority === 'high') {
      Alert.alert(
        'High Priority Report',
        'This is a high priority safety concern. Would you like to trigger an emergency alert?',
        [
          { text: 'Regular Report', onPress: () => setShowReportModal(true) },
          {
            text: 'Emergency Alert',
            style: 'destructive',
            onPress: () => handleEmergencyAlert(category.key)
          }
        ]
      );
    } else {
      setShowReportModal(true);
    }
  };

  const handleSubmitReport = () => {
    if (!reportData.category || !reportData.description.trim()) {
      Alert.alert('Missing Information', 'Please select a category and provide a description.');
      return;
    }

    const result = submitSafetyReport({
      ...reportData,
      reporterName: reportData.isAnonymous ? 'Anonymous' : 'Current User',
    });

    setShowReportModal(false);
    setReportData({
      category: '',
      location: '',
      description: '',
      isAnonymous: false,
    });
    setSelectedCategory(null);

    Alert.alert(
      'Report Submitted',
      'Your safety report has been submitted successfully. Campus authorities will review it promptly.',
      [{ text: 'OK' }]
    );
  };

  const handleCallContact = (contact) => {
    Alert.alert(
      'Call Emergency Contact',
      `Call ${contact.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => {
            Linking.openURL(`tel:${contact.number}`);
          }
        }
      ]
    );
  };

  const handleOpenResource = (resource) => {
    Alert.alert(
      'Open Resource',
      `Open ${resource.title}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Open',
          onPress: () => {
            // In a real app, this would open the URL
            Alert.alert('Resource', `This would open: ${resource.url}`);
          }
        }
      ]
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const renderCategoryGrid = () => (
    <View style={styles.categoriesGrid}>
      {safetyCategories.map((category) => (
        <TouchableOpacity
          key={category.key}
          style={[
            styles.categoryCard,
            { borderColor: getPriorityColor(category.priority) }
          ]}
          onPress={() => handleCategorySelect(category)}
        >
          <Text style={styles.categoryEmoji}>{category.emoji}</Text>
          <Text style={styles.categoryLabel}>{category.label}</Text>
          <View style={[
            styles.priorityBadge,
            { backgroundColor: getPriorityColor(category.priority) }
          ]}>
            <Text style={styles.priorityText}>{category.priority}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderEmergencyContacts = () => (
    <ScrollView style={styles.contactsList}>
      {emergencyContacts.map((contact, index) => (
        <TouchableOpacity
          key={index}
          style={styles.contactCard}
          onPress={() => handleCallContact(contact)}
        >
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactNumber}>{contact.number}</Text>
            <Text style={styles.contactType}>{contact.type}</Text>
          </View>
          <View style={styles.callButton}>
            <Text style={styles.callButtonText}>📞</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderSafetyResources = () => (
    <ScrollView style={styles.resourcesList}>
      {safetyResources.map((resource, index) => (
        <TouchableOpacity
          key={index}
          style={styles.resourceCard}
          onPress={() => handleOpenResource(resource)}
        >
          <Text style={styles.resourceTitle}>{resource.title}</Text>
          <Text style={styles.resourceDescription}>{resource.description}</Text>
          <Text style={styles.resourceType}>{resource.type}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🚨 Safety & SOS</Text>
        <Text style={styles.subtitle}>Your safety is our priority</Text>
      </View>

      {/* Emergency Alert Section */}
      <View style={styles.emergencySection}>
        <Text style={styles.sectionTitle}>Emergency Alert</Text>
        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={() => handleEmergencyAlert('emergency')}
        >
          <Text style={styles.emergencyButtonText}>🚨 EMERGENCY SOS</Text>
          <Text style={styles.emergencyButtonSubtext}>Tap for immediate help</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => setShowContactsModal(true)}
          >
            <Text style={styles.quickActionEmoji}>📞</Text>
            <Text style={styles.quickActionText}>Emergency Contacts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => setShowResourcesModal(true)}
          >
            <Text style={styles.quickActionEmoji}>📚</Text>
            <Text style={styles.quickActionText}>Safety Resources</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Report Categories */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Report Safety Concern</Text>
        <Text style={styles.sectionSubtitle}>Select the type of concern you'd like to report:</Text>
        {renderCategoryGrid()}
      </View>

      {/* Recent Reports */}
      {userReports.length > 0 && (
        <View style={styles.reportsSection}>
          <Text style={styles.sectionTitle}>Your Recent Reports</Text>
          {userReports.slice(0, 3).map((report) => (
            <View key={report.id} style={styles.reportCard}>
              <View style={styles.reportHeader}>
                <Text style={styles.reportCategory}>
                  {safetyCategories.find(c => c.key === report.category)?.emoji} {report.category}
                </Text>
                <Text style={styles.reportStatus}>{report.status}</Text>
              </View>
              <Text style={styles.reportDescription}>{report.description}</Text>
              <Text style={styles.reportTime}>
                {report.timestamp.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Report Modal */}
      <Modal
        visible={showReportModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowReportModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedCategory?.emoji} Report {selectedCategory?.label}
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Location (Optional)</Text>
              <TextInput
                style={styles.textInput}
                value={reportData.location}
                onChangeText={(text) => setReportData(prev => ({ ...prev, location: text }))}
                placeholder="e.g., Library, Hostel A, Room 205"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description *</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={reportData.description}
                onChangeText={(text) => setReportData(prev => ({ ...prev, description: text }))}
                placeholder="Please describe the situation in detail..."
                placeholderTextColor="#666"
                multiline
                numberOfLines={4}
              />
            </View>

            <TouchableOpacity
              style={styles.anonymousToggle}
              onPress={() => setReportData(prev => ({ ...prev, isAnonymous: !prev.isAnonymous }))}
            >
              <Text style={styles.anonymousToggleText}>
                {reportData.isAnonymous ? '🔒' : '👤'} Report as {reportData.isAnonymous ? 'Anonymous' : 'Yourself'}
              </Text>
            </TouchableOpacity>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowReportModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleSubmitReport}
              >
                <Text style={styles.modalButtonText}>Submit Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Contacts Modal */}
      <Modal
        visible={showContactsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowContactsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Emergency Contacts</Text>
            {renderEmergencyContacts()}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowContactsModal(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Resources Modal */}
      <Modal
        visible={showResourcesModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowResourcesModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Safety Resources</Text>
            {renderSafetyResources()}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowResourcesModal(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
  emergencySection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  emergencyButton: {
    backgroundColor: '#dc2626',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ef4444',
  },
  emergencyButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  emergencyButtonSubtext: {
    fontSize: 14,
    color: '#fca5a5',
  },
  quickActionsSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickActionButton: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '45%',
    borderWidth: 1,
    borderColor: '#222',
  },
  quickActionEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickActionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  categoriesSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
  },
  categoryEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  reportsSection: {
    padding: 20,
  },
  reportCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#222',
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reportCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  reportStatus: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '500',
  },
  reportDescription: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 8,
  },
  reportTime: {
    fontSize: 12,
    color: '#888',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    width: '90%',
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#222',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  anonymousToggle: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  anonymousToggleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#3b82f6',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  contactsList: {
    maxHeight: 400,
    marginBottom: 20,
  },
  contactCard: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 14,
    color: '#3b82f6',
    marginBottom: 2,
  },
  contactType: {
    fontSize: 12,
    color: '#888',
  },
  callButton: {
    backgroundColor: '#10b981',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButtonText: {
    fontSize: 20,
  },
  resourcesList: {
    maxHeight: 400,
    marginBottom: 20,
  },
  resourceCard: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 8,
  },
  resourceType: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '500',
  },
});

export default SOSScreen;
