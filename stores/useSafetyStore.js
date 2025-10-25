import { create } from 'zustand';

const useSafetyStore = create((set, get) => ({
  // Safety Categories
  safetyCategories: [
    { key: 'emergency', label: 'Emergency', emoji: '🚨', priority: 'high' },
    { key: 'harassment', label: 'Harassment', emoji: '⚠️', priority: 'high' },
    { key: 'medical', label: 'Medical', emoji: '🏥', priority: 'high' },
    { key: 'security', label: 'Security', emoji: '🛡️', priority: 'medium' },
    { key: 'bullying', label: 'Bullying', emoji: '😢', priority: 'medium' },
    { key: 'academic', label: 'Academic', emoji: '📚', priority: 'low' },
    { key: 'facility', label: 'Facility', emoji: '🏢', priority: 'low' },
    { key: 'other', label: 'Other', emoji: '❓', priority: 'medium' },
  ],

  // Emergency Contacts
  emergencyContacts: [
    { name: 'Campus Security', number: '+91 99999 11111', type: 'security' },
    { name: 'Medical Emergency', number: '+91 99999 22222', type: 'medical' },
    { name: 'Counseling Services', number: '+91 99999 33333', type: 'counseling' },
    { name: 'Women\'s Helpline', number: '+91 99999 44444', type: 'women' },
    { name: 'Dean of Students', number: '+91 99999 55555', type: 'administration' },
  ],

  // Safety Resources
  safetyResources: [
    {
      title: 'Campus Safety Guidelines',
      description: 'Important safety tips and guidelines for campus life',
      type: 'guide',
      url: 'https://university.edu/safety-guidelines',
    },
    {
      title: 'Emergency Procedures',
      description: 'What to do in case of emergency situations',
      type: 'procedure',
      url: 'https://university.edu/emergency-procedures',
    },
    {
      title: 'Mental Health Support',
      description: 'Resources for mental health and wellness',
      type: 'support',
      url: 'https://university.edu/mental-health',
    },
    {
      title: 'Report Incident',
      description: 'Anonymous incident reporting system',
      type: 'report',
      url: 'https://university.edu/report-incident',
    },
  ],

  // User's safety reports
  userReports: [],

  // Actions
  submitSafetyReport: (reportData) => {
    const newReport = {
      id: Date.now().toString(),
      timestamp: new Date(),
      status: 'submitted',
      ...reportData,
    };

    set((state) => ({
      userReports: [newReport, ...state.userReports]
    }));

    // In a real app, this would send to backend
    console.log('Safety report submitted:', newReport);

    return { success: true, reportId: newReport.id };
  },

  updateReportStatus: (reportId, status) => {
    set((state) => ({
      userReports: state.userReports.map(report =>
        report.id === reportId ? { ...report, status } : report
      )
    }));
  },

  // Emergency functions
  triggerEmergencyAlert: (category, location) => {
    const emergencyReport = {
      id: Date.now().toString(),
      category,
      location,
      timestamp: new Date(),
      status: 'emergency',
      priority: 'high',
      description: 'Emergency alert triggered',
    };

    set((state) => ({
      userReports: [emergencyReport, ...state.userReports]
    }));

    // In a real app, this would immediately notify security/admin
    console.log('EMERGENCY ALERT:', emergencyReport);

    return { success: true, alertId: emergencyReport.id };
  },

  // Get appropriate contacts for category
  getContactsForCategory: (category) => {
    const categoryData = get().safetyCategories.find(c => c.key === category);
    if (!categoryData) return get().emergencyContacts;

    // Return relevant contacts based on category
    switch (category) {
      case 'emergency':
      case 'medical':
        return get().emergencyContacts.filter(c =>
          c.type === 'security' || c.type === 'medical'
        );
      case 'harassment':
      case 'bullying':
        return get().emergencyContacts.filter(c =>
          c.type === 'security' || c.type === 'counseling' || c.type === 'women'
        );
      case 'security':
        return get().emergencyContacts.filter(c => c.type === 'security');
      case 'academic':
        return get().emergencyContacts.filter(c => c.type === 'administration');
      default:
        return get().emergencyContacts;
    }
  },
}));

export default useSafetyStore;
