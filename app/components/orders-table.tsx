'use client';

import { OrdersQueryResponse, TableProps } from '@@/types/order.types';
import { AppUtilities } from '@@/utils';
import { customStyles } from '@@/utils/custom-table-styles';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import TablePagination from './table-pagination';
import Card from './card';
import { FaEllipsis } from 'react-icons/fa6';
import { useDebounce } from 'use-debounce';
import { useGetOrders } from '@@/services/queries/orders.query';
import { SortDirection } from '@@/types';
import Spinner from './spinner';

type Props = {
  year?: string;
};

const OrdersTable = ({ year }: Props) => {
  const [count, setCount] = useState<number>(0);
  const [selectedPageSize, setSelectedPageSize] = useState<number>(10);
  const [filters, setFilters] = useState<any>({});
  const [debouncedTerm] = useDebounce(filters.term, 500);

  const { data, isLoading, isSuccess } = useGetOrders<OrdersQueryResponse>({
    ...(debouncedTerm && { term: debouncedTerm }),
    ...{
      ...filters,
      size: selectedPageSize,
      direction: SortDirection.DESC,
    },
  });

  const memoizedData = useMemo(() => {
    if (isSuccess) return AppUtilities.reformData(data);
    return [];
  }, [data, isSuccess]);

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

  useEffect(() => {
    console.log('running...');
    setFilters((prevState: OrdersQueryResponse) => ({
      ...prevState,
      period: year,
    }));
  }, [year]);

  return (
    <Card>
      <h4 className='text-grey mb-5'>Orders</h4>
      <DataTable
        data={memoizedData}
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
    </Card>
  );
};

export default OrdersTable;
