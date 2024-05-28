'use client';

import Navbar from '@@/components/navbar';
import Sidebar from '@@/components/sidebar';
import { useState } from 'react';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className='h-screen'>
      <Navbar toggle={toggleSidebar} />
      <div className='h-full grid grid-cols-12'>
        <Sidebar showSideBar={showSidebar} />
        <main
          className={`bg-bg-light-blue w-full ${
            showSidebar ? 'col-span-10' : 'col-span-11'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
