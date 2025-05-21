import { useState, type FC } from 'react';
import { getCards } from './data/getData';
import type { Card } from './types';
import { useAction } from '../../hooks';
import CardsCarousel from './CardCarousel';

const MyDebitCards: FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [cardsList, cardsLoading] = useAction<Card[]>(getCards);

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="border-gray-50">
        <CardsCarousel cards={cardsList} isLoading={cardsLoading} />
      </div>
      <div className="space-y-4">
        <div className="bg-[#F5F9FF] rounded-lg p-4">
          <p className="font-semibold mb-2">Card details</p>
          {/* Toggle dropdown or display placeholder */}
        </div>
        <div className="bg-[#F5F9FF] rounded-lg p-4">
          <p className="font-semibold mb-2">Recent transactions</p>
          {/* Transactions go here */}
        </div>
      </div>
    </div>
  );
};

export default MyDebitCards;
