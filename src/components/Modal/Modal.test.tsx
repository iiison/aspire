import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './index';

describe('Modal', () => {
  const title = 'Test Modal';
  const content = 'This is the modal content';
  const footer = <button>Confirm</button>;
  const setup = (props = {}) => {
    const onClose = vi.fn();
    render(
      <Modal isOpen title={title} onClose={onClose} footer={footer} {...props}>
        {content}
      </Modal>,
    );
    return { onClose };
  };

  test('renders when isOpen is true', () => {
    setup();

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  test('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title={title}>
        {content}
      </Modal>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText(content)).not.toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const { onClose } = setup();

    // const closeButton = screen.getByRole('button');
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    // fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when Escape key is pressed', () => {
    const { onClose } = setup();

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('renders footer when provided', () => {
    setup();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });
});
