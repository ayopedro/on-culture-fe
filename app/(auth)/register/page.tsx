'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RegisterType } from '@@/types/auth.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '@@/schema/auth.schema';
import PasswordInput from '@@/components/password-input';

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<RegisterType> = (data) => {
    console.log(data);
    router.push('/login');
  };

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
              <label htmlFor='fullname'>Full Name</label>
              <div className='flex flex-col gap-1'>
                <input
                  type='text'
                  placeholder='Your full name'
                  {...register('name')}
                  className={errors.name ? 'bg-bg-red' : 'bg-white'}
                />
                <small className='text-red mb-0'>{errors.name?.message}</small>
              </div>
            </div>
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
              <label htmlFor='password'>Password</label>
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
            <button className='btn btn-outline mt-5'>Sign up</button>
            <p className='text-center text-grey'>
              Already have an account?{' '}
              <span>
                <Link href={'/login'}>Login</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
