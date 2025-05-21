import type { FC } from 'react';

const MyDebitCards: FC = () => {
  return (
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
  );
};

export default MyDebitCards;
