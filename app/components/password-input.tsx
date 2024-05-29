import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

interface PasswordProps {
  name: string;
  placeholder?: string;
  register: any;
  className?: string;
}

const PasswordInput = ({
  name,
  placeholder,
  register,
  className,
}: PasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='relative w-full'>
      <input
        type={showPassword ? 'text' : 'password'}
        name={name}
        placeholder={placeholder}
        className={className + ' w-full'}
        {...register(name)}
      />
      <button
        type='button'
        onClick={() => setShowPassword(!showPassword)}
        className='absolute right-3 top-3'
      >
        {showPassword ? (
          <FaRegEyeSlash className='text-slate-500' />
        ) : (
          <FaRegEye className='text-slate-500' />
        )}
      </button>
    </div>
  );
};
export default PasswordInput;
