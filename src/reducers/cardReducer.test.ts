import type { Card } from '../features/cards/types';
import { cardReducer } from './cardReducer';

const sampleCard: Card = {
  id: '1',
  cardHolder: {
    firstName: 'John',
    lastName: 'Doe',
  },
  number: ['1234', '5678', '9012', '3456'],
  cvv: 123,
  expiry: {
    month: 12,
    year: 30,
  },
  vendor: 'visa',
  isFrozen: false,
};

describe('cardReducer', () => {
  it('should set cards', () => {
    const newState = cardReducer([], {
      type: 'SET_CARDS',
      payload: [sampleCard],
    });
    expect(newState).toEqual([sampleCard]);
  });

  it('should add a card', () => {
    const initialState: Card[] = [];
    const newState = cardReducer(initialState, {
      type: 'ADD_CARD',
      payload: sampleCard,
    });
    expect(newState).toEqual([sampleCard]);
  });

  it('should delete a card by id', () => {
    const initialState: Card[] = [sampleCard];
    const newState = cardReducer(initialState, {
      type: 'DELETE_CARD',
      payload: { id: '1' },
    });
    expect(newState).toEqual([]);
  });

  it('should toggle isFrozen flag on a card', () => {
    const initialState: Card[] = [sampleCard];
    const newState = cardReducer(initialState, {
      type: 'TOGGLE_FREEZE_CARD',
      payload: { id: '1' },
    });
    expect(newState[0].isFrozen).toBe(true);
  });

  it('should return current state for unknown action', () => {
    const initialState: Card[] = [sampleCard];
    // @ts-expect-error testing default case
    const newState = cardReducer(initialState, { type: 'UNKNOWN_ACTION' });
    expect(newState).toBe(initialState);
  });
});
