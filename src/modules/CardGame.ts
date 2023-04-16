import Player from '@modules/Player';
import { Card } from '@custom-types/cards';

export default class CardGame {
  private _deckOfCard: Card[] = [];

  private _currentPlayers: Player[] = [];
  private _activePlayer: number = 0;
  private _maxPlayers: number = 0;

  private _pot: number = 0;

  /// Turn 0 is for begin of the game
  /// Turn 1 is for first turn of the game
  private _turn: number = 0;

  public setDeckOfCard(newDeck: Card[]): void {
    this._deckOfCard = newDeck;
  }

  public getDeckOfCard(): Card[] {
    return this._deckOfCard;
  }

  public popCardFromDeck(): Card | undefined {
    return this._deckOfCard.pop();
  }

  public addCurrentPlayers(newPlayers: Player[]): void {
    this._currentPlayers = [...this._currentPlayers, ...newPlayers];
  }

  public getCurrentPlayers(): Player[] {
    return this._currentPlayers;
  }

  public setPot(newPot: number): void {
    this._pot = newPot;
  }

  public getPot(): number {
    return this._pot;
  }

  public nextPlayer(): void {
    // Back to first player when current active player is at the end of the list
    if (this._activePlayer === this._currentPlayers.length - 1) {
      this._activePlayer = 0;
    } else {
      this._activePlayer += 1;
    }
  }

  public getActivePlayer(): number {
    return this._activePlayer;
  }

  public setMaxPlayers(maxPlayers: number): void {
    this._maxPlayers = maxPlayers;
  }

  public getMaxPlayers(): number {
    return this._maxPlayers;
  }

  public resetTurn(): void {
    this._turn = 1;
  }

  public nextTurn(): void {
    this._turn += 1;
    this.startTurn();
  }

  public getCurrentTurn(): number {
    return this._turn;
  }

  public startTurn(): void {}
}
