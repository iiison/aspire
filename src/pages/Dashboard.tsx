import { useEffect, useState, type FC } from 'react';
import { PlusSolid } from '../components/icons';
import { CompanyCards, MyDebitCards } from '../features/cards';
import type { TabItem } from '../components/Tabs';
import Tabs from '../components/Tabs';
import { Modal } from '../components/Modal';
import AddCardForm from '../features/cards/AddCardForm';
import { CardProvider, useCardContext } from '../contexts/CardContext';
import { getCards } from '../features/cards/data/getData';
import type { Card } from '../features/cards/types';
import { useAction } from '../hooks';
import { useNotify } from '../contexts/NotificationProvider';

const DashboardInternal: FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [cardsList, cardsLoading] = useAction<Card[]>(getCards);
  const { dispatch, cards } = useCardContext();
  const notify = useNotify();

  useEffect(() => {
    if (!cardsLoading && cards.length === 0 && Array.isArray(cardsList)) {
      dispatch({
        type: 'SET_CARDS',
        payload: cardsList,
      });
    }
  }, [cardsList, cardsLoading]);

  const tabs: TabItem[] = [
    {
      id: 'my-debit-cards',
      label: 'My debit cards',
      Content: MyDebitCards,
    },
    {
      id: 'company-cards',
      label: 'All company cards',
      Content: CompanyCards,
    },
  ];
  const onFormSuccess = () => {
    setModalOpen(false);
    notify('Card added successfully!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-11 md:text-black text-white">
        <div>
          <p className="text-sm mb-4">Available balance</p>
          <h1 className="text-2xl font-bold text-white md:text-gray-900 flex items-center space-x-3">
            <span className="text-white bg-active text-sm px-3 py-1 rounded">
              S$
            </span>
            <span>3,000</span>
          </h1>
        </div>
        <button
          className="md:bg-action text-active-secondary md:text-white px-3 py-2 rounded font-bold self-end flex items-center justify-center space-x-2"
          onClick={() => setModalOpen(true)}
        >
          <PlusSolid className="h-4 w-4 md:fill-white fill-active-secondary" />
          <span>New card</span>
        </button>
        <Modal
          isOpen={isModalOpen}
          title="Add new card"
          onClose={() => {
            setModalOpen(false);
          }}
        >
          <AddCardForm onFormSuccess={onFormSuccess} />
        </Modal>
      </div>

      <Tabs tabs={tabs} label="Dashboard" />
    </div>
  );
};

const Dashboard: FC = () => {
  return (
    <CardProvider>
      <DashboardInternal />
    </CardProvider>
  );
};

export default Dashboard;
