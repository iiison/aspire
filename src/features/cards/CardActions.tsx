import type { FC } from 'react';
import type { Card } from './types';

export type Action = {
  label: string;
  icon: React.ReactNode;
  action: () => void;
};

type CardActionsProps = {
  actions: Action[];
  cards: Card[] | null;
  activeCardIndex: number;
};

export const CardActions: FC<CardActionsProps> = ({ cards, actions }) => {
  if (!cards) {
    return null;
  }

  return (
    <div className="bg-action-secondary rounded-2xl p-3 flex flex-wrap gap-3 text-navy text-sm">
      {actions.map(({ label, icon, action }) => (
        <button
          key={label}
          onClick={action}
          className="flex flex-col items-center text-xs focus:outline-none focus-visible:ring-2 rounded-md"
          aria-label={label}
        >
          <div className="rounded-full flex items-center justify-center mb-2 bg-action w-8 h-8">
            {icon}
          </div>
          <span className="">{label}</span>
        </button>
      ))}
    </div>
  );
};
