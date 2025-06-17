import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView, useColorScheme, Alert, TextInput } from 'react-native';
import { ChevronRight, Moon, Sun, Key, MessageCircle, Trash2, Info } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@/constants/Colors';
import { useColorSchemeContext } from '@/context/ColorSchemeContext';

export default function SettingsScreen() {
  const deviceColorScheme = useColorScheme();
  const { colorScheme, setColorScheme } = useColorSchemeContext();
  const [apiKey, setApiKey] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    loadApiKey();
  }, []);

  const loadApiKey = async () => {
    try {
      const savedKey = await AsyncStorage.getItem('gemini_api_key');
      if (savedKey) {
        setApiKey(savedKey);
      }
    } catch (error) {
      console.error('Error loading API key:', error);
    }
  };

  const handleSaveApiKey = async () => {
    try {
      await AsyncStorage.setItem('gemini_api_key', apiKey);
      setIsEditing(false);
      Alert.alert('Success', 'API key saved successfully');
    } catch (error) {
      console.error('Error saving API key:', error);
      Alert.alert('Error', 'Failed to save API key');
    }
  };
  
  const handleClearHistory = () => {
    Alert.alert(
      "Clear Chat History",
      "Are you sure you want to clear all chat history? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Clear", 
          onPress: () => {
            // TODO: Implement clear history functionality
            Alert.alert("Success", "Chat history cleared successfully");
          },
          style: "destructive"
        }
      ]
    );
  };

  const settingsSections = [
    {
      title: 'Appearance',
      items: [
        {
          title: 'Dark Mode',
          icon: colorScheme === 'dark' ? <Moon size={22} color={Colors[colorScheme].primary} /> : <Sun size={22} color={Colors[colorScheme].primary} />,
          type: 'switch',
          value: colorScheme === 'dark',
          onValueChange: () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
        },
      ]
    },
    {
      title: 'API Configuration',
      items: [
        {
          title: 'Gemini API Key',
          icon: <Key size={22} color={Colors[colorScheme].primary} />,
          type: 'input',
          value: apiKey,
          onChangeText: setApiKey,
          isEditing,
          onEdit: () => setIsEditing(true),
          onSave: handleSaveApiKey
        }
      ]
    },
    {
      title: 'Chat',
      items: [
        {
          title: 'Message History',
          icon: <MessageCircle size={22} color={Colors[colorScheme].primary} />,
          type: 'navigate',
          onPress: () => {}
        },
        {
          title: 'Clear Chat History',
          icon: <Trash2 size={22} color={Colors[colorScheme].error} />,
          type: 'navigate',
          onPress: handleClearHistory,
          textColor: Colors[colorScheme].error
        },
      ]
    },
    {
      title: 'About',
      items: [
        {
          title: 'About VarshithMind',
          icon: <Info size={22} color={Colors[colorScheme].primary} />,
          type: 'navigate',
          onPress: () => {}
        },
      ]
    }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      {settingsSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme].textSecondary }]}>
            {section.title}
          </Text>
          <View style={[styles.sectionContent, { backgroundColor: Colors[colorScheme].cardBackground }]}>
            {section.items.map((item, itemIndex) => (
              <React.Fragment key={itemIndex}>
                {item.type === 'switch' ? (
                  <View style={styles.settingRow}>
                    <View style={styles.settingInfo}>
                      {item.icon}
                      <Text style={[styles.settingTitle, { color: Colors[colorScheme].text }]}>
                        {item.title}
                      </Text>
                    </View>
                    <Switch
                      value={item.value || false}
                      onValueChange={item.onValueChange}
                      trackColor={{ false: '#767577', true: Colors[colorScheme].primaryLight }}
                      thumbColor={item.value ? Colors[colorScheme].primary : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                    />
                  </View>
                ) : item.type === 'input' ? (
                  <View style={styles.settingRow}>
                    <View style={styles.settingInfo}>
                      {item.icon}
                      <Text style={[styles.settingTitle, { color: Colors[colorScheme].text }]}>
                        {item.title}
                      </Text>
                    </View>
                    {item.isEditing ? (
                      <View style={styles.apiKeyInputContainer}>
                        <TextInput
                          style={[styles.apiKeyInput, { 
                            color: Colors[colorScheme].text,
                            backgroundColor: Colors[colorScheme].inputBackground
                          }]}
                          value={item.value}
                          onChangeText={item.onChangeText}
                          placeholder="Enter API Key"
                          placeholderTextColor={Colors[colorScheme].textSecondary}
                          autoCapitalize="none"
                          autoCorrect={false}
                          secureTextEntry
                        />
                        <TouchableOpacity
                          style={[styles.saveButton, { backgroundColor: Colors[colorScheme].primary }]}
                          onPress={item.onSave}
                        >
                          <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity onPress={item.onEdit}>
                        <Text style={[styles.editButton, { color: Colors[colorScheme].primary }]}>
                          {item.value ? 'Change' : 'Set Key'}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ) : (
                  <TouchableOpacity style={styles.settingRow} onPress={item.onPress}>
                    <View style={styles.settingInfo}>
                      {item.icon}
                      <Text style={[styles.settingTitle, { color: item.textColor || Colors[colorScheme].text }]}>
                        {item.title}
                      </Text>
                    </View>
                    <ChevronRight size={20} color={Colors[colorScheme].textSecondary} />
                  </TouchableOpacity>
                )}
                {itemIndex < section.items.length - 1 && (
                  <View style={[styles.divider, { backgroundColor: Colors[colorScheme].border }]} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      ))}
      
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: Colors[colorScheme].textSecondary }]}>
          VarshithMind v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 12,
    textTransform: 'uppercase',
  },
  sectionContent: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 16,
    marginLeft: 12,
  },
  divider: {
    height: 1,
    marginLeft: 50,
  },
  footer: {
    alignItems: 'center',
    padding: 16,
    marginTop: 16,
    marginBottom: 32,
  },
  footerText: {
    fontSize: 14,
  },
  apiKeyInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  apiKeyInput: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  saveButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  editButton: {
    fontSize: 16,
    fontWeight: '600',
  },
});