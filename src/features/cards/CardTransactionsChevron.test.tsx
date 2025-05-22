import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CardTransactionsChevron from './CardTransactionsChevron';
import type { Card, CardTransaction } from './types';
import { vi } from 'vitest';

// Mock components
vi.mock('../../components/CollapsiblePanel', () => ({
  CollapsiblePanel: ({ title, children }: any) => (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  ),
}));

vi.mock('./TransactionTypeIconMap', () => ({
  default: ({ type }: { type: string }) => (
    <div data-testid="type-icon">{type}</div>
  ),
}));

vi.mock('../../components/icons', () => ({
  TransactionsIcon: () => <svg data-testid="transactions-icon" />,
}));

// Mock getCardTransactions
vi.mock('./data/getData', () => ({
  getCardTransactions: vi.fn(),
}));

import { getCardTransactions } from './data/getData';

const mockCard: Card = {
  id: 'card-1',
  cardHolder: {
    firstName: 'Alice',
    lastName: 'Smith',
  },
  number: ['1234', '5678', '9012', '9999'],
  expiry: {
    month: 5,
    year: 2025,
  },
  cvv: 123,
  vendor: 'visa',
  isFrozen: false,
};

const mockTransactions: CardTransaction[] = [
  {
    id: 't1',
    vendor: { name: 'Amazon', type: 'Shopping' },
    amount: 250,
    currency: 'INR',
    date: '2024-05-15T10:00:00Z',
    type: 'debit',
    status: 'completed',
    card: {
      lastFour: '1423',
    },
  },
  {
    id: 't2',
    vendor: { name: 'Netflix', type: 'Entertainment' },
    amount: 500,
    currency: 'INR',
    date: '2024-05-14T10:00:00Z',
    type: 'debit',
    status: 'pending',
    card: {
      lastFour: '9999',
    },
  },
  {
    id: 't3',
    vendor: { name: 'Flipkart', type: 'Shopping' },
    amount: 300,
    currency: 'INR',
    date: '2024-05-13T10:00:00Z',
    type: 'credit',
    status: 'failed',
    card: {
      lastFour: '9999',
    },
  },
];

describe('CardTransactionsChevron', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('shows loading when data is not yet available', async () => {
    (getCardTransactions as any).mockReturnValue(new Promise(() => {}));

    render(<CardTransactionsChevron card={mockCard} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders 5 or fewer transactions initially and expands on click', async () => {
    const longList = Array.from({ length: 8 }, (_, i) => ({
      ...mockTransactions[0],
      id: `t${i + 1}`,
      vendor: { name: `Vendor ${i + 1}`, type: 'Shopping' },
    }));

    (getCardTransactions as any).mockResolvedValue(longList);

    render(<CardTransactionsChevron card={mockCard} />);

    await waitFor(() => {
      expect(screen.getByText('Vendor 1')).toBeInTheDocument();
    });

    // Only 5 transactions visible initially
    expect(screen.getAllByText(/Vendor \d+/)).toHaveLength(5);
    expect(screen.getByText('View all transactions')).toBeInTheDocument();

    fireEvent.click(screen.getByText('View all transactions'));

    // All 8 visible after toggle
    expect(screen.getAllByText(/Vendor \d+/)).toHaveLength(8);
    expect(screen.getByText('Show less transactions')).toBeInTheDocument();
  });

  it('formats and displays individual transaction info correctly', async () => {
    (getCardTransactions as any).mockResolvedValue(mockTransactions);

    render(<CardTransactionsChevron card={mockCard} />);
    await waitFor(() => {
      expect(screen.getByText('Amazon')).toBeInTheDocument();
    });

    expect(screen.getByText('-INR 250')).toBeInTheDocument();
    expect(screen.getByText('15 May 2024')).toBeInTheDocument();
    expect(screen.getByText('Charged to debit card')).toBeInTheDocument();

    expect(screen.getByText('Netflix')).toBeInTheDocument();
    expect(screen.getByText('Pending on debit card')).toBeInTheDocument();

    expect(screen.getByText('Flipkart')).toBeInTheDocument();
    expect(screen.getByText('+INR 300')).toBeInTheDocument();
    expect(screen.getByText('Refunded on debit card')).toBeInTheDocument();
  });
});
