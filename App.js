
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import ChatLog from './components/ChatLog';
import DetailView from './components/DetailView';

const sections = ['Subjective', 'Objective', 'Assessment', 'Plan'];

export default function App() {
  const [activeTab, setActiveTab] = useState('Diagnostics');
  const [selectedSection, setSelectedSection] = useState(null);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const toggleOverlay = () => setOverlayOpen(!overlayOpen);

  const renderDiagnostics = () => (
    <ScrollView contentContainerStyle={styles.cardContainer}>
      {sections.map((section) => (
        <TouchableOpacity
          key={section}
          style={styles.card}
          onPress={() => setSelectedSection(section)}
        >
          <Text style={styles.cardTitle}>{section}</Text>
          <Text style={styles.cardContent}>
            Kort sammanfattning av {section.toLowerCase()}…
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderScreen = () => {
    if (selectedSection) {
      return (
        <DetailView
          section={selectedSection}
          onSwipe={(direction) => {
            const index = sections.indexOf(selectedSection);
            const nextIndex =
              direction === 'left'
                ? (index + 1) % sections.length
                : (index - 1 + sections.length) % sections.length;
            setSelectedSection(sections[nextIndex]);
          }}
          onClose={() => setSelectedSection(null)}
        />
      );
    }

    switch (activeTab) {
      case 'Home':
        return <Text style={styles.screen}>🏠 Home</Text>;
      case 'Diagnostics':
        return renderDiagnostics();
      case 'Library':
        return <Text style={styles.screen}>📚 Library</Text>;
      case 'Search':
        return <Text style={styles.screen}>🔍 Search</Text>;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://github.com/othyagen/Clinisense/blob/main/clinisense_logo.png?raw=true',
          }}
          style={styles.logo}
        />
        <Text style={styles.profile}>👤</Text>
      </View>

      {overlayOpen && (
        <View style={styles.overlay}>
          <ChatLog />
        </View>
      )}

      <View style={styles.content}>{renderScreen()}</View>

      <View style={styles.navbar}>
        {['Home', 'Diagnostics', 'Library', 'Search'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tab, activeTab === tab && styles.activeTabNav]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.overlayToggle} onPress={toggleOverlay}>
        <Text style={{ fontSize: 22 }}>⏷</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  logo: { width: 44, height: 44, borderRadius: 6 },
  profile: { fontSize: 20 },
  content: { flex: 1 },
  screen: { fontSize: 24, textAlign: 'center', marginTop: 40 },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  tab: { fontSize: 16, color: '#999' },
  activeTabNav: { color: '#007AFF', fontWeight: 'bold' },
  cardContainer: { padding: 16 },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  cardContent: { fontSize: 14, color: '#666' },
  overlayToggle: {
    position: 'absolute',
    top: 58,
    alignSelf: 'center',
    zIndex: 20,
  },
  overlay: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    height: '80%',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    zIndex: 10,
    paddingTop: 12,
  },
});
