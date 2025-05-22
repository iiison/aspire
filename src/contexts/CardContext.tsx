import { createContext, useContext, useReducer } from 'react';
import type { Card } from '../features/cards/types';
import { cardReducer, type CardAction } from '../reducers/cardReducer';

type CardContextType = {
  cards: Card[];
  dispatch: React.Dispatch<CardAction>;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [cards, dispatch] = useReducer(cardReducer, []);

  return (
    <CardContext.Provider value={{ cards, dispatch }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCardContext must be used within a CardProvider');
  }
  return context;
};
