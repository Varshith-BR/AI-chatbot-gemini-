import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import { Send, Bot } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { ChatMessage } from '@/components/ChatMessage';
import { useGeminiAPI } from '@/hooks/useGeminiAPI';

export default function ChatScreen() {
  const colorScheme = useColorScheme();
  const [input, setInput] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
const { messages, sendMessage, isLoading, error } = useGeminiAPI();

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;
    sendMessage(input);
    setInput('');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      {/* Chat Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.length === 0 ? (
          <View style={styles.emptyState}>
            <Bot
              size={48}
              color={Colors[colorScheme ?? 'light'].primary}
              style={styles.botIcon}
            />
            <Text style={[styles.emptyStateTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              Start a conversation
            </Text>
            <Text style={[styles.emptyStateText, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
              Ask me anything and I'll do my best to help!
            </Text>
          </View>
        ) : (
          messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.content}
              isUser={message.role === 'user'}
              colorScheme={colorScheme ?? 'light'}
            />
          ))
        )}
        
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={Colors[colorScheme ?? 'light'].primary} size="small" />
            <Text style={[styles.loadingText, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
              Thinking...
            </Text>
          </View>
        )}
        
        {error && (
          <View style={[styles.errorContainer, { backgroundColor: Colors[colorScheme ?? 'light'].errorBackground }]}>
            <Text style={[styles.errorText, { color: Colors[colorScheme ?? 'light'].error }]}>
              {error}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={[styles.inputContainer, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
        <TextInput
          style={[styles.input, { color: Colors[colorScheme ?? 'light'].text, backgroundColor: Colors[colorScheme ?? 'light'].inputBackground }]}
          placeholder="Type a message..."
          placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary, opacity: input.trim() === '' ? 0.6 : 1 }]}
          onPress={handleSend}
          disabled={input.trim() === '' || isLoading}
        >
          <Send size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    paddingHorizontal: 40,
  },
  botIcon: {
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    marginVertical: 8,
    marginLeft: 8,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
  },
  errorContainer: {
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
  },
  errorText: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    maxHeight: 120,
    fontSize: 16,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});