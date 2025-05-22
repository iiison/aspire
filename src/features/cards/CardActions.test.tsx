import { render, screen } from '@testing-library/react';
import { CardActions, type Action } from './CardActions';
import userEvent from '@testing-library/user-event';
import type { Card } from './types';
import { Eye } from 'lucide-react';

describe('CardActions', () => {
  const mockCard: Card = {
    id: '1',
    cardHolder: { firstName: 'John', lastName: 'Doe' },
    number: ['1234', '5678', '9012', '3456'],
    expiry: { month: 12, year: 30 },
    cvv: 123,
    vendor: 'visa',
    isFrozen: false,
  };

  const mockActionFn = vi.fn();
  const actions: Action[] = [
    {
      label: 'Freeze',
      icon: <Eye data-testid="icon-freeze" />,
      action: mockActionFn,
    },
  ];

  it('renders nothing if cards is null', () => {
    const { container } = render(
      <CardActions actions={actions} cards={null} activeCardIndex={0} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders buttons for actions', () => {
    render(
      <CardActions actions={actions} cards={[mockCard]} activeCardIndex={0} />,
    );
    expect(screen.getByRole('button', { name: /freeze/i })).toBeInTheDocument();
    expect(screen.getByTestId('icon-freeze')).toBeInTheDocument();
  });

  it('triggers action when button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <CardActions actions={actions} cards={[mockCard]} activeCardIndex={0} />,
    );
    await user.click(screen.getByRole('button', { name: /freeze/i }));
    expect(mockActionFn).toHaveBeenCalledTimes(1);
  });
});
