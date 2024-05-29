'use client';

import PasswordInput from '@@/components/password-input';
import { LoginSchema } from '@@/schema/auth.schema';
import { LoginType } from '@@/types/auth.types';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit: SubmitHandler<LoginType> = (data) => console.log(data);
  const router = useRouter();

  return (
    <div className='bg-bg-light-blue flex items-center h-screen justify-center'>
      <div className='flex flex-col gap-10 items-center w-1/4'>
        <div
          className='flex items-center gap-4 cursor-pointer'
          onClick={() => router.push('/login')}
        >
          <Image src='/Logo.png' alt='logo' width={30} height={30} />
          <h1 className='text-3xl font-bold'>XYZ Store</h1>
        </div>
        <div className='flex gap-3 w-full'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='rounded-md w-full flex flex-col gap-5 px-5 py-10 bg-white'
          >
            <div className='input-group'>
              <label htmlFor='email'>Email Address</label>
              <div className='flex flex-col gap-1'>
                <input
                  type='text'
                  placeholder='email@email.com'
                  {...register('email')}
                  className={errors.email ? 'bg-bg-red' : 'bg-white'}
                />
                <small className='text-red mb-0'>{errors.email?.message}</small>
              </div>
            </div>
            <div className='input-group'>
              <div className='flex justify-between items-center'>
                <label htmlFor='password'>Password</label>
                <small>
                  <Link href={'/reset-password'}>Reset Password?</Link>
                </small>
              </div>
              <div className='flex flex-col gap-1'>
                <PasswordInput
                  placeholder='Your super secret password'
                  name='password'
                  register={register}
                  className={errors.password ? 'bg-bg-red' : 'bg-white'}
                />
                <small className='text-red mb-0'>
                  {errors.password?.message}
                </small>
              </div>
            </div>
            <button className='btn btn-outline mt-5'>Login</button>
            <p className='text-center text-grey'>
              Don&apos;t have an account?{' '}
              <span>
                <Link href={'/register'}>Sign up</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
