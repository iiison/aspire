import React from 'react';
import Sidebar from './Sidebar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex md:h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-5 md:p-5 lg:p-14 overflow-y-auto bg-navy md:bg-transparent text-white md:text-black pb-20 md:pb-0">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
