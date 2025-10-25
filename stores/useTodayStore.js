import { create } from 'zustand';

const useTodayStore = create((set, get) => ({
  messMenu: {
    breakfast: [
      { name: 'Masala Dosa with Sambar', rating: 4.5, reviews: 45 },
      { name: 'Idli with Coconut Chutney', rating: 4.2, reviews: 38 },
      { name: 'Poha with Tea', rating: 4.0, reviews: 32 },
      { name: 'Aloo Paratha with Curd', rating: 4.3, reviews: 41 }
    ],
    lunch: [
      { name: 'Rajma Rice with Salad', rating: 4.4, reviews: 52 },
      { name: 'Chicken Curry with Roti', rating: 4.6, reviews: 48 },
      { name: 'Dal Makhani with Rice', rating: 4.1, reviews: 35 },
      { name: 'Mixed Vegetable Curry', rating: 3.9, reviews: 28 }
    ],
    dinner: [
      { name: 'Paneer Butter Masala', rating: 4.7, reviews: 56 },
      { name: 'Chole Bhature', rating: 4.3, reviews: 43 },
      { name: 'Dal Tadka with Rice', rating: 4.2, reviews: 39 },
      { name: 'Egg Curry with Roti', rating: 4.4, reviews: 47 }
    ]
  },

  todaysEvents: [
    {
      id: 1,
      title: 'AI & Machine Learning Workshop',
      time: '7:00 PM',
      location: 'Room 301, CS Building',
      description: 'Introduction to Neural Networks and Deep Learning',
      category: 'Academic',
      attendees: 23,
      maxAttendees: 40
    },
    {
      id: 2,
      title: 'Midterm Study Group',
      time: '6:00 PM',
      location: 'Central Library, Study Room 5',
      description: 'CS 301 Data Structures - Group Study Session',
      category: 'Study',
      attendees: 12,
      maxAttendees: 15
    },
    {
      id: 3,
      title: 'Photography Club Exhibition',
      time: '5:00 PM',
      location: 'Art Gallery, Main Campus',
      description: 'Student Photography Exhibition - Theme: Campus Life',
      category: 'Arts',
      attendees: 18,
      maxAttendees: 30
    },
    {
      id: 4,
      title: 'Cricket Match - CS vs ME',
      time: '4:00 PM',
      location: 'Sports Ground',
      description: 'Inter-department Cricket Championship Finals',
      category: 'Sports',
      attendees: 45,
      maxAttendees: 100
    },
    {
      id: 5,
      title: 'Career Guidance Session',
      time: '3:00 PM',
      location: 'Auditorium',
      description: 'Placement Preparation Workshop by Industry Experts',
      category: 'Career',
      attendees: 67,
      maxAttendees: 100
    }
  ],

  yearCountdown: {
    daysLeft: 45,
    message: 'Midterms in 3 weeks!',
    actionText: 'Check out study resources',
    resources: [
      'CS 301 Study Guide',
      'Library Database Access',
      'Peer Study Groups'
    ]
  },

  userPreferences: {
    dietaryRestrictions: [],
    favoriteEvents: [],
    notifications: true
  },

  rateMenuItem: (mealType, itemIndex, rating) => {
    set((state) => ({
      messMenu: {
        ...state.messMenu,
        [mealType]: state.messMenu[mealType].map((item, index) =>
          index === itemIndex
            ? { ...item, rating: (item.rating + rating) / 2, reviews: item.reviews + 1 }
            : item
        )
      }
    }));
  },

  rsvpEvent: (eventId) => {
    set((state) => ({
      todaysEvents: state.todaysEvents.map(event =>
        event.id === eventId
          ? { ...event, attendees: event.attendees + 1 }
          : event
      )
    }));
  },

  updatePreferences: (preferences) => {
    set((state) => ({
      userPreferences: { ...state.userPreferences, ...preferences }
    }));
  }
}));

export default useTodayStore;
