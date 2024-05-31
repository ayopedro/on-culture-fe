'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RegisterType } from '@@/types/auth.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '@@/schema/auth.schema';
import PasswordInput from '@@/components/password-input';
import { useRegisterMutation } from '@@/services/mutations/auth.mutation';
import { useAppDispatch } from '@@/services/redux/hooks';
import { registerSuccess } from '@@/services/redux/slices/auth.slice';
import toast from 'react-hot-toast';

const Register = () => {
  const { mutateAsync: registerApi, isPending } = useRegisterMutation();
  const dispatch = useAppDispatch();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<RegisterType> = async (data) => {
    try {
      const result = await registerApi(data);
      if (!result) {
        return;
      }
      if (result.statusCode === 200 || result.statusCode === 201) {
        const { user } = result.data;
        dispatch(registerSuccess(user));
        router.push('/login');
        toast.success(result.data.message || 'Registration Successful!');
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
              <label htmlFor='firstName'>First Name</label>
              <div className='flex flex-col gap-1'>
                <input
                  type='text'
                  placeholder='Your first name'
                  {...register('firstName')}
                  className={errors.firstName ? 'bg-bg-red' : 'bg-white'}
                />
                <small className='text-red mb-0'>
                  {errors.firstName?.message}
                </small>
              </div>
            </div>
            <div className='input-group'>
              <label htmlFor='lastName'>Last Name</label>
              <div className='flex flex-col gap-1'>
                <input
                  type='text'
                  placeholder='Your last name'
                  {...register('lastName')}
                  className={errors.lastName ? 'bg-bg-red' : 'bg-white'}
                />
                <small className='text-red mb-0'>
                  {errors.lastName?.message}
                </small>
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
            <button className='btn btn-outline mt-5'>
              {isPending ? 'Signing up...' : 'Sign up'}
            </button>
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
