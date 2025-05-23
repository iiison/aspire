import { memo, useState, type FC } from 'react';
import clsx from 'clsx';
import type { Card } from './types';
import { LogoSm, Visa, Eye } from '../../components/icons';

const padWithZero = (number: number): string =>
  number < 10 ? `0${number}` : `${number}`;

const CardPreview: FC<Card> = ({
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
      {!isFrozen && (
        <button
          className="mb-4 font-bold bg-transparent text-active space-x-1 ml-auto text-xs flex items-center"
          onClick={handleButtonClick}
        >
          <Eye className="w-[16px] h-[16px] fill-active" />
          <span>Show card number</span>
        </button>
      )}
      <section
        role="region"
        aria-label={`${cardHolder.firstName}'s ${vendor} card`}
        className={clsx(
          'relative md:p-8 p-4 rounded-2xl shadow-md text-white transition-all duration-300',
          isFrozen ? 'opacity-60 grayscale' : 'opacity-100',
          'bg-active md:w-[415px] md:h-[260px] w-[320px] h-[200px]',
        )}
      >
        <div className="w-full flex mb-5">
          <LogoSm className="h-[20px] w-[66px] fill-white ml-auto scale-75 md:scale-100" />
        </div>
        <header className="flex md:mb-6 mb-3">
          <h2 className="md:text-2xl text-xl font-bold uppercase tracking-wider w-full">
            {cardHolder.firstName} {cardHolder.lastName}
          </h2>
        </header>

        <div className="flex justify-between items-center md:mb-4 mb-2">
          <div className="md:text-2xl text-xl font-bold tracking-wider">
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
          <Visa className="scale-75 md:scale-100 h-[24px] w-[84px] fill-white ml-auto translate-x-5" />
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
