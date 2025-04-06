
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const symptomKeywords = ['andnöd', 'ont i magen', 'bröstsmärta', 'feber'];

export default function ChatLog() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return;

    const userMsg = { text: input, from: 'user', id: Date.now() };
    const aiMsg = {
      text: generateAIResponse(input),
      from: 'ai',
      id: Date.now() + 1,
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput('');
  };

  const generateAIResponse = (text) => {
    const matched = symptomKeywords.filter((s) => text.toLowerCase().includes(s));
    if (matched.length > 0) {
      const symptom = matched[0];
      return `🔍 Identifierat symtom: *${symptom}*

📋 Följdfrågor:
– När började det?
– Hur allvarligt är det?
– Finns några förvärrande eller lindrande faktorer?

🩺 System Review:
– Har du haft liknande symtom tidigare?
– Andra symtom från t.ex. hjärta, lungor eller mage?`;
    }
    return `Tack för din input: "${text}". Kan du specificera fler symtom eller detaljer?`;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chat} contentContainerStyle={{ paddingVertical: 10 }}>
        {messages.map((msg) =>
          msg.from === 'user' ? (
            <View key={msg.id} style={styles.userBubble}>
              <Text style={styles.userText}>{msg.text}</Text>
            </View>
          ) : (
            <View key={msg.id} style={styles.aiPanel}>
              <View style={styles.divider} />
              <Text style={styles.aiText}>{msg.text}</Text>
            </View>
          )
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Skriv här..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={{ color: 'white' }}>Skicka</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10 },
  chat: { flex: 1 },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 16,
    marginVertical: 6,
    maxWidth: '75%',
  },
  userText: { fontSize: 14, color: '#000' },
  aiPanel: {
    alignSelf: 'stretch',
    backgroundColor: '#F9F9F9',
    padding: 14,
    marginVertical: 8,
    borderRadius: 6,
    elevation: 1,
  },
  aiText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 5,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
});
