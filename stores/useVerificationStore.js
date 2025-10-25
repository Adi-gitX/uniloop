import { create } from 'zustand';

const useVerificationStore = create((set, get) => ({
  verificationStep: 0, // 0: Email, 1: Personal Info, 2: ID Upload, 3: Selfie, 4: Pending, 5: Verified
  userData: {
    email: 'priya.sharma@university.edu',
    enrollmentNumber: 'CS2023001',
    fullName: 'Priya Sharma',
    course: 'Computer Science',
    year: '3rd Year',
    hostel: 'Girls Hostel A',
    phoneNumber: '+91 9876543210',
    idImage: null,
    selfieImage: null,
  },
  verificationStatus: 'approved', // not_started, pending, approved, rejected - Set to approved for demo
  verificationMessage: '',

  updateStep: (step) => set({ verificationStep: step }),

  updateUserData: (data) => set((state) => ({
    userData: { ...state.userData, ...data }
  })),

  submitVerification: async () => {
    set({ verificationStatus: 'pending', verificationMessage: 'Your verification request has been submitted. Faculty will review it within 24 hours.' });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In real app, this would be handled by backend
    return { success: true, message: 'Verification submitted successfully' };
  },

  resetVerification: () => set({
    verificationStep: 0,
    userData: {
      email: '',
      enrollmentNumber: '',
      fullName: '',
      course: '',
      year: '',
      hostel: '',
      phoneNumber: '',
      idImage: null,
      selfieImage: null,
    },
    verificationStatus: 'not_started',
    verificationMessage: '',
  }),

  // Admin functions (for faculty use)
  approveVerification: (userId) => {
    set({ verificationStatus: 'approved', verificationMessage: 'Your account has been verified successfully!' });
  },

  rejectVerification: (userId, reason) => {
    set({ verificationStatus: 'rejected', verificationMessage: `Verification rejected: ${reason}` });
  },
}));

export default useVerificationStore;
