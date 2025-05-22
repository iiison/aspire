import { render, screen, fireEvent } from '@testing-library/react';
import CardPreview from './CardPreview';
import type { Card } from './types';
import { vi } from 'vitest';

// Mock icons used in the component
vi.mock('../../components/icons', async () => {
  return {
    __esModule: true,
    LogoSm: () => <svg data-testid="logo-icon" />,
    Visa: () => <svg data-testid="visa-icon" />,
    Eye: () => <svg data-testid="eye-icon" />,
  };
});

const mockCard: Card = {
  id: 'card-1',
  cardHolder: {
    firstName: 'Alice',
    lastName: 'Wonder',
  },
  number: ['1234', '5678', '9012', '3456'],
  expiry: {
    month: 4,
    year: 2030,
  },
  cvv: 123,
  vendor: 'visa',
  isFrozen: false,
};

describe('CardPreview', () => {
  it('renders masked card number and hidden CVV initially', () => {
    render(<CardPreview {...mockCard} />);

    expect(screen.getByText('Alice Wonder')).toBeInTheDocument();
    expect(screen.getByText(/•••• •••• •••• 3456/)).toBeInTheDocument();
    expect(screen.getByText('CVV:')).toBeInTheDocument();
    expect(screen.getByText('* * *')).toBeInTheDocument();
    expect(screen.getByText('Thru: 04/30')).toBeInTheDocument();
    expect(screen.getByText('Show card number')).toBeInTheDocument();
  });

  it('reveals full card number and CVV when "Show card number" is clicked', () => {
    render(<CardPreview {...mockCard} />);
    const toggleButton = screen.getByText('Show card number');

    fireEvent.click(toggleButton);

    expect(screen.getByText('1234 5678 9012 3456')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('does not render "Show card number" button if card is frozen', () => {
    render(<CardPreview {...mockCard} isFrozen={true} />);

    expect(screen.queryByText('Show card number')).not.toBeInTheDocument();
    expect(screen.getByText('Frozen')).toBeInTheDocument();
  });

  it('renders vendor and logo icons', () => {
    render(<CardPreview {...mockCard} />);

    expect(screen.getByTestId('logo-icon')).toBeInTheDocument();
    expect(screen.getByTestId('visa-icon')).toBeInTheDocument();
    expect(screen.getByTestId('eye-icon')).toBeInTheDocument();
  });

  it('renders grayscale and semi-transparent when frozen', () => {
    const { container } = render(<CardPreview {...mockCard} isFrozen={true} />);
    const cardSection = container.querySelector('[role="region"]');
    expect(cardSection).toHaveClass('grayscale');
    expect(cardSection).toHaveClass('opacity-60');
  });
});
