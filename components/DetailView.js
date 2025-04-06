
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

export default function DetailView({ section, onSwipe, onClose }) {
  const handleGesture = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationX < -50) onSwipe('left');
      if (nativeEvent.translationX > 50) onSwipe('right');
    }
  };

  return (
    <PanGestureHandler onHandlerStateChange={handleGesture}>
      <View style={styles.detailContainer}>
        <Text style={styles.sectionTitle}>{section}</Text>
        <Text style={styles.sectionContent}>
          Här visas detaljerad information om {section.toLowerCase()}...
        </Text>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Text style={styles.closeText}>Stäng</Text>
        </TouchableOpacity>
      </View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 16,
    color: '#444',
  },
  closeBtn: {
    alignSelf: 'center',
    marginTop: 24,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  closeText: {
    fontSize: 16,
  },
});
