import type { FC } from 'react';
import Carousel from '../../components/Carousel';
import CardPreview from './CardPreview';
import type { Card } from './types';
import { useCardContext } from '../../contexts/CardContext';

type Props = {
  onCardChange: (index: number) => void;
};
const CardsCarousel: FC<Props> = ({ onCardChange }: Props) => {
  const { cards } = useCardContext();
  return (
    <div className="w-full mb-8">
      <Carousel onIndexChange={onCardChange}>
        {cards.map((card: Card) => (
          <CardPreview key={card.id} {...card} />
        ))}
      </Carousel>
    </div>
  );
};

export default CardsCarousel;
