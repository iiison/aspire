import { render, screen } from '@testing-library/react';
import type { Card } from './types';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import CardsCarousel from './CardCarousel';

// 1. Mock useCardContext
vi.mock('../../contexts/CardContext', () => ({
  useCardContext: () => ({
    cards: [
      {
        id: '1',
        cardHolder: { firstName: 'John', lastName: 'Doe' },
        number: ['1234', '5678', '9012', '3456'],
        expiry: { month: 12, year: 30 },
        cvv: 123,
        vendor: 'visa',
        isFrozen: false,
      },
      {
        id: '2',
        cardHolder: { firstName: 'Jane', lastName: 'Smith' },
        number: ['1111', '2222', '3333', '4444'],
        expiry: { month: 11, year: 29 },
        cvv: 456,
        vendor: 'Mastercard',
        isFrozen: false,
      },
    ] as Card[],
  }),
}));

vi.mock('./CardPreview', () => ({
  __esModule: true,
  default: ({ id }: { id: string }) => (
    <div data-testid="card-preview">{id}</div>
  ),
}));

vi.mock('../../components/Carousel', () => ({
  __esModule: true,
  default: ({ children, onIndexChange }: any) => (
    <div data-testid="carousel" onClick={() => onIndexChange(1)}>
      {children}
    </div>
  ),
}));

describe('CardsCarousel', () => {
  it('renders all CardPreview components', () => {
    const mockHandler = vi.fn();
    render(<CardsCarousel onCardChange={mockHandler} />);

    const previews = screen.getAllByTestId('card-preview');
    expect(previews).toHaveLength(2);
    expect(previews[0]).toHaveTextContent('1');
    expect(previews[1]).toHaveTextContent('2');
  });

  it('calls onCardChange when carousel triggers index change', async () => {
    const user = userEvent.setup();
    const mockHandler = vi.fn();
    render(<CardsCarousel onCardChange={mockHandler} />);

    // simulate clicking the carousel which calls onIndexChange(1)
    await user.click(screen.getByTestId('carousel'));
    expect(mockHandler).toHaveBeenCalledWith(1);
  });
});
