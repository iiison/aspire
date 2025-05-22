import { useState, type FC } from 'react';
import type { Card, CardTransaction } from './types';
import { useAction } from '../../hooks';
import { getCardTransactions } from './data/getData';
import { CollapsiblePanel } from '../../components/CollapsiblePanel';
import TransactionTypeIconMap from './TransactionTypeIconMap';
import clsx from 'clsx';
import { CreditCard } from 'lucide-react';
import { TransactionsIcon } from '../../components/icons';

type Props = {
  card: Card;
};

const getDateString = (dateString: string) => {
  const date = new Date(dateString);
  const formatted = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return formatted.replace(/ /g, ' ');
};

const getTransactionStatus = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Charged to debit card';
    case 'failed':
      return 'Refunded on debit card';
    default:
      return 'Pending on debit card';
  }
};

export const Transaction = ({
  transaction,
}: {
  transaction: CardTransaction;
}) => (
  <div className="flex items-start gap-3 border-b-muted py-2 border border-transparent text-black">
    <TransactionTypeIconMap type={transaction.vendor.type.toLowerCase()} />
    <div className="flex-1">
      <div className="flex justify-between">
        <span className="font-bold text-sm text-black">
          {transaction.vendor.name}
        </span>
        <span
          className={clsx(
            transaction.type === 'credit' ? 'text-active' : '',
            'font-bold text-sm',
          )}
        >
          {transaction.type === 'debit'
            ? `-${transaction.currency} `
            : `+${transaction.currency} `}
          {transaction.amount}
        </span>
      </div>
      <div className="text-xs text-disabled mb-2 mt-1">
        {getDateString(transaction.date)}
      </div>
      <div className="text-sm text-action mt-1 flex items-center gap-1">
        <span className="bg-action text-white rounded-full px-2 py-[3px] text-xs">
          <CreditCard size={12} />
        </span>
        {getTransactionStatus(transaction.status)}
      </div>
    </div>
  </div>
);

const CardTransactionsChevron: FC<Props> = ({ card }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const [data, loading] = useAction<CardTransaction[]>(() =>
    getCardTransactions(card.number[3]),
  );

  if (loading && !data) {
    return <p>Loading...</p>;
  }

  const toggleShowAll = () => setShowAll((prev) => !prev);
  const icon = <TransactionsIcon className="w-6 h-6" />;

  return (
    <CollapsiblePanel
      title="Recent transactions"
      defaultOpen={true}
      icon={icon}
    >
      <>
        <div className="w-full bg-white p-6">
          {data
            ?.slice(0, showAll ? data.length : 5)
            ?.map((transaction) => (
              <Transaction key={transaction.id} transaction={transaction} />
            ))}
        </div>
        <button
          className="border-0 bg-active/30 text-active text-center w-full text-sm font-semibold p-2"
          onClick={toggleShowAll}
        >
          {showAll ? 'Show less transactions' : 'View all transactions'}
        </button>
      </>
    </CollapsiblePanel>
  );
};

export default CardTransactionsChevron;
