import type { FC } from 'react';
import type { Card } from './types';
import { CollapsiblePanel } from '../../components/CollapsiblePanel';
import { CardDtailIcon } from '../../components/icons';

type Props = {
  card: Card;
};
const CardDetailsChevron: FC<Props> = ({ card }: Props) => {
  const icon = <CardDtailIcon className="w-6 h-6" />;

  return (
    <CollapsiblePanel title="Card Details" icon={icon}>
      <div className="w-full bg-white p-6">
        <p>
          <span>Card Number: </span>
          <span>{card.number.join(' ')}</span>
        </p>
        <p>
          <span>Card Holder: </span>
          <span>
            {card.cardHolder.firstName} {card.cardHolder.lastName}
          </span>
        </p>
      </div>
    </CollapsiblePanel>
  );
};

export default CardDetailsChevron;
