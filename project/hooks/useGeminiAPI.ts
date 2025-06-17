import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MessageRole = 'user' | 'assistant';

interface Message {
  role: MessageRole;
  content: string;
}

export function useGeminiAPI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const sendMessage = useCallback(async (content: string) => {
    setError(null);
    
    try {
      const apiKey = await AsyncStorage.getItem('gemini_api_key');
      
      if (!apiKey) {
        setError('Please set your API key in settings to use the chat.');
        return;
      }

      // Add user message to history
      const userMessage: Message = { role: 'user', content };
      setMessages(prev => [...prev, userMessage]);
      
      setIsLoading(true);

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: content
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get response from Gemini API');
      }

      const data = await response.json();
      
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid response format from API');
      }

      const assistantResponse = data.candidates[0].content.parts[0].text;
      
      // Add assistant response to history
      const assistantMessage: Message = { role: 'assistant', content: assistantResponse };
      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(`Error: ${errorMessage}. Please try again.`);
      console.error('Error in sendMessage:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return {
    messages,
    sendMessage,
    isLoading,
    error,
  };
}