import type { Card } from '../features/cards/types';

export type CardAction =
  | { type: 'ADD_CARD'; payload: Card }
  | { type: 'DELETE_CARD'; payload: { id: string } }
  | { type: 'TOGGLE_FREEZE_CARD'; payload: { id: string } }
  | { type: 'SET_CARDS'; payload: Card[] };

export function cardReducer(state: Card[], action: CardAction): Card[] {
  switch (action.type) {
    case 'SET_CARDS':
      return [...action.payload];
    case 'ADD_CARD':
      return [...state, action.payload];
    case 'DELETE_CARD':
      return state.filter((card) => card.id !== action.payload.id);
    case 'TOGGLE_FREEZE_CARD':
      return state.map((card) =>
        card.id === action.payload.id
          ? { ...card, isFrozen: !card.isFrozen }
          : card,
      );
    default:
      return state;
  }
}
