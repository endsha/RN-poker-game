import { Card } from '@custom-types/cards';

export default class Player {
  private _name: string = '';
  private _hand: Card[] = [];
  private _bet: number = 0;
  private _score: number = 0;

  constructor(name: string) {
    this._name = name;
  }

  public setName(name: string): void {
    this._name = name;
  }

  public getName(): string {
    return this._name;
  }

  public getPlayerHand(): Card[] {
    return this._hand;
  }

  public setNewHand(hand: Card[]): void {
    this._hand = hand;
  }

  public pushCardToHand(card: Card): void {
    this._hand.push(card);
  }
}
