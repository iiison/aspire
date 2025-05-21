import { memo, useState, type FC } from 'react';
import clsx from 'clsx';
import type { Card } from './types';
import { LogoSm, Visa } from '../../components/icons';
import { Eye } from 'lucide-react';

type CardStatus = 'active' | 'frozen';

const padWithZero = (number: number): string =>
  number < 10 ? `0${number}` : `${number}`;

const CardPreview: FC<Card> = ({
  id,
  cvv,
  number,
  expiry,
  vendor,
  isFrozen,
  cardHolder,
}) => {
  const [showCardNumber, setShowNumber] = useState(false);
  const handleButtonClick = () => {
    setShowNumber((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      <button
        className="mb-4 font-bold bg-transparent text-active space-x-1 ml-auto text-xs flex items-center"
        onClick={handleButtonClick}
      >
        <Eye className="fill-active w-[16px] h-[16px]" />
        <span>Show card number</span>
      </button>
      <section
        role="region"
        aria-label={`${cardHolder.firstName}'s ${vendor} card`}
        className={clsx(
          'relative p-8 rounded-2xl shadow-md text-white transition-all duration-300',
          isFrozen ? 'opacity-60 grayscale' : 'opacity-100',
          'bg-active w-[415px] h-[250px]',
        )}
      >
        <div className="w-full flex mb-5">
          <LogoSm className="h-[20px] w-[66px] fill-white ml-auto" />
        </div>
        <header className="flex mb-6">
          <h2 className="text-2xl font-bold uppercase tracking-wider w-full">
            {cardHolder.firstName} {cardHolder.lastName}
          </h2>
        </header>

        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold tracking-wider">
            {showCardNumber ? number.join(' ') : `•••• •••• •••• ${number[3]}`}
          </div>
        </div>

        <footer className="flex font-bold items-center text-sm">
          <div className="tracking-wide mr-9">
            Thru: {padWithZero(expiry.month)}/{`${expiry.year}`.slice(-2)}
          </div>
          <div className="tracking-wide flex items-center ">
            <span className="flex-none">CVV:</span>{' '}
            <span
              className={clsx(
                'leading-none ml-3 flex-none',
                showCardNumber ? 'text-xl' : 'text-2xl',
              )}
            >
              {showCardNumber ? cvv : `* * *`}
            </span>
          </div>
        </footer>
        <div className="w-full flex">
          <Visa className="h-[24px] w-[84px] fill-white ml-auto translate-x-5" />
        </div>

        {isFrozen && (
          <div className="absolute inset-0 bg-black bg-opacity-10 rounded-2xl backdrop-blur-sm pointer-events-none">
            <span className="absolute top-2 right-2 text-xs font-semibold text-white bg-red-600 px-2 py-0.5 rounded">
              Frozen
            </span>
          </div>
        )}
      </section>
    </div>
  );
};

export default memo(CardPreview);
