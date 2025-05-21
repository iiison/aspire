import clsx from 'clsx';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from 'react';

type Props = {
  children: ReactNode[];
  initialIndex?: number;
  className?: string;
  gap?: string;
  onIndexChange?: (index: number) => void;
};

const Carousel: FC<Props> = ({
  children,
  className = '',
  initialIndex = 0,
  onIndexChange,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const scrollToIndex = (index: number) => {
    const el = containerRef.current;

    if (el && el.children[index]) {
      const target = el.children[index] as HTMLElement;

      el.scrollTo({
        left: target.offsetLeft - el.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  const onScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) {
      return;
    }
    const scrollLeft = el.scrollLeft;
    const childWidth = el.children[0].clientWidth || 1;
    const newIndex = Math.floor(scrollLeft / childWidth);
    setActiveIndex(newIndex);
    onIndexChange && onIndexChange(newIndex);
  }, []);

  useEffect(() => {
    const el = containerRef.current;

    if (!el) {
      return;
    }

    el.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      el.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    scrollToIndex(initialIndex);
  }, [initialIndex]);

  return (
    <div className={clsx('w-full', className)}>
      <div
        ref={containerRef}
        aria-roledescription="carousel"
        role="region"
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
      >
        {React.Children.map(children, (child, idx) => (
          <div
            className="snap-center flex-shrink-0 w-full items-center justify-center flex"
            aria-hidden={idx === activeIndex}
            aria-roledescription="slide"
            role="group"
          >
            {child}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center space-x-2 mt-4">
        {children.map((_, i) => (
          <button
            key={i}
            className={clsx(
              'rounded-full transition-all duration-300',
              activeIndex === i ? 'bg-active h-2 w-4' : 'bg-active/30 h-2 w-2 ',
            )}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => scrollToIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
