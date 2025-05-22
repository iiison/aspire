import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Pagination } from 'swiper/modules';
import { useCardContext } from '../../contexts/CardContext';
import CardPreview from './CardPreview';

type Props = {
  onCardChange: (index: number) => void;
};

const CardsCarousel: React.FC<Props> = ({ onCardChange }) => {
  const { cards } = useCardContext();

  return (
    <div className="w-full mb-8">
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => onCardChange(swiper.activeIndex)}
        className="w-full"
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id} className="!flex justify-center">
            <CardPreview {...card} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardsCarousel;
