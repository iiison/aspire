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
    <aside className="w-80 bg-sidebar text-white p-12 flex flex-col justify-between">
      <div>
        <a href="#" className="mb-5 flex w-full">
          <Logo className="w-[125px] h-[35px] fill-white" />
        </a>
        <p className="text-white/30 text-sm text-slate-300 mb-20">
          Trusted way of banking for 3,000+ SMEs and startups in Singapore
        </p>
        <nav className="space-y-16" role="navigation" aria-label="Main sidebar">
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
