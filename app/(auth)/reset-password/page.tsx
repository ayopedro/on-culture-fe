'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PasswordInput from '@@/components/password-input';
import { ResetPasswordType } from '@@/types/auth.types';
import { ResetPasswordSchema } from '@@/schema/auth.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useResetPasswordMutation } from '@@/services/mutations/auth.mutation';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const { mutateAsync: resetPassword, isPending } = useResetPasswordMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: {
      token: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordType> = async (data) => {
    try {
      const result = await resetPassword(data);
      if (!result) {
        return;
      }
      if (result.statusCode === 200 || result.statusCode === 201) {
        router.push('/login');
        toast.success(result.data.message || 'Registration Successful!');
        sessionStorage.setItem('isLoggedIn', JSON.stringify(result.data.data));
      }
    } catch (error: any) {
      toast.error(error || 'An error occurred');
      throw new Error(error);
    }
  };

  return (
    <div className='bg-bg-light-blue flex items-center h-screen justify-center'>
      <div className='flex flex-col gap-10 items-center w-[90vw] md:w-[50vw] xl:w-1/4'>
        <div
          className='flex items-center gap-4 cursor-pointer'
          onClick={() => router.push('/')}
        >
          <Image src='/Logo.png' alt='logo' width={30} height={30} />
          <h1 className='text-3xl font-bold'>XYZ Store</h1>
        </div>
        <div className='flex gap-3 w-full'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='rounded-md w-full flex flex-col gap-5 px-3 md:px-5 py-10 bg-white'
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
              <label htmlFor='token'>One Time Password</label>
              <div className='flex flex-col gap-1'>
                <input
                  type='text'
                  placeholder='12345abc'
                  {...register('token')}
                  className={errors.token ? 'bg-bg-red' : 'bg-white'}
                />
                <small className='text-red mb-0'>{errors.token?.message}</small>
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
            <div className='input-group'>
              <label htmlFor='confirm_password'>Confirm Password</label>
              <div className='flex flex-col gap-1'>
                <PasswordInput
                  placeholder='Your super secret password'
                  name='password'
                  register={register}
                  className={errors.confirmPassword ? 'bg-bg-red' : 'bg-white'}
                />
                <small className='text-red mb-0'>
                  {errors.confirmPassword?.message}
                </small>
              </div>
            </div>
            <button className='btn btn-outline mt-5'>Login</button>
            <p className='text-center text-grey'>
              Return to{' '}
              <span>
                <Link href={'/login'}>login</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
