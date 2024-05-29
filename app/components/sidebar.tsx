'use client';

import { SideBarLinks } from '@@/components/side-bar-links';
import Logout from '@@/components/icons/logout';
import Gear from '@@/components/icons/gear';
import Link from 'next/link';

type Props = {
  showSideBar: boolean;
};

const Sidebar = ({ showSideBar }: Props) => {
  return (
    <aside
      className={`${
        showSideBar ? 'col-span-2' : 'col-span-1'
      } p-5 flex flex-col justify-between`}
    >
      <ul
        className={`flex flex-col ${
          showSideBar ? 'items-start gap-8' : 'items-center gap-12'
        }`}
      >
        {SideBarLinks.map((item) => {
          return (
            <li key={item.key}>
              <Link href={item.url} className='flex gap-4 items-center'>
                {item.icon} {showSideBar && item.title}
              </Link>
            </li>
          );
        })}
      </ul>
      <ul
        className={`flex flex-col ${
          showSideBar ? 'items-start gap-8' : 'items-center gap-12'
        } mb-10`}
      >
        <li className='flex gap-4 items-center cursor-pointer'>
          <Gear /> Settings
        </li>
        <li className='flex gap-4 items-center cursor-pointer'>
          <Logout /> Log Out
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
