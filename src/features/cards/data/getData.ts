import cards from './dummyData.json';
import transactions from './transactions.json';

import type {
  Card,
  CardNumber,
  CardTransaction,
  CardVendor,
  TransactionType,
} from '../types';

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

export const getCardTransactions = async (
  cardNumber: string,
): Promise<CardTransaction[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const cardNum = Number(cardNumber);

  return transactions
    .filter((t) => t.card.lastFour === cardNum)
    .map((t) => ({
      ...t,
      type: t.type as TransactionType,
    }));
};
