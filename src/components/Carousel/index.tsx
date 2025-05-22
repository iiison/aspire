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
  onIndexChange?: (index: number) => void;
};

const Carousel: FC<Props> = ({
  children,
  className = '',
  initialIndex = 0,
  onIndexChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const isClickScrolling = useRef(false);

  // Scroll to index (programmatic)
  const scrollToIndex = useCallback((index: number) => {
    const el = containerRef.current;
    if (el && el.children[index]) {
      isClickScrolling.current = true;
      const target = el.children[index] as HTMLElement;
      el.scrollTo({
        left: target.offsetLeft - el.offsetLeft,
        behavior: 'smooth',
      });

      // Reset flag after scroll animation
      setTimeout(() => {
        isClickScrolling.current = false;
      }, 500);
    }
  }, []);

  useEffect(() => {
    // Initialize refs for each child slide
    slidesRef.current = Array(children.length)
      .fill(null)
      .map((_, i) => containerRef.current?.children[i] as HTMLElement);

    if (!containerRef.current) return;

    const observerOptions = {
      root: containerRef.current,
      threshold: 0.5, // 50% visible triggers intersection
    };

    let currentActive = initialIndex;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (isClickScrolling.current) return; // Ignore while programmatic scrolling

      entries.forEach((entry) => {
        const index = Array.from(containerRef.current!.children).indexOf(
          entry.target,
        );
        if (entry.isIntersecting) {
          // Pick the slide with largest intersection ratio
          if (entry.intersectionRatio > 0.5 && index !== currentActive) {
            currentActive = index;
            setActiveIndex(index);
            onIndexChange?.(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    slidesRef.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    // Scroll to initial index on mount
    scrollToIndex(initialIndex);

    return () => {
      observer.disconnect();
    };
  }, [children.length, initialIndex, onIndexChange, scrollToIndex]);

  // If initialIndex changes externally, update activeIndex and scroll
  useEffect(() => {
    setActiveIndex(initialIndex);
    scrollToIndex(initialIndex);
  }, [initialIndex, scrollToIndex]);

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
            key={idx}
            className="snap-center flex-shrink-0 w-full flex items-center justify-center"
            aria-hidden={idx !== activeIndex}
            aria-roledescription="slide"
            role="group"
            tabIndex={idx === activeIndex ? 0 : -1}
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
              activeIndex === i ? 'bg-active h-2 w-4' : 'bg-active/30 h-2 w-2',
            )}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={activeIndex === i}
            onClick={() => scrollToIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
