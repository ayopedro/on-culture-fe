'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { OrderType } from '@@/types/order.types';
import { CreateOrderSchema } from '@@/schema/order.schema';
import { ProductCategory } from '@@/utils/constant';

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderType>({
    resolver: yupResolver(CreateOrderSchema),
    defaultValues: {
      customer_name: '',
      email: '',
      product_name: '',
      product_category: '',
      order_date: '',
      price: '',
    },
  });

  const onSubmit: SubmitHandler<OrderType> = (data) => {
    console.log(data);
    router.push('/');
  };

  return (
    <div className='bg-bg-light-blue flex items-center h-screen justify-center'>
      <div className='flex flex-col gap-10 items-center md:w-1/4'>
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
            className='rounded-md w-full flex flex-col gap-5 px-5 py-10 bg-white'
          >
            <div className='input-group'>
              <label htmlFor='customer_name'>Customer Name</label>
              <div className='flex flex-col gap-1'>
                <input
                  type='text'
                  placeholder='Your full name'
                  {...register('customer_name')}
                  className={errors.customer_name ? 'bg-bg-red' : 'bg-white'}
                />
                <small className='text-red mb-0'>
                  {errors.customer_name?.message}
                </small>
              </div>
            </div>
            <div className='input-group'>
              <label htmlFor='email'>Customer Email Address</label>
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
              <label htmlFor='product_name'>Product Name</label>
              <div className='flex flex-col gap-1'>
                <input
                  type='text'
                  placeholder='Giant Oak'
                  {...register('product_name')}
                  className={errors.product_name ? 'bg-bg-red' : 'bg-white'}
                />
                <small className='text-red mb-0'>
                  {errors.product_name?.message}
                </small>
              </div>
            </div>
            <div className='input-group'>
              <label htmlFor='product_category'>Product Category</label>
              <div className='flex flex-col gap-1'>
                <select
                  className={errors.customer_name ? 'bg-bg-red' : 'bg-white'}
                  {...register('product_category')}
                >
                  <option value='documentary'>
                    {ProductCategory.Documentary}
                  </option>
                </select>
                <small className='text-red mb-0'>
                  {errors.product_category?.message}
                </small>
              </div>
            </div>
            <div className='input-group'>
              <label htmlFor='price'>Price</label>
              <div className='flex flex-col gap-1'>
                <input
                  type='number'
                  placeholder='0.00'
                  {...register('price')}
                  className={errors.price ? 'bg-bg-red' : 'bg-white'}
                />
                <small className='text-red mb-0'>{errors.price?.message}</small>
              </div>
            </div>
            <div className='input-group'>
              <label htmlFor='order_date'>Order Date</label>
              <div className='flex flex-col gap-1'>
                <input
                  type='date'
                  placeholder='dd-mm-yyyy'
                  {...register('order_date')}
                  className={errors.order_date ? 'bg-bg-red' : 'bg-white'}
                />
                <small className='text-red mb-0'>
                  {errors.order_date?.message}
                </small>
              </div>
            </div>
            <button className='btn btn-outline mt-5'>Create order</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
