import { render, screen } from '@testing-library/react';
import type { Card } from '../features/cards/types';
import userEvent from '@testing-library/user-event';
import { CardProvider, useCardContext } from './CardContext';

const mockCard: Card = {
  id: 'test-card',
  cardHolder: {
    firstName: 'John',
    lastName: 'Doe',
  },
  number: ['1234', '5678', '9012', '3456'],
  expiry: {
    month: 12,
    year: 30,
  },
  cvv: 123,
  vendor: 'visa',
  isFrozen: false,
};

const Consumer = () => {
  const { cards, dispatch } = useCardContext();

  return (
    <div>
      <button onClick={() => dispatch({ type: 'ADD_CARD', payload: mockCard })}>
        Add Card
      </button>
      <div data-testid="card-count">{cards.length}</div>
    </div>
  );
};

describe('CardContext', () => {
  it('adds a card to context state', async () => {
    const user = userEvent.setup();
    render(
      <CardProvider>
        <Consumer />
      </CardProvider>,
    );

    const count = screen.getByTestId('card-count');
    expect(count.textContent).toBe('0');

    await user.click(screen.getByText('Add Card'));
    expect(count.textContent).toBe('1');
  });

  it('throws error if used outside CardProvider', () => {
    const BrokenConsumer = () => {
      return (
        <div>
          {/* This should throw because it's not within provider */}
          {useCardContext().cards.length}
        </div>
      );
    };

    expect(() => render(<BrokenConsumer />)).toThrow(
      'useCardContext must be used within a CardProvider',
    );
  });
});
