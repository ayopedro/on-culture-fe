'use client';

import { useBulkUploadOrdersMutation } from '@@/services/mutations/orders.mutation';
import { ImportType, ServerData } from '@@/types/order.types';
import { AppUtilities } from '@@/utils';
import moment from 'moment';
import { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { BiDownload } from 'react-icons/bi';
import * as XLSX from 'xlsx';
import Spinner from './spinner';
import Modal from './modal';
import { useRouter } from 'next/navigation';

type Props = {
  invalidData: ServerData;
  setModalState: React.Dispatch<
    React.SetStateAction<{
      isSuccessModal: boolean;
      bulkInvalidOpen: boolean;
    }>
  >;
};

const InvalidServerData = ({
  invalidData,
  setModalState: setServerModalState,
}: Props) => {
  const [isChecked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { mutateAsync: bulkUploadEnrollees } = useBulkUploadOrdersMutation();
  const [modalsState, setModalsState] = useState({
    isSuccessModal: false,
  });

  const router = useRouter();

  const columns: TableColumn<ImportType>[] = [
    {
      name: 'Reason',
      cell: (row) => row.reason?.slice(0, 30),
    },
    {
      name: 'Order No',
      selector: (row) => row.order_number || '',
    },
    {
      name: 'Customer name',
      selector: (row) => row.customer_name || '',
    },
    {
      name: 'Email',
      selector: (row) => row.email || '',
    },
    {
      name: 'Product name',
      selector: (row) => row.product_name || '',
    },
    {
      name: 'Product category',
      selector: (row) => row.product_category || '',
    },
    {
      name: 'Price',
      selector: (row) => row.price || '',
    },
    {
      name: 'Order date (DD/MM/YYYY)',
      selector: (row) =>
        moment(row.order_date, 'DD/MM/YYYY').format('DD/MM/YYYY') !==
        'Invalid date'
          ? moment(row.order_date, 'DD/MM/YYYY').format('DD/MM/YYYY')
          : 'Invalid Date',
    },
  ];

  const downloadJsToExcelFile = (workbook: any, fileName: string) => {
    const excelBinaryData = XLSX.write(workbook, {
      type: 'array',
      bookType: 'xlsx',
    });
    const blob = new Blob([excelBinaryData], {
      type: 'application/octet-stream',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  const handleDownload = () => {
    const data = invalidData.invalidRecords.map((record: ImportType) => ({
      Reason: record.reason,
      order_number: record.order_number,
      customer_name: record.customer_name,
      email: record.email,
      product_name: record.product_name,
      product_category: record.product_category,
      'order_date (DD/MM/YYYY)':
        moment(record.order_date).format('DD/MM/YYYY') === 'Invalid date'
          ? moment(record.order_date).format('DD/MM/YYYY')
          : '',
      Price: record.price,
    }));
    const workbook = AppUtilities.convertToExcelFile(data);
    downloadJsToExcelFile(workbook, 'invalid_orders_records.xlsx');
  };

  const uploadValidRecords = async () => {
    setLoading(true);
    const result = await bulkUploadEnrollees({
      orders: invalidData?.validRecords?.orders,
    });

    if (result.status === 200 || result.status === 201) {
      setModalsState({ ...modalsState, isSuccessModal: true });
      setLoading(false);
    }
  };

  return (
    <div className='w-[80vw] md:w-[75vw]'>
      <h3 className='text-lg font-semibold'>Orders Invalid Records</h3>
      <p className='text-grey'>
        There&apos;s been an error with the uploading of the records.
      </p>
      <small className='text-grey'>
        Please review the record(s) to proceed
      </small>
      <div className='flex flex-col md:flex-row gap-2 mt-4 items-center justify-between mb-10'>
        <p className='text-red text-sm md:text-base'>
          {invalidData?.invalidRecordCount} Record(s) found with error
        </p>
        <button
          className='flex items-center btn btn-primary gap-2 text-xs md:text-sm'
          onClick={handleDownload}
          style={{ paddingBlock: '0.6rem' }}
        >
          Download records
          <BiDownload />
        </button>
      </div>
      <div className='rounded-md p-4 border border-gray-400 border-dashed'>
        <DataTable
          columns={columns}
          data={invalidData?.invalidRecords}
          pagination={invalidData?.invalidRecords?.length > 10}
        />
      </div>
      <div className='mt-5 flex items-center gap-1'>
        <input
          type='checkbox'
          name='valid-records'
          disabled={invalidData?.validRecordCount === 0}
          onChange={() => setChecked(!isChecked)}
          className='outline-none rounded h-5 w-5 border border-gray-400 focus:ring-0'
        />
        <label htmlFor='valid-records' className='text-sm ms-1 text-grey'>
          Upload only valid entries ({invalidData?.validRecords?.orders.length}{' '}
          record(s))
        </label>
      </div>
      <div className='flex justify-end gap-3 mt-10'>
        <button
          className='btn btn-cancel text-xs md:text-sm'
          style={{ paddingBlock: '0.6rem' }}
          onClick={() => {
            setServerModalState((prev) => ({
              ...prev,
              bulkInvalidOpen: false,
            }));
            router.push('/dashboard');
          }}
        >
          Cancel
        </button>
        <button
          className='btn btn-outline flex items-center gap-2  text-xs md:text-sm'
          onClick={uploadValidRecords}
          style={{ paddingBlock: '0.6rem' }}
          disabled={!isChecked || loading}
        >
          {loading ? <Spinner /> : null} Process
        </button>
      </div>
      {modalsState.isSuccessModal ? (
        <Modal
          onClose={() => {
            setModalsState({
              ...modalsState,
              isSuccessModal: false,
            });
            router.push('/dashboard');
          }}
        >
          <>
            <div className='flex flex-col items-center justify-between'>
              <div className='mt-8 mb-16'>
                {/* <Circle size={100} bg='brand.green'>
                <TickIcon />
              </Circle> */}
              </div>
              <div>
                <p className='text-txt-green font-semibold text-sm'>
                  {invalidData?.validRecords?.orders.length} Record(s) Uploaded
                  Successfully
                </p>
              </div>
            </div>
          </>
        </Modal>
      ) : null}
    </div>
  );
};

export default InvalidServerData;
