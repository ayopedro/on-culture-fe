'use client';

import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';
import { configOptions } from '@@/services/config';

interface Props {
  children: React.ReactNode;
}

const ProtectedPage: NextPage<Props> = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const token = configOptions();
  const [_, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token && typeof window !== 'undefined') {
      redirect('/');
    } else {
      setIsLoading(false);
    }
  }, [token]);

  if (token || typeof window === 'undefined') {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedPage;
