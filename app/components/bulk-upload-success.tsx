'use client';

import { FiCheckCircle } from 'react-icons/fi';

type Props = {
  value: number;
};

const BulkuploadSuccess = ({ value }: Props) => {
  return (
    <div className='flex flex-col items-center justify-between'>
      <FiCheckCircle className='text-9xl text-green-500' />
      <div className='mt-8 mb-16'>
        <div>
          <p className='text-green-500 font-semibold text-sm'>
            {value} Record(s) Uploaded Successfully
          </p>
        </div>
      </div>
    </div>
  );
};

export default BulkuploadSuccess;
