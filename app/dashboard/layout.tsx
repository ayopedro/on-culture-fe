'use client';

import ProtectedPage from '@@/components/guard/protected';
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
    <ProtectedPage>
      <div className='h-screen'>
        <Navbar toggle={toggleSidebar} />
        <div
          className='md:grid md:grid-cols-12'
          style={{ height: 'calc(100vh - 88px)' }}
        >
          <Sidebar showSideBar={showSidebar} />
          <main
            className={`bg-bg-light-blue w-full p-5 ${
              showSidebar ? 'col-span-10' : 'col-span-11'
            } overflow-auto`}
          >
            {children}
          </main>
        </div>
      </div>
    </ProtectedPage>
  );
};

export default DashboardLayout;
