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
  FlatList
} from 'react-native';
import useFeedStore from '../stores/useFeedStore';

const CommunityFeedScreen = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const {
    posts,
    filters,
    addPost,
    likePost,
    addComment,
    setFilter,
    getFilteredPosts,
    reportPost,
    deletePost,
    currentUser
  } = useFeedStore();

  const filteredPosts = getFilteredPosts();

  const handleLike = (postId) => {
    likePost(postId);
  };

  const handleComment = (postId) => {
    Alert.prompt(
      'Add Comment',
      'Write your comment:',
      (comment) => {
        if (comment && comment.trim()) {
          addComment(postId, comment);
          Alert.alert('Comment Added', 'Your comment has been added successfully!');
        }
      }
    );
  };

  const handleReport = (postId) => {
    Alert.alert(
      'Report Post',
      'Why are you reporting this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Spam', onPress: () => reportPost(postId, 'Spam') },
        { text: 'Inappropriate', onPress: () => reportPost(postId, 'Inappropriate') },
        { text: 'Harassment', onPress: () => reportPost(postId, 'Harassment') },
        { text: 'Other', onPress: () => reportPost(postId, 'Other') },
      ]
    );
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) {
      Alert.alert('Empty Post', 'Please write something before posting.');
      return;
    }

    const tags = newPostTags.split(',').map(tag => tag.trim()).filter(tag => tag);
    const newPost = {
      id: Date.now().toString(),
      author: isAnonymous ? 'Anonymous' : currentUser.name,
      authorId: isAnonymous ? 'anonymous' : currentUser.id,
      content: newPostContent.trim(),
      tags: tags.length > 0 ? tags.map(tag => `#${tag}`) : [],
      time: 'Just now',
      likes: 0,
      comments: 0,
      isLiked: false,
      isAnonymous,
      type: 'text',
      category: tags.includes('Suggestion') ? 'suggestion' : 'general',
    };

    addPost(newPost);
    setNewPostContent('');
    setNewPostTags('');
    setIsAnonymous(false);
    setShowPostModal(false);
    Alert.alert('Post Created', 'Your post has been shared successfully!');
  };

  const categories = [
    { key: 'all', label: 'All', emoji: '📱' },
    { key: 'academic', label: 'Academic', emoji: '📚' },
    { key: 'event', label: 'Events', emoji: '📅' },
    { key: 'suggestion', label: 'Suggestions', emoji: '💡' },
    { key: 'general', label: 'General', emoji: '💬' },
  ];

  const renderPost = ({ item: post }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.authorInfo}>
          <View style={styles.authorAvatar}>
            <Text style={styles.authorInitial}>
              {post.isAnonymous ? '?' : post.author.charAt(0)}
            </Text>
          </View>
          <View>
            <Text style={styles.author}>{post.author}</Text>
            <Text style={styles.time}>{post.time}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => handleReport(post.id)}
        >
          <Text style={styles.moreButtonText}>⋯</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      {post.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {post.tags.map((tag, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tag}
              onPress={() => setFilter('tags', [tag.replace('#', '')])}
            >
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.postFooter}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleLike(post.id)}
        >
          <Text style={[styles.actionText, post.isLiked && styles.likedText]}>
            {post.isLiked ? '❤️' : '🤍'} {post.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleComment(post.id)}
        >
          <Text style={styles.actionText}>💬 {post.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>📤 Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Community Feed</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}
          >
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => setShowPostModal(true)}
          >
            <Text style={styles.createText}>+ Post</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Posts</Text>

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.key}
                    style={[
                      styles.categoryChip,
                      filters.category === category.key && styles.categoryChipSelected
                    ]}
                    onPress={() => setFilter('category', category.key)}
                  >
                    <Text style={[
                      styles.categoryChipText,
                      filters.category === category.key && styles.categoryChipTextSelected
                    ]}>
                      {category.emoji} {category.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowFilterModal(false)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Create Post Modal */}
      <Modal
        visible={showPostModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPostModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Post</Text>

            <TextInput
              style={styles.postInput}
              value={newPostContent}
              onChangeText={setNewPostContent}
              placeholder="What's on your mind?"
              placeholderTextColor="#666"
              multiline
              maxLength={500}
            />

            <TextInput
              style={styles.tagsInput}
              value={newPostTags}
              onChangeText={setNewPostTags}
              placeholder="Tags (comma separated): StudyHelp, CS301"
              placeholderTextColor="#666"
            />

            <TouchableOpacity
              style={styles.anonymousToggle}
              onPress={() => setIsAnonymous(!isAnonymous)}
            >
              <Text style={styles.anonymousToggleText}>
                {isAnonymous ? '🔒' : '👤'} Post as {isAnonymous ? 'Anonymous' : 'Yourself'}
              </Text>
            </TouchableOpacity>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowPostModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.createPostButton]}
                onPress={handleCreatePost}
              >
                <Text style={styles.modalButtonText}>Post</Text>
              </TouchableOpacity>
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  filterButton: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
  },
  createButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  createText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  feedContent: {
    padding: 16,
  },
  postCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  authorInitial: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  moreButton: {
    padding: 8,
  },
  moreButtonText: {
    color: '#888',
    fontSize: 18,
  },
  content: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    color: '#3b82f6',
    fontSize: 12,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  actionText: {
    color: '#888',
    fontSize: 14,
    marginLeft: 4,
  },
  likedText: {
    color: '#ff6b6b',
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
  filterSection: {
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  categoryChip: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  categoryChipSelected: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  categoryChipText: {
    color: '#ccc',
    fontSize: 14,
  },
  categoryChipTextSelected: {
    color: '#fff',
    fontWeight: '500',
  },
  postInput: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  tagsInput: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 14,
    marginBottom: 12,
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
  createPostButton: {
    backgroundColor: '#3b82f6',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CommunityFeedScreen;
