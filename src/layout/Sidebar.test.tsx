import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from './Sidebar';
import { vi } from 'vitest';

// Mock the icons to simplify testing
vi.mock('../components/icons', () => ({
  Home: () => <svg data-testid="icon-home" />,
  Card: () => <svg data-testid="icon-card" />,
  Payments: () => <svg data-testid="icon-payments" />,
  Credit: () => <svg data-testid="icon-credit" />,
  Account: () => <svg data-testid="icon-account" />,
  Logo: () => <svg data-testid="logo" />,
}));

// Mock MenuItem component
vi.mock('./MenuItem', () => ({
  default: ({ label, isActive, onClick }: any) => (
    <a
      href="#"
      data-testid={`menu-${label}`}
      data-active={isActive}
      onClick={onClick}
    >
      {label}
    </a>
  ),
}));

describe('Sidebar', () => {
  it('renders logo and menu items', () => {
    render(<Sidebar />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Cards')).toBeInTheDocument();
    expect(screen.getByText('Payments')).toBeInTheDocument();
    expect(screen.getByText('Credit')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('sets "Cards" as the default active link', () => {
    render(<Sidebar />);
    expect(screen.getByTestId('menu-Cards')).toHaveAttribute(
      'data-active',
      'true',
    );
    expect(screen.getByTestId('menu-Home')).toHaveAttribute(
      'data-active',
      'false',
    );
  });

  it('changes active link when another item is clicked', () => {
    render(<Sidebar />);

    const homeLink = screen.getByTestId('menu-Home');
    expect(homeLink).toHaveAttribute('data-active', 'false');

    fireEvent.click(homeLink);

    expect(homeLink).toHaveAttribute('data-active', 'true');
    expect(screen.getByTestId('menu-Cards')).toHaveAttribute(
      'data-active',
      'false',
    );
  });
});
