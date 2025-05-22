import { render, screen } from '@testing-library/react';
import CardDetailsChevron from './CardDetailsChevron';
import type { Card } from './types';
import { vi } from 'vitest';

vi.mock('../../components/CollapsiblePanel', () => ({
  __esModule: true,
  CollapsiblePanel: ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div data-testid="panel">
      <h2>{title}</h2>
      {children}
    </div>
  ),
}));

vi.mock('../../components/icons', async () => {
  return {
    __esModule: true,
    CardDtailIcon: () => <svg data-testid="card-detail-icon" />,
  };
});

describe('CardDetailsChevron', () => {
  const mockCard: Card = {
    id: 'card-1',
    cardHolder: {
      firstName: 'Alice',
      lastName: 'Wonder',
    },
    number: ['1234', '5678', '9012', '3456'],
    expiry: {
      month: 12,
      year: 30,
    },
    cvv: 321,
    vendor: 'visa',
    isFrozen: false,
  };

  it('renders card number and holder name', () => {
    render(<CardDetailsChevron card={mockCard} />);

    expect(screen.getByText(/Card Details/)).toBeInTheDocument();
    expect(screen.getByText(/Card Number:/)).toBeInTheDocument();
    expect(screen.getByText('1234 5678 9012 3456')).toBeInTheDocument();
    expect(screen.getByText(/Card Holder:/)).toBeInTheDocument();
    expect(screen.getByText('Alice Wonder')).toBeInTheDocument();
  });
});
