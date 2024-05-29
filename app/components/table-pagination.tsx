'use client';

import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface PropType {
  totalCount: number;
  handlePreviousLoad: () => void;
  handleNextLoad: () => void;
  nextLoad?: string;
  previous?: string;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  selectedPageSize: number;
  setSelectedPageSize: (size: number) => void;
}

const pageSizes = [10, 20, 30, 40, 50];

const TablePagination = ({
  totalCount,
  handlePreviousLoad,
  handleNextLoad,
  previous,
  nextLoad,
  count,
  setCount,
  selectedPageSize,
  setSelectedPageSize,
}: PropType) => {
  return (
    <div className='flex items-center justify-end gap-2 text-xs mt-3 text-gray-500'>
      <div className='flex items-center gap-1'>
        <p>Rows per page:</p>
        <select
          value={selectedPageSize}
          onChange={(e) => setSelectedPageSize(Number(e.target.value))}
          className='py-1 outline-none rounded px-1'
        >
          {pageSizes.map((size, index) => (
            <option key={index + 1} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className='flex'>
        <p>
          Showing{' '}
          {totalCount === 0
            ? count
            : count === 0
            ? count + 1
            : count * selectedPageSize + 1}{' '}
          -{' '}
          {count * selectedPageSize + selectedPageSize > totalCount
            ? totalCount
            : count * selectedPageSize + selectedPageSize}{' '}
          of {totalCount}
        </p>
      </div>
      <div className='flex gap-2'>
        <button
          disabled={count < 1}
          onClick={() => {
            if (count < 1 || !previous) return;
            handlePreviousLoad();
            setCount((_count) => _count - 1);
          }}
          className='btn p-1'
        >
          <IoChevronBack color={!previous ? 'white' : '#6B7280'} />
        </button>
        <button
          disabled={count * selectedPageSize > totalCount || !nextLoad}
          onClick={() => {
            if (count + selectedPageSize > totalCount || !nextLoad) return;
            handleNextLoad();
            setCount((_count) => _count + 1);
          }}
          className='btn p-1'
        >
          <IoChevronForward
            style={{ pointerEvents: !nextLoad ? 'none' : 'auto' }}
            color={!nextLoad ? 'white' : '#6B7280'}
          />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
