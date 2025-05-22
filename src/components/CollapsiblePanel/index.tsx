import { type FC, useState, type ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

type CollapsiblePanelProps = {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
};

export const CollapsiblePanel: FC<CollapsiblePanelProps> = ({
  title,
  icon,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="bg-muted rounded-xl shadow-smallShadow overflow-hidden">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between p-4 focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={`panel-${title}`}
      >
        <div className="flex items-center gap-2 text-navy font-medium text-sm">
          {icon && <span className="text-[#2B5CD1]">{icon}</span>}
          {title}
        </div>
        {isOpen ? (
          <ChevronUp className="text-[#9CA3AF]" />
        ) : (
          <ChevronDown className="text-[#9CA3AF]" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            id={`panel-${title}`}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: 'auto', opacity: 1 },
              collapsed: { height: 0, opacity: 0 },
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={clsx('px-4 overflow-hidden')}
          >
            <div className="py-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
