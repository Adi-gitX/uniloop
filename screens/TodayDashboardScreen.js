import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert
} from 'react-native';
import useTodayStore from '../stores/useTodayStore';

const TodayDashboardScreen = () => {
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const {
    messMenu,
    todaysEvents,
    yearCountdown,
    rateMenuItem,
    rsvpEvent
  } = useTodayStore();

  const handleRateItem = (mealType, itemIndex) => {
    Alert.alert(
      'Rate Menu Item',
      `Rate ${messMenu[mealType][itemIndex].name}`,
      [
        { text: '⭐', onPress: () => rateMenuItem(mealType, itemIndex, 1) },
        { text: '⭐⭐', onPress: () => rateMenuItem(mealType, itemIndex, 2) },
        { text: '⭐⭐⭐', onPress: () => rateMenuItem(mealType, itemIndex, 3) },
        { text: '⭐⭐⭐⭐', onPress: () => rateMenuItem(mealType, itemIndex, 4) },
        { text: '⭐⭐⭐⭐⭐', onPress: () => rateMenuItem(mealType, itemIndex, 5) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleRSVP = (eventId) => {
    rsvpEvent(eventId);
    setShowEventModal(false);
    Alert.alert('RSVP Confirmed', 'You have successfully RSVPed for this event!');
  };

  const getMealEmoji = (meal) => {
    switch (meal) {
      case 'breakfast': return '🌅';
      case 'lunch': return '☀️';
      case 'dinner': return '🌙';
      default: return '🍽️';
    }
  };

  const getCategoryEmoji = (category) => {
    switch (category) {
      case 'Academic': return '📚';
      case 'Study': return '✏️';
      case 'Arts': return '🎨';
      case 'Social': return '👥';
      default: return '📅';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Today</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</Text>
      </View>

      {/* Mess Menu Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>🍽️ Mess Menu</Text>
          <View style={styles.mealSelector}>
            {['breakfast', 'lunch', 'dinner'].map((meal) => (
              <TouchableOpacity
                key={meal}
                style={[
                  styles.mealButton,
                  selectedMeal === meal && styles.mealButtonActive
                ]}
                onPress={() => setSelectedMeal(meal)}
              >
                <Text style={[
                  styles.mealButtonText,
                  selectedMeal === meal && styles.mealButtonTextActive
                ]}>
                  {getMealEmoji(meal)} {meal.charAt(0).toUpperCase() + meal.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.menuItems}>
          {messMenu[selectedMeal].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handleRateItem(selectedMeal, index)}
            >
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <View style={styles.menuItemRating}>
                  <Text style={styles.ratingText}>
                    {'⭐'.repeat(Math.round(item.rating))} {item.rating.toFixed(1)}
                  </Text>
                  <Text style={styles.reviewsText}>({item.reviews} reviews)</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Events Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📅 Today's Events</Text>
        {todaysEvents.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.eventItem}
            onPress={() => handleEventPress(event)}
          >
            <View style={styles.eventContent}>
              <Text style={styles.eventTitle}>{getCategoryEmoji(event.category)} {event.title}</Text>
              <Text style={styles.eventTime}>🕐 {event.time}</Text>
              <Text style={styles.eventLocation}>📍 {event.location}</Text>
              <Text style={styles.eventDescription}>{event.description}</Text>
              <View style={styles.eventFooter}>
                <Text style={styles.attendeesText}>
                  👥 {event.attendees}/{event.maxAttendees} attending
                </Text>
                <Text style={styles.rsvpText}>Tap to RSVP</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Year Countdown Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎯 Year Countdown</Text>
        <View style={styles.countdownContent}>
          <Text style={styles.countdownDays}>{yearCountdown.daysLeft} days left</Text>
          <Text style={styles.countdownMessage}>{yearCountdown.message}</Text>
          <Text style={styles.countdownAction}>{yearCountdown.actionText}</Text>
          <View style={styles.resourcesContainer}>
            {yearCountdown.resources.map((resource, index) => (
              <TouchableOpacity key={index} style={styles.resourceButton}>
                <Text style={styles.resourceText}>📖 {resource}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Event Modal */}
      <Modal
        visible={showEventModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowEventModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedEvent && (
              <>
                <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
                <Text style={styles.modalTime}>🕐 {selectedEvent.time}</Text>
                <Text style={styles.modalLocation}>📍 {selectedEvent.location}</Text>
                <Text style={styles.modalDescription}>{selectedEvent.description}</Text>
                <Text style={styles.modalAttendees}>
                  👥 {selectedEvent.attendees}/{selectedEvent.maxAttendees} attending
                </Text>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setShowEventModal(false)}
                  >
                    <Text style={styles.modalButtonText}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.rsvpButton]}
                    onPress={() => handleRSVP(selectedEvent.id)}
                  >
                    <Text style={styles.modalButtonText}>RSVP</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
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
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    color: '#888',
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  mealSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mealButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  mealButtonActive: {
    backgroundColor: '#3b82f6',
  },
  mealButtonText: {
    color: '#888',
    fontSize: 12,
    fontWeight: '500',
  },
  mealButtonTextActive: {
    color: '#fff',
  },
  menuItems: {
    marginTop: 8,
  },
  menuItem: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  menuItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  menuItemRating: {
    alignItems: 'flex-end',
  },
  ratingText: {
    color: '#ffd700',
    fontSize: 12,
  },
  reviewsText: {
    color: '#888',
    fontSize: 10,
  },
  eventItem: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  eventTime: {
    color: '#3b82f6',
    fontSize: 12,
    marginBottom: 2,
  },
  eventLocation: {
    color: '#888',
    fontSize: 12,
    marginBottom: 2,
  },
  eventDescription: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 8,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendeesText: {
    color: '#059669',
    fontSize: 12,
  },
  rsvpText: {
    color: '#3b82f6',
    fontSize: 12,
    fontWeight: '500',
  },
  countdownContent: {
    alignItems: 'center',
  },
  countdownDays: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginBottom: 8,
  },
  countdownMessage: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  countdownAction: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 16,
  },
  resourcesContainer: {
    width: '100%',
  },
  resourceButton: {
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 6,
    marginBottom: 6,
  },
  resourceText: {
    color: '#fff',
    fontSize: 12,
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
    borderWidth: 1,
    borderColor: '#222',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalTime: {
    fontSize: 16,
    color: '#3b82f6',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalLocation: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalAttendees: {
    fontSize: 14,
    color: '#059669',
    marginBottom: 20,
    textAlign: 'center',
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
  rsvpButton: {
    backgroundColor: '#3b82f6',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default TodayDashboardScreen;
