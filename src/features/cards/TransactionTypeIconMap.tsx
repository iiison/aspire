import { HelpCircle, Plane, ScanBarcodeIcon } from 'lucide-react';
import type { FC } from 'react';

type Props = {
  type: string;
};

const TransactionTypeIconMap: FC<Props> = ({ type }) => {
  switch (type) {
    case 'travel':
      return (
        <div className="w-10 h-10 rounded-full bg-active/30 flex items-center justify-center text-pink-600">
          <Plane color="#01D167" fill="#01D167" size={18} />
        </div>
      );
    case 'retail':
      return (
        <div className="w-10 h-10 rounded-full bg-active/30 flex items-center justify-center text-pink-600">
          <ScanBarcodeIcon color="#01D167" fill="#01D167" size={18} />
        </div>
      );
    default:
      return (
        <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-pink-600">
          <HelpCircle color="white" size={18} />
        </div>
      );
  }
};

export default TransactionTypeIconMap;
