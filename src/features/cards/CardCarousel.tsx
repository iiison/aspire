import Carousel from '../../components/Carousel';
import CardPreview from './CardPreview';
import type { Card } from './types';

type Props = {
  cards: Card[];
  onCardChange: (index: number) => void;
};
const CardsCarousel = ({ cards, onCardChange }: Props) => {
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
