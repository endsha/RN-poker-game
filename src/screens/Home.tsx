import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Colors } from '@themes';
import NewGameModal from '@components/home/NewGameModal';

const HomeScreen = () => {
  const [newGameModalVisible, setNewGameModalVisible] =
    React.useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Poker</Text>

      <TouchableOpacity
        style={styles.optionBtn}
        onPress={() => {
          setNewGameModalVisible(true);
        }}
      >
        <Text style={styles.optionText}>Play</Text>
      </TouchableOpacity>

      <NewGameModal
        visible={newGameModalVisible}
        onClose={() => setNewGameModalVisible(false)}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  optionBtn: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: Colors.orange,
  },
  optionText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
