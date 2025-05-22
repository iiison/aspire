import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import MyDebitCards from './MyDebitCards';
import { useCardContext } from '../../contexts/CardContext';

// Mock subcomponents
vi.mock('./CardCarousel', () => ({
  default: ({ onCardChange }: any) => (
    <div>
      <button onClick={() => onCardChange(1)}>Switch Card</button>
    </div>
  ),
}));

vi.mock('./CardLoading', () => ({
  default: () => <div>Loading cards...</div>,
}));

vi.mock('./CardActions', () => ({
  CardActions: ({ actions }: any) => (
    <div>
      {actions.map((a: any) => (
        <button key={a.label} onClick={a.action}>
          {a.label}
        </button>
      ))}
    </div>
  ),
}));

vi.mock('./CardDetailsChevron', () => ({
  default: ({ card }: any) => <div>Details of {card.id}</div>,
}));

vi.mock('./CardTransactionsChevron', () => ({
  default: ({ card }: any) => <div>Transactions of {card.id}</div>,
}));

// Mock useCardContext
vi.mock('../../contexts/CardContext', () => ({
  useCardContext: vi.fn(),
}));

const mockCards = [
  {
    id: 'card-1',
    cardHolder: { firstName: 'Alice', lastName: 'Smith' },
    number: ['1234', '5678', '9012', '3456'],
    expiry: { month: 12, year: 2025 },
    cvv: 123,
    vendor: 'Visa',
    isFrozen: false,
  },
  {
    id: 'card-2',
    cardHolder: { firstName: 'Bob', lastName: 'Brown' },
    number: ['1111', '2222', '3333', '4444'],
    expiry: { month: 10, year: 2026 },
    cvv: 456,
    vendor: 'Mastercard',
    isFrozen: false,
  },
];

describe('MyDebitCards', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders error if cardsList is not an array', () => {
    (useCardContext as any).mockReturnValue({ cards: null, dispatch: vi.fn() });

    render(<MyDebitCards />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders loading state if card list is empty', () => {
    (useCardContext as any).mockReturnValue({ cards: [], dispatch: vi.fn() });

    render(<MyDebitCards />);
    expect(screen.getByText('Loading cards...')).toBeInTheDocument();
  });

  it('renders card components when cards exist', () => {
    (useCardContext as any).mockReturnValue({
      cards: mockCards,
      dispatch: vi.fn(),
    });

    render(<MyDebitCards />);
    expect(screen.getByText('Details of card-1')).toBeInTheDocument();
    expect(screen.getByText('Transactions of card-1')).toBeInTheDocument();
    expect(screen.getByText('Freeze card')).toBeInTheDocument();
    expect(screen.getByText('Cancel card')).toBeInTheDocument();
  });

  it('calls dispatch when freeze or cancel is clicked', () => {
    const dispatchMock = vi.fn();
    (useCardContext as any).mockReturnValue({
      cards: mockCards,
      dispatch: dispatchMock,
    });

    render(<MyDebitCards />);
    fireEvent.click(screen.getByText('Freeze card'));
    fireEvent.click(screen.getByText('Cancel card'));

    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'TOGGLE_FREEZE_CARD',
      payload: { id: 'card-1' },
    });
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'DELETE_CARD',
      payload: { id: 'card-1' },
    });
  });

  it('updates activeCardIndex when carousel changes card', () => {
    const dispatchMock = vi.fn();
    (useCardContext as any).mockReturnValue({
      cards: mockCards,
      dispatch: dispatchMock,
    });

    render(<MyDebitCards />);
    fireEvent.click(screen.getByText('Switch Card'));

    // Expect the second card (card-2) details and transactions now
    expect(screen.getByText('Details of card-2')).toBeInTheDocument();
    expect(screen.getByText('Transactions of card-2')).toBeInTheDocument();
  });
});
