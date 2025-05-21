import type { FC } from 'react';
import { PlusSolid } from '../components/icons';

const Dashboard: FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-10 text-black">
        <div>
          <p className="text-sm mb-4">Available balance</p>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
            <span className="text-white bg-active text-sm px-3 py-1 rounded">
              S$
            </span>
            <span>3,000</span>
          </h1>
        </div>
        <button className="bg-blue text-white px-3 py-2 rounded font-bold self-end flex items-center justify-center space-x-2">
          <PlusSolid className="h-4 w-4 fill-white" />
          <span>New card</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6">
        <button className="border-b-2 border-black pb-2 font-semibold">
          My debit cards
        </button>
        <button className="text-gray-500 pb-2">All company cards</button>
      </div>

      {/* Placeholder for Card + Actions + Recent Transactions */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl shadow p-6">
          {/* Card Carousel here */}
        </div>
        <div className="space-y-4">
          <div className="bg-[#F5F9FF] rounded-lg p-4">
            <p className="font-semibold mb-2">Card details</p>
            {/* Toggle dropdown or display placeholder */}
          </div>
          <div className="bg-[#F5F9FF] rounded-lg p-4">
            <p className="font-semibold mb-2">Recent transactions</p>
            {/* Transactions go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
