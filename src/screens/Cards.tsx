import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CardComponent from '@components/Card';
import { DECK_OF_CARDS } from '@constants/cards';
import Player from '@modules/Player';
import PokerGame from '@modules/PokerGame';
import { Colors } from '@themes';
import { Card } from '@custom-types/cards';
import { shuffleArray } from '@utils/math';

const CardsScreen = () => {
  const [cards, setCards] = React.useState<Card[]>(shuffleArray(DECK_OF_CARDS));
  const pokerGame = React.useMemo(() => {
    return new PokerGame({
      blindBet: 0,
      maxPlayers: 14,
    });
  }, []);

  const resetCards = () => {
    setCards([]);
    setTimeout(() => {
      setCards(shuffleArray(DECK_OF_CARDS));
    }, 200);
  };

  const popCard = () => {
    setCards(cards => cards.slice(1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardDeck}>
        {cards.map((card, index) => (
          <CardComponent
            key={card.id}
            id={card.id}
            value={card.value}
            type={card.type}
            index={cards.length - index}
            isTop={index === 0}
            onRemove={() => popCard()}
            size={1}
          />
        ))}
      </View>
      <TouchableOpacity
        style={{ position: 'absolute', bottom: 150 }}
        onPress={() => {
          pokerGame.startGame();
        }}
      >
        <Text>Start game</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ position: 'absolute', bottom: 110 }}
        onPress={() => {
          pokerGame.joinGame(new Player('Anh'));
        }}
      >
        <Text>Add player</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => {
          // resetCards();
          pokerGame.logAllData();
        }}
      >
        <Text style={styles.resetText}>Log data</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  cardDeck: {
    marginTop: 92,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: Colors.orange,
    position: 'absolute',
    bottom: 56,
  },
  resetText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
