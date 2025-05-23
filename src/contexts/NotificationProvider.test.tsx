import { render, screen, act, fireEvent } from '@testing-library/react';
import { NotificationProvider, useNotify } from './NotificationProvider';
import React from 'react';
import { vi } from 'vitest';

// Helper component to trigger notifications
const Trigger: React.FC = () => {
  const notify = useNotify();
  return <button onClick={() => notify('Test notification')}>Notify</button>;
};

const renderWithProvider = () => {
  return render(
    <NotificationProvider>
      <Trigger />
    </NotificationProvider>,
  );
};

describe('NotificationProvider', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('displays notification on notify call', () => {
    renderWithProvider();

    fireEvent.click(screen.getByText('Notify'));

    expect(screen.getByText('Test notification')).toBeInTheDocument();
  });

  it('automatically removes notification after timeout', () => {
    renderWithProvider();

    fireEvent.click(screen.getByText('Notify'));
    expect(screen.getByText('Test notification')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByText('Test notification')).not.toBeInTheDocument();
  });

  it('manually dismisses notification on close button click', () => {
    renderWithProvider();

    fireEvent.click(screen.getByText('Notify'));
    expect(screen.getByText('Test notification')).toBeInTheDocument();

    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    expect(screen.queryByText('Test notification')).not.toBeInTheDocument();
  });
});
