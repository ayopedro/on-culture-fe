'use client';

import { SideBarLinks } from '@@/components/side-bar-links';
import Logout from '@@/components/icons/logout';
import Gear from '@@/components/icons/gear';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@@/services/redux/hooks';
import { logoutUser } from '@@/services/redux/slices/auth.slice';
import { persistor } from '@@/services/redux/store';
import toast from 'react-hot-toast';

type Props = {
  showSideBar: boolean;
};

const Sidebar = ({ showSideBar }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    sessionStorage.clear();
    persistor.purge();
    router.push('/');
    toast.success('Logout Successful!');
  };

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
          <Gear /> {showSideBar && 'Settings'}
        </li>
        <li
          className='flex gap-4 items-center cursor-pointer'
          onClick={handleLogout}
        >
          <Logout /> {showSideBar && 'Log Out'}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
