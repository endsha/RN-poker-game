import { Card, CardType, CardValue } from '@custom-types/cards';
import Player from '@modules/Player';
import CardGame from '@modules/CardGame';

interface IPokerGameConfig {
  blindBet: number;
  maxPlayers: number;
}
export class PokerGame extends CardGame {
  private static instance: PokerGame; // Singleton instance

  private _isBetting: boolean = false;

  private _blindBet: number = 0;

  private _highestBet: number = 0;

  private _table: Card[] = [];

  private _newPlayers: Player[] = [];

  // Initial poker table
  constructor(config?: IPokerGameConfig) {
    super();
    console.log('INITIAL POKER GAME');
    // this._blindBet = config.blindBet;
    // this.setMaxPlayers(config.maxPlayers);
    this._blindBet = 0;
    this.setMaxPlayers(14);
  }

  // Static method to get the singleton instance
  public static getInstance(config: IPokerGameConfig): PokerGame {
    if (!PokerGame.instance) {
      PokerGame.instance = new PokerGame(config); // Create a new instance if it doesn't exist
    }
    return PokerGame.instance;
  }

  public logAllData(): void {
    console.log(
      'DECK OF CARD: ',
      this.getDeckOfCard(),
      this.getDeckOfCard().length
    );
    console.log('TABLE: ', this._table);
    console.log('CURRENT PLAYERS: ', this.getCurrentPlayers());
    console.log('NEW PLAYERS: ', this._newPlayers);
  }

  public startGame(): void {
    if (this.getCurrentPlayers().length < 2) {
      throw new Error('NOT ENOUGH PLAYERS');
    }
    // Shuffle deck of card
    this.setDeckOfCard(
      Object.keys(CardType).reduce((prevValue: Card[], currentValue) => {
        return [
          ...prevValue,
          ...Object.values(CardValue).map((value, index) => ({
            id: `${currentValue}-${index}`,
            type: currentValue as CardType,
            value: value as CardValue,
          })),
        ];
      }, [])
    );
    // Add all new players to current players
    this.addNewPlayers();
    // Distribute cards to current players
    this.distributeCardsToAllPlayers();
    // First turn;
    this.nextTurn();
  }

  public startTurn(): void {
    // Add new players if there are new players at the beginning of this turn
    this.addNewPlayers();
    // Players start betting
    const betting = this.checkIsBetting();
    const turn = this.getCurrentTurn();
    switch (turn) {
      case 1:
        // After first turn, all players stopped betting, distribute 3 cards to the table
        if (!betting) {
          this.distributeCardsToTable(3);
        }
        break;
      case 2:
        // After second turn, all players stopped betting, distribute 1 cards to the table
        if (!betting) {
          this.distributeCardsToTable(1);
        }
        break;
      case 3:
        // After second turn, all players stopped betting, distribute 1 cards to the table
        if (!betting) {
          this.distributeCardsToTable(1);
        }
        break;
      case 4:
        // After second turn, all players stopped betting, distribute 1 cards to the table
        if (!betting) {
          this.distributeCardsToTable(1);
        }
        break;
      default:
        break;
    }
  }

  public joinGame(player: Player): void {
    console.log(`PLAYER ${player.getName()} HAS JOIN THE GAME`);
    this._newPlayers.push(player);
  }

  public playerFold(player: Player): void {}

  public playerCheck(player: Player): void {}

  public playerRaise(player: Player, amount: number): void {}

  public playerBet(player: Player, amount: number): void {}

  private checkIsBetting(): boolean {
    return false;
  }

  private addNewPlayers(): void {
    // Add all new players to current players
    if (this._newPlayers.length > 0) {
      this.addCurrentPlayers(this._newPlayers);
      this._newPlayers = [];
    }
  }

  private distributeCardsToTable(numberOfCards: number): void {
    for (let index = 0; index < numberOfCards; index++) {
      const poppedCard = this.popCardFromDeck();
      if (poppedCard) {
        this._table.push(poppedCard);
      }
    }
  }

  private distributeCardsToAllPlayers() {
    const currentPlayers = this.getCurrentPlayers();
    // Each player has 2 distributed cards
    const distributeRounds = 2;
    for (let round = 0; round < distributeRounds; round++) {
      for (const player of currentPlayers) {
        const poppedCard = this.popCardFromDeck();
        if (poppedCard) {
          player.pushCardToHand(poppedCard);
        }
      }
    }
  }
}

const pokerGame = new PokerGame();

export default pokerGame;
