import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';

import { Colors } from '@themes';
import ModalWrapper, { ModalWrapperProps } from '@components/ModalWrapper';
import pokerGame from '@modules/PokerGame';
import Player from '@modules/Player';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from '@custom-types/navigation';

type NewGameModalProps = ModalWrapperProps & {};

const NewGameModal = (props: NewGameModalProps): JSX.Element => {
  const { visible, onClose } = props;

  const navigation = useNavigation<MainStackNavigationProp>();

  const [playerName, setPlayerName] = React.useState<string>('');

  const startGame = () => {
    try {
      pokerGame.joinGame(new Player(playerName));
      pokerGame.startGame();
      navigation.navigate('Cards');
    } catch (err: any) {
      console.log(err);
      Alert.alert('Error', err.message);
    }
  };

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>New Game</Text>
        <Text style={styles.subtitle}>Please enter your name</Text>
        <TextInput
          placeholder='Yourname...'
          style={styles.nameInput}
          textAlign='center'
          value={playerName}
          onChangeText={(text: string) => setPlayerName(text)}
        />
        <TouchableOpacity style={styles.confirmBtn} onPress={startGame}>
          <Text style={styles.confirmBtnText}>Play</Text>
        </TouchableOpacity>
      </View>
    </ModalWrapper>
  );
};

export default NewGameModal;

const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 64,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.black,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: Colors.black,
    marginTop: 16,
  },
  nameInput: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.black30,
    marginTop: 32,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  confirmBtn: {
    paddingHorizontal: 56,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: Colors.green,
    marginTop: 16,
  },
  confirmBtnText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '500',
  },
});
