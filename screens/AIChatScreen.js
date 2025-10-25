import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import useAIChatStore from '../stores/useAIChatStore';

const AIChatScreen = () => {
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef(null);
  const {
    messages,
    isLoading,
    isVoiceMode,
    addMessage,
    setLoading,
    toggleVoiceMode,
    callAIFunction
  } = useAIChatStore();

  const suggestedPrompts = [
    "What's for lunch today?",
    "Show me today's events",
    "Find CS students for study group",
    "Post: Looking for project partner #StudyHelp",
    "What's the library timing?"
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    setInputText('');

    // Add user message
    addMessage({
      text: userMessage,
      isUser: true
    });

    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Determine AI function based on user input
    let functionName = '';
    let params = {};

    if (userMessage.toLowerCase().includes('menu') || userMessage.toLowerCase().includes('food') || userMessage.toLowerCase().includes('lunch') || userMessage.toLowerCase().includes('breakfast') || userMessage.toLowerCase().includes('dinner')) {
      functionName = 'getMessMenu';
    } else if (userMessage.toLowerCase().includes('event') || userMessage.toLowerCase().includes('today') || userMessage.toLowerCase().includes('happening')) {
      functionName = 'getTodaysEvents';
    } else if (userMessage.toLowerCase().includes('find') || userMessage.toLowerCase().includes('student') || userMessage.toLowerCase().includes('study partner')) {
      functionName = 'findUsers';
    } else if (userMessage.toLowerCase().includes('post') || userMessage.toLowerCase().includes('share')) {
      functionName = 'createPost';
      params = { content: userMessage.replace(/post|share/gi, '').trim() };
    }

    // Call AI function
    const aiResponse = await callAIFunction(functionName, params);

    // Add AI response
    addMessage({
      text: aiResponse,
      isUser: false
    });

    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSuggestedPrompt = (prompt) => {
    setInputText(prompt);
  };

  const handleVoiceToggle = () => {
    toggleVoiceMode();
    Alert.alert(
      "Voice Mode",
      isVoiceMode ? "Voice mode disabled" : "Voice mode enabled! Tap and hold to speak.",
      [{ text: "OK" }]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Campus Genie</Text>
        <Text style={styles.subtitle}>Your AI-powered campus assistant</Text>
        <TouchableOpacity
          style={[styles.voiceButton, isVoiceMode && styles.voiceButtonActive]}
          onPress={handleVoiceToggle}
        >
          <Text style={styles.voiceButtonText}>
            {isVoiceMode ? '🎤' : '🎤'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.isUser ? styles.userMessage : styles.aiMessage
            ]}
          >
            <Text style={[
              styles.messageText,
              message.isUser ? styles.userMessageText : styles.aiMessageText
            ]}>
              {message.text}
            </Text>
            <Text style={styles.timestamp}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        ))}

        {isLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Campus Genie is thinking...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.suggestedPrompts}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {suggestedPrompts.map((prompt, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestedPrompt}
              onPress={() => handleSuggestedPrompt(prompt)}
            >
              <Text style={styles.suggestedPromptText}>{prompt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask me anything about campus..."
          placeholderTextColor="#666"
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={!inputText.trim() || isLoading}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 16,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  voiceButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButtonActive: {
    backgroundColor: '#3b82f6',
  },
  voiceButtonText: {
    fontSize: 20,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messagesContent: {
    paddingBottom: 20,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    padding: 12,
    borderBottomRightRadius: 4,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 12,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#222',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#fff',
  },
  aiMessageText: {
    color: '#ccc',
  },
  timestamp: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },
  loadingContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#222',
  },
  loadingText: {
    color: '#888',
    fontSize: 14,
    fontStyle: 'italic',
  },
  suggestedPrompts: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  suggestedPrompt: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  suggestedPromptText: {
    color: '#fff',
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#222',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#111',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 14,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#222',
  },
  sendButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#333',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AIChatScreen;
