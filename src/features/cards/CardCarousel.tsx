import Carousel from '../../components/Carousel';
import CardPreview from './CardPreview';
import type { Card } from './types';

type Props = {
  cards: Card[];
  isLoading: boolean;
};
const CardsCarousel = ({ cards, isLoading }: Props) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full mb-8">
      <Carousel>
        {cards.map((card: Card) => (
          <CardPreview {...card} />
        ))}
      </Carousel>
    </div>
  );
};

export default CardsCarousel;
