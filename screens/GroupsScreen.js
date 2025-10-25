import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const GroupsScreen = () => {
  const groups = [
    {
      id: 1,
      name: 'Coding Club',
      members: 45,
      description: 'Learn programming together',
      category: 'Academic',
    },
    {
      id: 2,
      name: 'Photography Society',
      members: 32,
      description: 'Capture campus moments',
      category: 'Arts',
    },
    {
      id: 3,
      name: 'Study Group - CS 301',
      members: 8,
      description: 'Midterm preparation group',
      category: 'Study',
    },
    {
      id: 4,
      name: 'Campus Cleanup',
      members: 25,
      description: 'Environmental initiatives',
      category: 'Social',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Groups & Communities</Text>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createText}>+ Create</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Academic</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Arts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Social</Text>
        </TouchableOpacity>
      </View>

      {groups.map((group) => (
        <TouchableOpacity key={group.id} style={styles.groupCard}>
          <View style={styles.groupHeader}>
            <Text style={styles.groupName}>{group.name}</Text>
            <Text style={styles.memberCount}>{group.members} members</Text>
          </View>
          <Text style={styles.groupDescription}>{group.description}</Text>
          <View style={styles.groupFooter}>
            <Text style={styles.category}>{group.category}</Text>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinText}>Join</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
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
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
  },
  groupCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  memberCount: {
    fontSize: 12,
    color: '#888',
  },
  groupDescription: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 12,
  },
  groupFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    backgroundColor: '#333',
    color: '#3b82f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
  },
  joinButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  joinText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default GroupsScreen;
