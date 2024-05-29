'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <main className='flex items-center justify-center h-screen bg-bg-blue'>
      <div className='flex flex-col gap-10 items-center w-1/4'>
        <div className='flex items-center gap-4'>
          <Image src='/Logo.png' alt='logo' width={30} height={30} />
          <h1 className='text-3xl font-bold'>XYZ Store</h1>
        </div>
        <div className='flex gap-3 w-full'>
          <button
            className='btn btn-outline'
            onClick={() => router.push('/create-order')}
          >
            Create an order
          </button>
          <button
            className='btn btn-primary'
            onClick={() => router.push('/login')}
          >
            Sign in
          </button>
        </div>
      </div>
    </main>
  );
}
