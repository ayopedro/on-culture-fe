import { AppUtilities } from '@@/utils';
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa';
import Spinner from './spinner';

type Props = {
  title: string;
  data: Record<string, any>;
  uKey: string;
};

export const DashboardStat = ({ title, data, uKey }: Props) => {
  return Object.keys(data).length ? (
    <div className='md:py-8 md:px-12 flex flex-col gap-5'>
      <h4 className='text-grey'>{title}</h4>
      <div className='flex items-center gap-5'>
        <h3 className='md:text-2xl font-bold'>
          {title === 'Total Revenue'
            ? AppUtilities.formatAmount(data[uKey]?.current)
            : data[uKey]?.current}
        </h3>
        <div
          className={`${
            data[uKey].difference < 0 ? 'bg-bg-red' : 'bg-bg-green'
          } px-3 py-1 rounded-md flex gap-1 items-center`}
        >
          {data[uKey].difference < 0 ? (
            <FaLongArrowAltDown
              className={
                data[uKey].difference < 0 ? 'text-txt-red' : 'text-txt-green'
              }
            />
          ) : (
            <FaLongArrowAltUp
              className={
                data[uKey].difference < 0 ? 'text-txt-red' : 'text-txt-green'
              }
            />
          )}
          <p
            className={
              data[uKey].difference < 0 ? 'text-txt-red' : 'text-txt-green'
            }
          >
            {Math.floor(data[uKey].difference)}%
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className='py-16 px-12 flex flex-col items-center justify-center gap-5'>
      <Spinner />
    </div>
  );
};
