'use client';

import Bell from '@@/components/icons/bell';
import Image from 'next/image';
import Link from 'next/link';
import { IoMdMenu } from 'react-icons/io';
import { RxCaretDown } from 'react-icons/rx';

type Props = {
  toggle: () => void;
};

const Navbar = ({ toggle }: Props) => {
  return (
    <nav className='h-16 md:h-[88] flex justify-between md:grid md:grid-cols-12 fixed md:sticky z-50 top-0 right-0 left-0 bg-white'>
      <div className='flex gap-3 items-center col-span-2 p-5'>
        <button onClick={toggle}>
          <IoMdMenu className='text-2xl' />
        </button>
        <Link href={'/'} className='flex gap-3'>
          <Image src={'/Logo.png'} alt='XYZ Shop' width={28} height={28} />
          <h1 className='text-lg font-bold'>XYZ Shop</h1>
        </Link>
      </div>
      <div className='flex justify-end items-center gap-5 col-span-10 p-3 md:p-5'>
        <button>
          <Bell />
        </button>
        <div className='flex items-center gap-2'>
          <Image src={'/Avatar.png'} alt='Avatar' width={48} height={48} />
          <button>
            <RxCaretDown className='text-2xl' />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
