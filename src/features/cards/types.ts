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
