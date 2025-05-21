import React from 'react';
import clsx from 'clsx';

type CardStatus = 'active' | 'frozen';

export interface CardPreviewProps {
  cardHolderName: string;
  lastFourDigits: string;
  expiry: string;
  cardType: 'visa' | 'mastercard';
  status?: CardStatus;
  className?: string;
}

const CardPreview: React.FC<CardPreviewProps> = ({
  cardHolderName,
  lastFourDigits,
  expiry,
  cardType,
  status = 'active',
  className,
}) => {
  const isFrozen = status === 'frozen';

  return (
    <section
      role="region"
      aria-label={`${cardHolderName}'s ${cardType} card`}
      className={clsx(
        'relative w-[300px] h-[180px] p-4 rounded-2xl shadow-md text-white transition-all duration-300',
        isFrozen ? 'opacity-60 grayscale' : 'opacity-100',
        'bg-gradient-to-br from-green-600 to-emerald-400',
        className,
      )}
    >
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider">
          Debit Card
        </h2>
        <img
          src={`/assets/${cardType}.svg`}
          alt={`${cardType} logo`}
          className="w-10 h-auto"
        />
      </header>

      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold tracking-wider">
          •••• •••• •••• {lastFourDigits}
        </div>
      </div>

      <footer className="flex justify-between items-end text-xs font-medium">
        <div>
          <div className="uppercase tracking-wide opacity-70">Card Holder</div>
          <div>{cardHolderName}</div>
        </div>
        <div>
          <div className="uppercase tracking-wide opacity-70">Expires</div>
          <div>{expiry}</div>
        </div>
      </footer>

      {isFrozen && (
        <div className="absolute inset-0 bg-black bg-opacity-10 rounded-2xl backdrop-blur-sm pointer-events-none">
          <span className="absolute top-2 right-2 text-xs font-semibold text-white bg-red-600 px-2 py-0.5 rounded">
            Frozen
          </span>
        </div>
      )}
    </section>
  );
};

export default React.memo(CardPreview);
