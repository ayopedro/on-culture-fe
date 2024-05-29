'use client';

import { OrdersQueryResponse, TableProps } from '@@/types/order.types';
import { AppUtilities } from '@@/utils';
import { customStyles } from '@@/utils/custom-table-styles';
import moment from 'moment';
import DataTable, { TableColumn } from 'react-data-table-component';
import TablePagination from './table-pagination';
import Card from './card';
import { FaEllipsis } from 'react-icons/fa6';
import Spinner from './spinner';
import { useMemo } from 'react';
import { DataType } from '@@/types';

type Props = {
  data: DataType<OrdersQueryResponse> | undefined;
  isLoading: boolean;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  selectedPageSize: number;
  setSelectedPageSize: React.Dispatch<React.SetStateAction<number>>;
  setFilters: React.Dispatch<any>;
};

const OrdersTable = ({
  data,
  isLoading,
  count,
  setCount,
  selectedPageSize,
  setSelectedPageSize,
  setFilters,
}: Props) => {
  const columns: TableColumn<TableProps>[] = [
    {
      cell: (row) => <input type='checkbox' id={row.id} />,
      width: '3rem',
    },
    {
      name: 'Customer name',
      minWidth: '15rem',
      selector: (row) => row.customer.name,
    },
    {
      name: 'Product name',
      selector: (row) => row.product.name,
    },
    {
      name: 'Category',
      selector: (row) => row?.product.category,
    },
    {
      name: 'Date',
      selector: (row) => moment(row.date).format('DD/MM/YYYY'),
    },

    {
      name: 'Price',
      selector: (row) => AppUtilities.formatAmount(row.product.price),
    },
    {
      name: 'Actions',
      cell: () => (
        <button>
          <FaEllipsis className='text-2xl' />
        </button>
      ),
    },
  ];

  const memoizedOrderData = useMemo(() => {
    if (!isLoading) return AppUtilities.reformData(data!);
    return [];
  }, [data, isLoading]);

  return (
    <Card>
      <h4 className='text-grey mb-5'>Orders</h4>
      {!isLoading ? (
        <>
          <DataTable
            data={memoizedOrderData}
            columns={columns}
            progressPending={isLoading}
            progressComponent={<Spinner />}
            customStyles={customStyles}
          />
          <TablePagination
            totalCount={data?.totalCount!}
            nextLoad={data?.pageCursors.next?.cursor}
            previous={data?.pageCursors.previous?.cursor}
            count={count}
            setCount={setCount}
            selectedPageSize={selectedPageSize}
            setSelectedPageSize={setSelectedPageSize}
            handleNextLoad={() => {
              const next = data?.pageCursors.next;
              if (!next) return;
              setFilters((prevState: OrdersQueryResponse) => ({
                ...prevState,
                cursor: next.cursor,
              }));
            }}
            handlePreviousLoad={() => {
              const previous = data?.pageCursors.previous;
              if (!previous) return;
              setFilters((prevState: OrdersQueryResponse) => ({
                ...prevState,
                cursor: previous.cursor,
              }));
            }}
          />
        </>
      ) : (
        <div className='flex justify-center items-center h-full'>
          <Spinner />
        </div>
      )}
    </Card>
  );
};

export default OrdersTable;
