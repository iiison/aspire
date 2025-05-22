import { Currency } from 'lucide-react';

export type CardNumber = [string, string, string, string];
export const CARD_VENDORS = {
  VISA: 'visa',
  MASTERCARD: 'mastercard',
  AMEX: 'amex',
  DISCOVER: 'discover',
  RUPAY: 'rupay',
} as const;

export type CardVendor = (typeof CARD_VENDORS)[keyof typeof CARD_VENDORS];

export type Card = {
  id: string;
  cardHolder: {
    firstName: string;
    lastName: string;
  };
  number: CardNumber;
  expiry: {
    month: number;
    year: number;
  };
  cvv: number;
  vendor: CardVendor;
  isFrozen: boolean;
};

const TRANSACTION_TYPE = {
  DEBIT: 'debit',
  CREDIT: 'credit',
} as const;
export type TransactionType =
  (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];
export type CardTransaction = {
  id: string;
  date: string;
  card: {
    lastFour: string | number;
  };
  vendor: {
    name: string;
    type: string;
  };
  status: string;
  amount: number;
  type: 'debit' | 'credit';
  currency: string;
};
