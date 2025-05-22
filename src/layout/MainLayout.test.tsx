import { render, screen } from '@testing-library/react';
import MainLayout from './MainLayout';
import { vi } from 'vitest';

vi.mock('./Sidebar', () => ({
  __esModule: true,
  default: () => <div data-testid="sidebar-mock">Sidebar</div>,
}));

describe('MainLayout', () => {
  it('renders the Sidebar and children content', () => {
    render(
      <MainLayout>
        <div data-testid="main-content">Test Content</div>
      </MainLayout>,
    );

    expect(screen.getByTestId('sidebar-mock')).toBeInTheDocument();
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
