'use client';

import { TableProps } from '@@/types/order.types';
import { AppUtilities } from '@@/utils';
import { customStyles } from '@@/utils/custom-table-styles';
import moment from 'moment';
import { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import TablePagination from './table-pagination';
import { OrdersData } from '@@/utils/dummy-data';
import Card from './card';
import { FaEllipsis } from 'react-icons/fa6';

const OrdersTable = () => {
  const [count, setCount] = useState<number>(0);
  const [selectedPageSize, setSelectedPageSize] = useState<number>(10);

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
      selector: (row) => moment(row.date, 'DD/MM/YYYY').format('DD/MM/YYYY'),
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

  return (
    <Card>
      <h4 className='text-grey mb-5'>Orders</h4>
      <DataTable
        data={OrdersData}
        columns={columns}
        // progressPending={isLoading}
        progressComponent={<p>Loading...</p>}
        customStyles={customStyles}
      />
      <TablePagination
        totalCount={OrdersData.length}
        nextLoad={undefined}
        previous={undefined}
        count={count}
        setCount={setCount}
        selectedPageSize={selectedPageSize}
        setSelectedPageSize={setSelectedPageSize}
        handleNextLoad={() => console.log('next')}
        handlePreviousLoad={() => console.log('prev')}
      />
    </Card>
  );
};

export default OrdersTable;
