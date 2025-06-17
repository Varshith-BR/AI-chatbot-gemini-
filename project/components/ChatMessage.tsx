import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Bot, User } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  colorScheme: 'light' | 'dark';
}

export function ChatMessage({ message, isUser, colorScheme }: ChatMessageProps) {
  return (
    <View style={[
      styles.container,
      isUser ? styles.userContainer : styles.botContainer,
    ]}>
      <View style={[
        styles.avatarContainer,
        isUser 
          ? { backgroundColor: Colors[colorScheme].primary } 
          : { backgroundColor: Colors[colorScheme].accent }
      ]}>
        {isUser ? (
          <User size={16} color="#FFFFFF" />
        ) : (
          <Bot size={16} color="#FFFFFF" />
        )}
      </View>
      <View style={[
        styles.bubble,
        isUser 
          ? [styles.userBubble, { backgroundColor: Colors[colorScheme].primary }] 
          : [styles.botBubble, { backgroundColor: Colors[colorScheme].cardBackground }]
      ]}>
        <Text style={[
          styles.message,
          isUser 
            ? styles.userMessage 
            : { color: Colors[colorScheme].text }
        ]}>
          {message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8,
    maxWidth: '85%',
  },
  userContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  botContainer: {
    alignSelf: 'flex-start',
  },
  avatarContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  bubble: {
    padding: 12,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 4,
  },
  botBubble: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 18,
  },
  message: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessage: {
    color: '#FFFFFF',
  },
});