import React from 'react';
import Sidebar from './Sidebar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-14 overflow-y-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
