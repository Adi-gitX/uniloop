import { create } from 'zustand';

const useFeedStore = create((set, get) => ({
  posts: [
    {
      id: '1',
      author: 'Priya S.',
      authorId: 'user1',
      content: 'Looking for study partners for CS 301 midterm! Anyone interested?',
      tags: ['#StudyHelp', '#CS301'],
      time: '2h ago',
      likes: 12,
      comments: 3,
      isLiked: false,
      isAnonymous: false,
      type: 'text',
      category: 'academic',
    },
    {
      id: '2',
      author: 'Anonymous',
      authorId: 'anonymous',
      content: 'The library WiFi is really slow today. IT department please check!',
      tags: ['#Suggestion', '#Anonymous'],
      time: '4h ago',
      likes: 8,
      comments: 1,
      isLiked: false,
      isAnonymous: true,
      type: 'text',
      category: 'suggestion',
    },
    {
      id: '3',
      author: 'Raj K.',
      authorId: 'user3',
      content: 'Photography club meeting tomorrow at 6 PM. Bring your cameras!',
      tags: ['#PhotographyClub', '#Event'],
      time: '6h ago',
      likes: 15,
      comments: 5,
      isLiked: true,
      isAnonymous: false,
      type: 'text',
      category: 'event',
    },
    {
      id: '4',
      author: 'Sneha P.',
      authorId: 'user4',
      content: 'Just finished an amazing coding session! The new lab equipment is fantastic.',
      tags: ['#Coding', '#Lab'],
      time: '8h ago',
      likes: 20,
      comments: 7,
      isLiked: false,
      isAnonymous: false,
      type: 'text',
      category: 'general',
    },
  ],

  filters: {
    category: 'all', // all, academic, event, suggestion, general
    tags: [],
    timeRange: 'all', // all, today, week, month
  },

  currentUser: {
    id: 'current_user',
    name: 'Priya Sharma',
    verified: true,
  },

  // Actions
  addPost: (post) => set((state) => ({
    posts: [post, ...state.posts]
  })),

  likePost: (postId) => set((state) => ({
    posts: state.posts.map(post =>
      post.id === postId
        ? {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    )
  })),

  addComment: (postId, comment) => set((state) => ({
    posts: state.posts.map(post =>
      post.id === postId
        ? { ...post, comments: post.comments + 1 }
        : post
    )
  })),

  setFilter: (filterType, value) => set((state) => ({
    filters: { ...state.filters, [filterType]: value }
  })),

  getFilteredPosts: () => {
    const { posts, filters } = get();

    return posts.filter(post => {
      // Category filter
      if (filters.category !== 'all' && post.category !== filters.category) {
        return false;
      }

      // Tags filter
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag =>
          post.tags.some(postTag => postTag.toLowerCase().includes(tag.toLowerCase()))
        );
        if (!hasMatchingTag) return false;
      }

      // Time range filter (simplified)
      if (filters.timeRange !== 'all') {
        // In a real app, you'd parse the time and filter accordingly
        // For now, we'll just return true
        return true;
      }

      return true;
    });
  },

  reportPost: (postId, reason) => {
    // In a real app, this would send a report to the backend
    console.log(`Post ${postId} reported for: ${reason}`);
    return { success: true, message: 'Post reported successfully' };
  },

  deletePost: (postId) => set((state) => ({
    posts: state.posts.filter(post => post.id !== postId)
  })),
}));

export default useFeedStore;
