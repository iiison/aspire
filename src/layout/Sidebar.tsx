import { useState } from 'react';
import {
  Home,
  Card,
  Payments,
  Credit,
  Account,
  Logo,
} from '../components/icons';
import MenuItem from './MenuItem';

// keeping path value to just `#` for now, ideally it should match
// with one of the routes defined via routing library(eg react-router-dom)
const menuItems = [
  { label: 'Home', icon: Home, path: '#' },
  { label: 'Cards', icon: Card, path: '#' },
  { label: 'Payments', icon: Payments, path: '#' },
  { label: 'Credit', icon: Credit, path: '#' },
  { label: 'Settings', icon: Account, path: '#' },
];

const Sidebar: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>('Cards');

  // This is a dummy function to activate menuItems
  const handleMenuClick =
    (label: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setActiveLink(label);
    };
  return (
    <aside className="w-full lg:w-80 bg-sidebar text-white lg:p-12 p-5 flex flex-row lg:flex-col justify-between lg:static fixed z-10 bottom-0 left-0">
      <div className="w-full">
        <div className="lg:flex flex-col hidden w-full">
          <a href="#" className="mb-5 flex w-full">
            <Logo className="w-[125px] h-[35px] fill-white" />
          </a>
          <p className="text-white/30 text-sm text-slate-300 mb-20 w-full">
            Trusted way of banking for 3,000+ SMEs and startups in Singapore
          </p>
        </div>
        <nav
          className="md:space-y-16 flex-row lg:flex-col w-full flex justify-between items-end lg:items-start"
          role="navigation"
          aria-label="Main sidebar"
        >
          {menuItems.map((item, index) => (
            <MenuItem
              key={`${item.label}-${index}`}
              label={item.label}
              Icon={item.icon}
              path={item.path}
              isActive={activeLink === item.label}
              onClick={handleMenuClick(item.label)}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
