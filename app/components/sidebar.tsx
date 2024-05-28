'use client';

import { SideBarLinks } from '@@/utils/side-bar-links';
import Link from 'next/link';

type Props = {
  showSideBar: boolean;
};

const Sidebar = ({ showSideBar }: Props) => {
  return (
    <aside className={`${showSideBar ? 'col-span-2' : 'col-span-1'} p-5`}>
      <ul className='flex flex-col gap-8'>
        {SideBarLinks.map((item) => {
          return (
            <li key={item.key}>
              <Link href={item.url} className='flex gap-4 items-center'>
                {item.icon} {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
