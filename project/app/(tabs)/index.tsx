import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight, Bot, Sparkles, Brain } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const features = [
    { 
      title: 'Smart Conversations',
      description: 'Powered by Google\'s Gemini AI for intelligent responses',
      icon: <Brain size={24} color={Colors[colorScheme ?? 'light'].primary} />
    },
    { 
      title: 'Personal Assistant',
      description: 'Get help with information, ideas, and more',
      icon: <Bot size={24} color={Colors[colorScheme ?? 'light'].primary} />
    },
    { 
      title: 'Advanced AI',
      description: 'Experience the latest in AI technology',
      icon: <Sparkles size={24} color={Colors[colorScheme ?? 'light'].primary} />
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <View style={styles.header}>
        <View style={styles.welcomeSection}>
          <Text style={[styles.greeting, { color: Colors[colorScheme ?? 'light'].text }]}>
            {greeting}, Varshith
          </Text>
          <Text style={[styles.subtitle, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
            How can I assist you today?
          </Text>
        </View>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} 
          style={styles.headerImage}
        />
      </View>

      <TouchableOpacity 
        style={[styles.chatButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
        onPress={() => router.push('/chat')}
      >
        <Text style={styles.chatButtonText}>Start Chatting</Text>
        <ArrowRight size={20} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.featuresContainer}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Features
        </Text>
        {features.map((feature, index) => (
          <View 
            key={index} 
            style={[styles.featureCard, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}
          >
            <View style={styles.featureIcon}>
              {feature.icon}
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                {feature.title}
              </Text>
              <Text style={[styles.featureDescription, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
                {feature.description}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
          VarshithMind • Powered by Gemini AI
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  welcomeSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
  },
  headerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 20,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 10,
  },
  chatButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  featuresContainer: {
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  featureCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureContent: {
    flex: 1,
    marginLeft: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
  },
});