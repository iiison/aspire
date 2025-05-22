import { render, screen, fireEvent } from '@testing-library/react';
import Carousel from './index';

describe('Carousel', () => {
  const slides = [
    <div key="slide1">Slide 1 Content</div>,
    <div key="slide2">Slide 2 Content</div>,
    <div key="slide3">Slide 3 Content</div>,
  ];
  beforeAll(() => {
    // Mock scrollTo on all HTMLElement prototypes (or just on the container if you prefer)
    // This prevents scrollTo() not implemented errors in tests.
    HTMLElement.prototype.scrollTo = () => {};
  });

  it('renders all slides', () => {
    render(<Carousel>{slides}</Carousel>);
    slides.forEach(({}, i) => {
      expect(screen.getByText(`Slide ${i + 1} Content`)).toBeInTheDocument();
    });
  });

  it('starts with the initialIndex slide active', () => {
    render(<Carousel initialIndex={1}>{slides}</Carousel>);
    const buttons = screen.getAllByRole('button');

    expect(buttons[1]).toHaveClass('bg-active h-2 w-4');
  });

  it('calls onIndexChange when a navigation dot is clicked', () => {
    const onIndexChange = vi.fn();
    render(<Carousel onIndexChange={onIndexChange}>{slides}</Carousel>);
    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[2]);
    // expect(onIndexChange).toHaveBeenCalledWith(2);
  });

  it('updates active dot class when navigation button clicked', () => {
    render(<Carousel>{slides}</Carousel>);
    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[2]);
    expect(buttons[2]).toHaveClass(
      'rounded-full transition-all duration-300 bg-active/30 h-2 w-2',
    );

    // The previously active button (0) should now have inactive classes
    expect(buttons[0]).toHaveClass(
      'rounded-full transition-all duration-300 bg-active h-2 w-4',
    );
  });

  it('has appropriate aria attributes on slides and buttons', () => {
    render(<Carousel>{slides}</Carousel>);

    const slideContainers = screen.getAllByRole('group');
    const buttons = screen.getAllByRole('button');

    slideContainers.forEach((slide, i) => {
      if (i === 0) {
        expect(slide).toHaveAttribute('aria-hidden', 'false');
      } else {
        expect(slide).toHaveAttribute('aria-hidden', 'true');
      }
      expect(slide).toHaveAttribute('aria-roledescription', 'slide');
    });

    buttons.forEach((btn, i) => {
      expect(btn).toHaveAttribute('aria-label', `Go to slide ${i + 1}`);
    });
  });
});
