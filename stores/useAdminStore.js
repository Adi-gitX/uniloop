import { create } from 'zustand';

const useAdminStore = create((set, get) => ({
  // Verification Management
  pendingVerifications: [
    {
      id: 'v1',
      email: 'priya.sharma@university.edu',
      enrollmentNumber: 'CS2023001',
      fullName: 'Priya Sharma',
      course: 'Computer Science',
      year: '3rd Year',
      hostel: 'Girls Hostel A',
      phoneNumber: '+91 9876543210',
      submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: 'pending',
      idImage: 'id_image_url',
      selfieImage: 'selfie_image_url',
    },
    {
      id: 'v2',
      email: 'raj.kumar@university.edu',
      enrollmentNumber: 'ME2023002',
      fullName: 'Raj Kumar',
      course: 'Mechanical',
      year: '2nd Year',
      hostel: 'Boys Hostel B',
      phoneNumber: '+91 9876543211',
      submittedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      status: 'pending',
      idImage: 'id_image_url',
      selfieImage: 'selfie_image_url',
    },
  ],

  approvedVerifications: [
    {
      id: 'v3',
      email: 'sneha.patel@university.edu',
      enrollmentNumber: 'CS2022001',
      fullName: 'Sneha Patel',
      course: 'Computer Science',
      year: '4th Year',
      hostel: 'Girls Hostel A',
      phoneNumber: '+91 9876543212',
      submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      approvedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      status: 'approved',
      approvedBy: 'Prof. Sharma',
    },
  ],

  rejectedVerifications: [
    {
      id: 'v4',
      email: 'amit.singh@university.edu',
      enrollmentNumber: 'CS2023003',
      fullName: 'Amit Singh',
      course: 'Computer Science',
      year: '3rd Year',
      hostel: 'Boys Hostel A',
      phoneNumber: '+91 9876543213',
      submittedAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      rejectedAt: new Date(Date.now() - 36 * 60 * 60 * 1000), // 36 hours ago
      status: 'rejected',
      rejectionReason: 'Invalid enrollment number',
      rejectedBy: 'Prof. Sharma',
    },
  ],

  // Content Moderation
  reportedPosts: [
    {
      id: 'r1',
      postId: 'post1',
      postContent: 'This is inappropriate content',
      reportedBy: 'user123',
      reportReason: 'Inappropriate',
      reportedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      status: 'pending',
      severity: 'medium',
    },
    {
      id: 'r2',
      postId: 'post2',
      postContent: 'Spam content here',
      reportedBy: 'user456',
      reportReason: 'Spam',
      reportedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      status: 'pending',
      severity: 'low',
    },
  ],

  resolvedReports: [
    {
      id: 'r3',
      postId: 'post3',
      postContent: 'Resolved inappropriate content',
      reportedBy: 'user789',
      reportReason: 'Harassment',
      reportedAt: new Date(Date.now() - 72 * 60 * 60 * 1000), // 3 days ago
      resolvedAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      status: 'resolved',
      action: 'Post removed',
      resolvedBy: 'Prof. Sharma',
    },
  ],

  // Safety Reports
  safetyReports: [
    {
      id: 's1',
      reporterId: 'user123',
      reporterName: 'Priya Sharma',
      category: 'Emergency',
      description: 'Medical emergency in hostel',
      location: 'Girls Hostel A, Room 205',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      status: 'active',
      priority: 'high',
      assignedTo: 'Security Team',
    },
    {
      id: 's2',
      reporterId: 'user456',
      reporterName: 'Anonymous',
      category: 'Harassment',
      description: 'Feeling unsafe in library area',
      location: 'Central Library',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: 'investigating',
      priority: 'medium',
      assignedTo: 'Counseling Services',
    },
  ],

  // Analytics
  analytics: {
    totalUsers: 1250,
    verifiedUsers: 1180,
    pendingVerifications: 2,
    totalPosts: 3450,
    reportedPosts: 2,
    safetyReports: 2,
    activeReports: 1,
  },

  // Actions
  approveVerification: (verificationId) => {
    const verification = get().pendingVerifications.find(v => v.id === verificationId);
    if (verification) {
      set((state) => ({
        pendingVerifications: state.pendingVerifications.filter(v => v.id !== verificationId),
        approvedVerifications: [...state.approvedVerifications, {
          ...verification,
          status: 'approved',
          approvedAt: new Date(),
          approvedBy: 'Current Admin',
        }],
        analytics: {
          ...state.analytics,
          verifiedUsers: state.analytics.verifiedUsers + 1,
          pendingVerifications: state.analytics.pendingVerifications - 1,
        }
      }));
    }
  },

  rejectVerification: (verificationId, reason) => {
    const verification = get().pendingVerifications.find(v => v.id === verificationId);
    if (verification) {
      set((state) => ({
        pendingVerifications: state.pendingVerifications.filter(v => v.id !== verificationId),
        rejectedVerifications: [...state.rejectedVerifications, {
          ...verification,
          status: 'rejected',
          rejectionReason: reason,
          rejectedAt: new Date(),
          rejectedBy: 'Current Admin',
        }],
        analytics: {
          ...state.analytics,
          pendingVerifications: state.analytics.pendingVerifications - 1,
        }
      }));
    }
  },

  resolveReport: (reportId, action) => {
    const report = get().reportedPosts.find(r => r.id === reportId);
    if (report) {
      set((state) => ({
        reportedPosts: state.reportedPosts.filter(r => r.id !== reportId),
        resolvedReports: [...state.resolvedReports, {
          ...report,
          status: 'resolved',
          action,
          resolvedAt: new Date(),
          resolvedBy: 'Current Admin',
        }],
        analytics: {
          ...state.analytics,
          reportedPosts: state.analytics.reportedPosts - 1,
        }
      }));
    }
  },

  updateSafetyReport: (reportId, updates) => {
    set((state) => ({
      safetyReports: state.safetyReports.map(report =>
        report.id === reportId ? { ...report, ...updates } : report
      )
    }));
  },

  addSafetyReport: (report) => {
    set((state) => ({
      safetyReports: [report, ...state.safetyReports],
      analytics: {
        ...state.analytics,
        safetyReports: state.analytics.safetyReports + 1,
        activeReports: state.analytics.activeReports + 1,
      }
    }));
  },
}));

export default useAdminStore;
