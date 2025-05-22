import { render, screen, fireEvent } from '@testing-library/react';
import MenuItem from './MenuItem';
import type { FC, SVGProps } from 'react';
import { vi } from 'vitest';

// Dummy icon component
const DummyIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg data-testid="dummy-icon" {...props} />
);

describe('MenuItem', () => {
  const defaultProps = {
    label: 'Cards',
    Icon: DummyIcon,
    path: '#',
    onClick: vi.fn(),
  };

  it('renders the label and icon correctly', () => {
    render(<MenuItem {...defaultProps} isActive={false} />);
    expect(screen.getByText('Cards')).toBeInTheDocument();
    expect(screen.getByTestId('dummy-icon')).toBeInTheDocument();
  });

  it('applies active styles when isActive is true', () => {
    render(<MenuItem {...defaultProps} isActive={true} />);
    const anchor = screen.getByRole('link');
    expect(anchor).toHaveClass('text-active');
    expect(anchor).toHaveClass('fill-active');
    expect(anchor).toHaveClass('font-bold');
  });

  it('applies inactive styles when isActive is false', () => {
    render(<MenuItem {...defaultProps} isActive={false} />);
    const anchor = screen.getByRole('link');
    expect(anchor).toHaveClass('text-white');
    expect(anchor).toHaveClass('fill-white');
    expect(anchor).not.toHaveClass('font-bold');
  });

  it('calls onClick when clicked', () => {
    const onClickMock = vi.fn();
    render(
      <MenuItem {...defaultProps} onClick={onClickMock} isActive={false} />,
    );
    fireEvent.click(screen.getByRole('link'));
    expect(onClickMock).toHaveBeenCalled();
  });
});
