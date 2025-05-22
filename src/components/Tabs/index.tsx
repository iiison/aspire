import clsx from 'clsx';
import { useState, type FC } from 'react';

export type TabItem = {
  id: string;
  label: string;
  Content: FC;
};

type Props = {
  tabs: TabItem[];
  label?: string;
  activeId?: TabItem['id'];
  onTabChange?: (id: TabItem['id']) => void;
};

const Tabs: FC<Props> = ({ tabs, activeId, label = '', onTabChange }) => {
  if (!Array.isArray(tabs) || tabs.length === 0) {
    throw new Error('Please pass tabs');
  }

  const [activeTabId, setActiveTabId] = useState<TabItem['id']>(
    activeId || tabs[0].id,
  );

  const handleTabClick = (id: TabItem['id']) => () => {
    setActiveTabId(id);

    if (onTabChange) {
      onTabChange(activeTabId);
    }
  };

  const activeTab = tabs.find((tab) => tab.id === activeTabId)!;
  const { Content } = activeTab;

  return (
    <div>
      <div
        role="tablist"
        aria-label={`${label} Tabs`}
        className="flex space-x-4 mb-5"
      >
        {tabs.map((tab) => {
          const isActive = activeTabId === tab.id;
          const inActiveTabClasses = 'md:text-black/30 text-white/30';
          const activeTabClasses =
            'font-bold md:text-black/100 text-white/100 border-b-active-secondary';

          return (
            <button
              onClick={handleTabClick(tab.id)}
              key={tab.id}
              role="tab"
              className={clsx(
                'text-sm border-2 border-transparent pb-2 ',
                isActive ? activeTabClasses : inActiveTabClasses,
              )}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {activeTab != null ? (
        <div className="bg-navy md:bg-white rounded-lg shadow-tabShadow px-0 py-5 md:px-10 md:py-8">
          <Content />
        </div>
      ) : null}
    </div>
  );
};

export default Tabs;
