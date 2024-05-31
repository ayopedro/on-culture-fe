'use client';

import ProtectedPage from '@@/components/guard/protected';
import Navbar from '@@/components/navbar';
import Sidebar from '@@/components/sidebar';
import { useEffect, useState } from 'react';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [mounted, setMounted] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  let innerWindowWidth: any;

  if (mounted) {
    innerWindowWidth = window.innerWidth;

    if (innerWindowWidth < 768 && showSidebar) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ProtectedPage>
      <div className='h-screen'>
        <Navbar toggle={toggleSidebar} />
        <div
          className='md:grid md:grid-cols-12'
          style={{ height: 'calc(100vh - 88px)' }}
        >
          <Sidebar showSideBar={showSidebar} onShow={setShowSidebar} />
          <main
            className={`bg-bg-light-blue w-full p-5 pt-20 ${
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
