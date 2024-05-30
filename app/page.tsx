'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsAuth(!!sessionStorage.getItem('isLoggedIn'));
  }, []);

  return (
    <main className='flex items-center justify-center h-screen bg-bg-blue'>
      <div className='flex flex-col gap-10 items-center md:w-1/4'>
        <div className='flex items-center gap-4'>
          <Image src='/Logo.png' alt='logo' width={30} height={30} />
          <h1 className='text-3xl font-bold'>XYZ Store</h1>
        </div>
        <div className='flex flex-col md:flex-row gap-5 md:gap-3 w-full'>
          <button
            className='btn btn-outline'
            onClick={() => router.push('/create-order')}
          >
            Create order
          </button>
          {isAuth ? (
            <button
              className='btn btn-primary'
              onClick={() => router.push('/dashboard')}
            >
              View dashboard
            </button>
          ) : (
            <button
              className='btn btn-primary'
              onClick={() => router.push('/login')}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
