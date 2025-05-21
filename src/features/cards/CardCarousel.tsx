import Carousel from '../../components/Carousel';
import CardPreview from './CardPreview';
import type { Card } from './types';

type Props = {
  cards: Card[];
  isLoading: boolean;
  onCardChange: (index: number) => void;
};
const CardsCarousel = ({ cards, isLoading, onCardChange }: Props) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full mb-8">
      <Carousel onIndexChange={onCardChange}>
        {cards.map((card: Card) => (
          <CardPreview {...card} />
        ))}
      </Carousel>
    </div>
  );
};

export default CardsCarousel;
