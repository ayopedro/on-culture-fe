import { AppUtilities } from '@@/utils';
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa';

type Props = {
  title: string;
  amount: number;
  diff?: number;
};

export const DashboardStat = ({ title, amount, diff = 0 }: Props) => {
  return (
    <div className='py-8 px-12 flex flex-col gap-5'>
      <h4 className='text-grey'>{title}</h4>
      <div className='flex items-center gap-5'>
        <h3 className='text-2xl font-bold'>
          {title === 'Total Revenue'
            ? AppUtilities.formatAmount(amount)
            : amount}
        </h3>
        <div className='bg-bg-green px-3 py-1 rounded-md flex gap-1 items-center'>
          {diff < 0 ? (
            <FaLongArrowAltDown
              className={diff < 0 ? 'text-txt-red' : 'text-txt-green'}
            />
          ) : (
            <FaLongArrowAltUp
              className={diff < 0 ? 'text-txt-red' : 'text-txt-green'}
            />
          )}
          <p className={diff < 0 ? 'text-txt-red' : 'text-txt-green'}>
            {diff}%
          </p>
        </div>
      </div>
    </div>
  );
};
