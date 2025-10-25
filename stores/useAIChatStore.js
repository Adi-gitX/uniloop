import { create } from 'zustand';

const useAIChatStore = create((set, get) => ({
  messages: [
    {
      id: '1',
      text: "Hi! I'm your Campus Genie 🧞‍♂️. I can help you with:\n\n• Mess menu & events\n• Finding study partners\n• Campus information\n• Posting to community\n• Safety reporting\n\nWhat can I help you with today?",
      isUser: false,
      timestamp: new Date(),
    }
  ],
  isLoading: false,
  isVoiceMode: false,

  addMessage: (message) => set((state) => ({
    messages: [...state.messages, {
      id: Date.now().toString(),
      text: message.text,
      isUser: message.isUser,
      timestamp: new Date(),
      ...message
    }]
  })),

  setLoading: (loading) => set({ isLoading: loading }),

  toggleVoiceMode: () => set((state) => ({ isVoiceMode: !state.isVoiceMode })),

  // AI Function calls simulation
  callAIFunction: async (functionName, params) => {
    set({ isLoading: true });

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    let response = '';

    switch (functionName) {
      case 'getMessMenu':
        response = "🍽️ **Today's Mess Menu:**\n\n**Breakfast (7:00-9:00 AM):**\n• Paratha with Chai\n• Bread & Butter\n• Boiled Eggs\n\n**Lunch (12:00-2:00 PM):**\n• Dal Rice\n• Mixed Vegetable Curry\n• Roti & Pickle\n\n**Dinner (7:00-9:00 PM):**\n• Roti & Sabzi\n• Dal\n• Rice\n\n*Rating: 4.2/5 stars* ⭐";
        break;

      case 'getTodaysEvents':
        response = "📅 **Today's Events:**\n\n• **Coding Club Workshop** - 7:00 PM\n  Location: Room 301, CS Building\n  Topic: React Native Basics\n\n• **Library Study Session** - 6:00 PM\n  Location: Central Library\n  Focus: CS 301 Midterm Prep\n\n• **Photography Club Meet** - 5:00 PM\n  Location: Campus Garden\n  Theme: Sunset Photography";
        break;

      case 'findUsers':
        response = "👥 **Found CS students interested in AI:**\n\n• **Raj Kumar** - 3rd Year CS\n  Skills: Python, Machine Learning\n  Looking for: Study partner for AI course\n\n• **Sneha Patel** - 2nd Year CS\n  Skills: Data Science, Statistics\n  Looking for: Project collaboration\n\n• **Amit Singh** - 3rd Year CS\n  Skills: Deep Learning, TensorFlow\n  Looking for: Research partner";
        break;

      case 'createPost':
        response = `✅ **Post created successfully!**\n\nYour post "${params.content}" has been shared to the community feed. It will be visible to all verified students.`;
        break;

      default:
        response = "I understand you're asking about something, but I need more context. Could you be more specific about what you'd like to know?";
    }

    set({ isLoading: false });
    return response;
  }
}));

export default useAIChatStore;
