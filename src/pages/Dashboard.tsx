import type { FC } from 'react';
import { PlusSolid } from '../components/icons';
import { CompanyCards, MyDebitCards } from '../features/cards';
import type { TabItem } from '../components/Tabs';
import Tabs from '../components/Tabs';

const Dashboard: FC = () => {
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

  return (
    <div>
      <div className="flex justify-between items-center mb-11 text-black">
        <div>
          <p className="text-sm mb-4">Available balance</p>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
            <span className="text-white bg-active text-sm px-3 py-1 rounded">
              S$
            </span>
            <span>3,000</span>
          </h1>
        </div>
        <button className="bg-action text-white px-3 py-2 rounded font-bold self-end flex items-center justify-center space-x-2">
          <PlusSolid className="h-4 w-4 fill-white" />
          <span>New card</span>
        </button>
      </div>

      <Tabs tabs={tabs} label="Dashboard" />
    </div>
  );
};

export default Dashboard;
