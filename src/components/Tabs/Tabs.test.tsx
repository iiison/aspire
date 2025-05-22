import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Tabs, { type TabItem } from './index';

const TabContent1 = () => <div>Content 1</div>;
const TabContent2 = () => <div>Content 2</div>;

const tabs: TabItem[] = [
  { id: 'tab1', label: 'Tab 1', Content: TabContent1 },
  { id: 'tab2', label: 'Tab 2', Content: TabContent2 },
];

describe('Tabs component', () => {
  it('renders all tab buttons with labels', () => {
    render(<Tabs tabs={tabs} label="Example" />);
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
  });

  it('activates the first tab by default and shows its content', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('activates the tab from activeId prop initially', () => {
    render(<Tabs tabs={tabs} activeId="tab2" />);
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('activates a tab on click and calls onTabChange', () => {
    const onTabChange = vi.fn();
    render(<Tabs tabs={tabs} onTabChange={onTabChange} />);

    const tab2Btn = screen.getByRole('tab', { name: 'Tab 2' });
    fireEvent.click(tab2Btn);

    expect(tab2Btn).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Content 2')).toBeInTheDocument();

    // onTabChange should be called with the previous active tab id (your code calls with activeTabId)
    expect(onTabChange).toHaveBeenCalledWith('tab1');
  });

  it('renders with a custom activeId and shows correct content', () => {
    render(<Tabs tabs={tabs} activeId="tab2" />);

    const activeTab = screen.getByRole('tab', { name: 'Tab 2' });
    expect(activeTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Content 2')).toBeInTheDocument();

    const inactiveTab = screen.getByRole('tab', { name: 'Tab 1' });
    expect(inactiveTab).toHaveAttribute('aria-selected', 'false');
  });

  it('throws error when tabs prop is empty or not array', () => {
    // @ts-expect-error intentional to test error
    expect(() => render(<Tabs tabs={[]} />)).toThrow('Please pass tabs');

    // @ts-expect-error intentional to test error
    expect(() => render(<Tabs tabs={null} />)).toThrow('Please pass tabs');
  });
});
