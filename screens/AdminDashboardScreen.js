import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  FlatList
} from 'react-native';
import useAdminStore from '../stores/useAdminStore';

const AdminDashboardScreen = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVerification, setSelectedVerification] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const {
    pendingVerifications,
    approvedVerifications,
    rejectedVerifications,
    reportedPosts,
    resolvedReports,
    safetyReports,
    analytics,
    approveVerification,
    rejectVerification,
    resolveReport,
    updateSafetyReport
  } = useAdminStore();

  const tabs = [
    { key: 'overview', label: 'Overview', emoji: '📊' },
    { key: 'verifications', label: 'Verifications', emoji: '✅' },
    { key: 'moderation', label: 'Moderation', emoji: '🛡️' },
    { key: 'safety', label: 'Safety', emoji: '🚨' },
  ];

  const handleApproveVerification = (verificationId) => {
    Alert.alert(
      'Approve Verification',
      'Are you sure you want to approve this verification?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Approve',
          onPress: () => {
            approveVerification(verificationId);
            setShowVerificationModal(false);
            Alert.alert('Success', 'Verification approved successfully!');
          }
        }
      ]
    );
  };

  const handleRejectVerification = (verificationId) => {
    Alert.prompt(
      'Reject Verification',
      'Please provide a reason for rejection:',
      (reason) => {
        if (reason && reason.trim()) {
          rejectVerification(verificationId, reason.trim());
          setShowVerificationModal(false);
          Alert.alert('Success', 'Verification rejected successfully!');
        }
      }
    );
  };

  const handleResolveReport = (reportId) => {
    Alert.alert(
      'Resolve Report',
      'What action would you like to take?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove Post', onPress: () => resolveReport(reportId, 'Post removed') },
        { text: 'Warn User', onPress: () => resolveReport(reportId, 'User warned') },
        { text: 'No Action', onPress: () => resolveReport(reportId, 'No action needed') },
      ]
    );
  };

  const handleUpdateSafetyReport = (reportId, status) => {
    updateSafetyReport(reportId, { status });
    Alert.alert('Success', `Safety report status updated to ${status}`);
  };

  const renderOverview = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.analyticsGrid}>
        <View style={styles.analyticsCard}>
          <Text style={styles.analyticsNumber}>{analytics.totalUsers}</Text>
          <Text style={styles.analyticsLabel}>Total Users</Text>
        </View>
        <View style={styles.analyticsCard}>
          <Text style={styles.analyticsNumber}>{analytics.verifiedUsers}</Text>
          <Text style={styles.analyticsLabel}>Verified Users</Text>
        </View>
        <View style={styles.analyticsCard}>
          <Text style={styles.analyticsNumber}>{analytics.pendingVerifications}</Text>
          <Text style={styles.analyticsLabel}>Pending Verifications</Text>
        </View>
        <View style={styles.analyticsCard}>
          <Text style={styles.analyticsNumber}>{analytics.reportedPosts}</Text>
          <Text style={styles.analyticsLabel}>Reported Posts</Text>
        </View>
        <View style={styles.analyticsCard}>
          <Text style={styles.analyticsNumber}>{analytics.safetyReports}</Text>
          <Text style={styles.analyticsLabel}>Safety Reports</Text>
        </View>
        <View style={styles.analyticsCard}>
          <Text style={styles.analyticsNumber}>{analytics.activeReports}</Text>
          <Text style={styles.analyticsLabel}>Active Reports</Text>
        </View>
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => setActiveTab('verifications')}
          >
            <Text style={styles.quickActionEmoji}>✅</Text>
            <Text style={styles.quickActionText}>Review Verifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => setActiveTab('moderation')}
          >
            <Text style={styles.quickActionEmoji}>🛡️</Text>
            <Text style={styles.quickActionText}>Content Moderation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => setActiveTab('safety')}
          >
            <Text style={styles.quickActionEmoji}>🚨</Text>
            <Text style={styles.quickActionText}>Safety Reports</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  const renderVerifications = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Pending Verifications ({pendingVerifications.length})</Text>
      </View>

      {pendingVerifications.map((verification) => (
        <TouchableOpacity
          key={verification.id}
          style={styles.verificationCard}
          onPress={() => {
            setSelectedVerification(verification);
            setShowVerificationModal(true);
          }}
        >
          <View style={styles.verificationHeader}>
            <Text style={styles.verificationName}>{verification.fullName}</Text>
            <Text style={styles.verificationTime}>
              {verification.submittedAt.toLocaleDateString()}
            </Text>
          </View>
          <Text style={styles.verificationDetails}>
            {verification.course} • {verification.year} • {verification.enrollmentNumber}
          </Text>
          <Text style={styles.verificationEmail}>{verification.email}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recently Approved ({approvedVerifications.length})</Text>
      </View>

      {approvedVerifications.slice(0, 3).map((verification) => (
        <View key={verification.id} style={styles.verificationCard}>
          <View style={styles.verificationHeader}>
            <Text style={styles.verificationName}>{verification.fullName}</Text>
            <Text style={styles.approvedBadge}>✅ Approved</Text>
          </View>
          <Text style={styles.verificationDetails}>
            {verification.course} • {verification.year}
          </Text>
          <Text style={styles.verificationEmail}>
            Approved by {verification.approvedBy} on {verification.approvedAt.toLocaleDateString()}
          </Text>
        </View>
      ))}
    </ScrollView>
  );

  const renderModeration = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Reported Posts ({reportedPosts.length})</Text>
      </View>

      {reportedPosts.map((report) => (
        <TouchableOpacity
          key={report.id}
          style={styles.reportCard}
          onPress={() => {
            setSelectedReport(report);
            setShowReportModal(true);
          }}
        >
          <View style={styles.reportHeader}>
            <Text style={styles.reportReason}>{report.reportReason}</Text>
            <Text style={styles.reportTime}>
              {report.reportedAt.toLocaleDateString()}
            </Text>
          </View>
          <Text style={styles.reportContent}>{report.postContent}</Text>
          <View style={styles.reportFooter}>
            <Text style={styles.reportSeverity}>
              Severity: {report.severity}
            </Text>
            <Text style={styles.reportStatus}>Status: {report.status}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderSafety = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Safety Reports ({safetyReports.length})</Text>
      </View>

      {safetyReports.map((report) => (
        <View key={report.id} style={styles.safetyCard}>
          <View style={styles.safetyHeader}>
            <Text style={styles.safetyCategory}>{report.category}</Text>
            <Text style={[
              styles.safetyPriority,
              report.priority === 'high' && styles.highPriority,
              report.priority === 'medium' && styles.mediumPriority,
              report.priority === 'low' && styles.lowPriority,
            ]}>
              {report.priority.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.safetyDescription}>{report.description}</Text>
          <Text style={styles.safetyLocation}>📍 {report.location}</Text>
          <Text style={styles.safetyReporter}>Reported by: {report.reporterName}</Text>
          <Text style={styles.safetyTime}>
            {report.timestamp.toLocaleString()}
          </Text>
          <View style={styles.safetyActions}>
            <TouchableOpacity
              style={styles.safetyActionButton}
              onPress={() => handleUpdateSafetyReport(report.id, 'investigating')}
            >
              <Text style={styles.safetyActionText}>Investigating</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.safetyActionButton}
              onPress={() => handleUpdateSafetyReport(report.id, 'resolved')}
            >
              <Text style={styles.safetyActionText}>Resolve</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subtitle}>Faculty Management Panel</Text>
      </View>

      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText
            ]}>
              {tab.emoji} {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'verifications' && renderVerifications()}
      {activeTab === 'moderation' && renderModeration()}
      {activeTab === 'safety' && renderSafety()}

      {/* Verification Modal */}
      <Modal
        visible={showVerificationModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowVerificationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedVerification && (
              <>
                <Text style={styles.modalTitle}>Verification Details</Text>
                <View style={styles.verificationDetails}>
                  <Text style={styles.detailLabel}>Name:</Text>
                  <Text style={styles.detailValue}>{selectedVerification.fullName}</Text>

                  <Text style={styles.detailLabel}>Email:</Text>
                  <Text style={styles.detailValue}>{selectedVerification.email}</Text>

                  <Text style={styles.detailLabel}>Enrollment:</Text>
                  <Text style={styles.detailValue}>{selectedVerification.enrollmentNumber}</Text>

                  <Text style={styles.detailLabel}>Course:</Text>
                  <Text style={styles.detailValue}>{selectedVerification.course}</Text>

                  <Text style={styles.detailLabel}>Year:</Text>
                  <Text style={styles.detailValue}>{selectedVerification.year}</Text>

                  <Text style={styles.detailLabel}>Hostel:</Text>
                  <Text style={styles.detailValue}>{selectedVerification.hostel}</Text>
                </View>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setShowVerificationModal(false)}
                  >
                    <Text style={styles.modalButtonText}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.rejectButton]}
                    onPress={() => handleRejectVerification(selectedVerification.id)}
                  >
                    <Text style={styles.modalButtonText}>Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.approveButton]}
                    onPress={() => handleApproveVerification(selectedVerification.id)}
                  >
                    <Text style={styles.modalButtonText}>Approve</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Report Modal */}
      <Modal
        visible={showReportModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowReportModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedReport && (
              <>
                <Text style={styles.modalTitle}>Report Details</Text>
                <View style={styles.reportDetails}>
                  <Text style={styles.detailLabel}>Reason:</Text>
                  <Text style={styles.detailValue}>{selectedReport.reportReason}</Text>

                  <Text style={styles.detailLabel}>Post Content:</Text>
                  <Text style={styles.detailValue}>{selectedReport.postContent}</Text>

                  <Text style={styles.detailLabel}>Severity:</Text>
                  <Text style={styles.detailValue}>{selectedReport.severity}</Text>

                  <Text style={styles.detailLabel}>Reported At:</Text>
                  <Text style={styles.detailValue}>
                    {selectedReport.reportedAt.toLocaleString()}
                  </Text>
                </View>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setShowReportModal(false)}
                  >
                    <Text style={styles.modalButtonText}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.resolveButton]}
                    onPress={() => handleResolveReport(selectedReport.id)}
                  >
                    <Text style={styles.modalButtonText}>Resolve</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#222',
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
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
  },
  tabText: {
    color: '#888',
    fontSize: 12,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#3b82f6',
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  analyticsCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222',
  },
  analyticsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 4,
  },
  analyticsLabel: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  quickActionsCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickActionButton: {
    alignItems: 'center',
    padding: 12,
  },
  quickActionEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  verificationCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#222',
  },
  verificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  verificationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  verificationTime: {
    fontSize: 12,
    color: '#888',
  },
  verificationDetails: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 4,
  },
  verificationEmail: {
    fontSize: 12,
    color: '#888',
  },
  approvedBadge: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
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
  reportReason: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ef4444',
  },
  reportTime: {
    fontSize: 12,
    color: '#888',
  },
  reportContent: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 8,
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reportSeverity: {
    fontSize: 12,
    color: '#f59e0b',
  },
  reportStatus: {
    fontSize: 12,
    color: '#888',
  },
  safetyCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#222',
  },
  safetyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  safetyCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  safetyPriority: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  highPriority: {
    backgroundColor: '#dc2626',
    color: '#fff',
  },
  mediumPriority: {
    backgroundColor: '#f59e0b',
    color: '#fff',
  },
  lowPriority: {
    backgroundColor: '#10b981',
    color: '#fff',
  },
  safetyDescription: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 8,
  },
  safetyLocation: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  safetyReporter: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  safetyTime: {
    fontSize: 12,
    color: '#888',
    marginBottom: 12,
  },
  safetyActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  safetyActionButton: {
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  safetyActionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
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
  verificationDetails: {
    marginBottom: 20,
  },
  reportDetails: {
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
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
  approveButton: {
    backgroundColor: '#10b981',
  },
  rejectButton: {
    backgroundColor: '#ef4444',
  },
  resolveButton: {
    backgroundColor: '#3b82f6',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AdminDashboardScreen;
