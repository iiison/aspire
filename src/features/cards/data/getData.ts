import cards from './dummyData.json';
import type { Card, CardNumber, CardVendor } from '../types';

export const getCards = async (): Promise<Card[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const allCards: Card[] = cards.cards.map((card) => {
    return {
      ...card,
      number: card.number as CardNumber,
      vendor: card.vendor.toLowerCase() as CardVendor,
    };
  });

  return allCards;
};
