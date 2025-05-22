import { useState, type FC } from 'react';
import { getCards } from './data/getData';
import type { Card } from './types';
import { useAction } from '../../hooks';
import CardsCarousel from './CardCarousel';
import CardLoading from './CardLoading';
import { Bin, Freeze, Gpay, Meter, Undo } from '../../components/icons';
import { CardActions, type Action } from './CardActions';
import { Currency, Gauge, Snowflake, Trash2, Undo2 } from 'lucide-react';

const MyDebitCards: FC = () => {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [cardsList, cardsLoading, setCards] = useAction<Card[]>(getCards);

  const onCardChange = (index: number) => {
    setActiveCardIndex(index);
  };

  if (!cardsLoading && !Array.isArray(cardsList)) {
    return <p>Something went wrong</p>;
  }

  const actions: Action[] = [
    {
      label: 'Freeze card',
      icon: <Snowflake size="20" color="#fff" />,
      action: () => {
        if (!cardsList) {
          return;
        }

        const activeCard = cardsList[activeCardIndex];

        if (activeCard.isFrozen) {
          return;
        }

        setCards((prev) => {
          if (!prev) {
            return prev;
          }

          const clone = structuredClone(prev);

          clone[activeCardIndex].isFrozen = true;

          return clone;
        });
      },
    },
    {
      label: 'Set spend limit',
      icon: <Gauge size="20" color="#fff" />,
      action: () => {
        console.log('set Limit');
        console.log(cardsList?.[activeCardIndex]);
      },
    },
    {
      label: 'Add to GPay',
      icon: <Currency size="20" color="#fff" />,
      action: () => {
        console.log('Add to GPay');
        console.log(cardsList?.[activeCardIndex]);
      },
    },
    {
      label: 'Replace card',
      icon: <Undo2 size="20" color="#fff" />,
      action: () => {
        console.log('Replace card');
        console.log(cardsList?.[activeCardIndex]);
      },
    },
    {
      label: 'Cancel card',
      icon: <Trash2 size="20" color="#fff" />,
      action: () => {
        setCards((prev) => {
          if (!prev) {
            return prev;
          }

          const clone = structuredClone(prev);
          const activeCard = clone[activeCardIndex];

          setActiveCardIndex(0);

          return clone.filter((card) => card.id !== activeCard.id);
        });
      },
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-7">
        {cardsLoading ? (
          <CardLoading />
        ) : (
          <>
            <CardsCarousel
              cards={cardsList ?? []}
              onCardChange={onCardChange}
            />
            <div className="w-full flex justify-center">
              {Array.isArray(cardsList) && cardsList.length > 0 ? (
                <CardActions
                  actions={actions}
                  cards={cardsList}
                  activeCardIndex={activeCardIndex}
                  setCards={setCards}
                />
              ) : (
                <p>No Cards</p>
              )}
            </div>
          </>
        )}
      </div>
      <div className="space-y-4 col-span-3">
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
