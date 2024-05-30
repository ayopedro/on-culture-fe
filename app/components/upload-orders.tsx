import {
  useBulkUploadOrdersMutation,
  useValidateBulkUploadOrdersMutation,
} from '@@/services/mutations/orders.mutation';
import { ImportType, ServerData } from '@@/types/order.types';
import moment from 'moment';
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { read, utils } from 'xlsx';
import Papa from 'papaparse';
import { useDropzone } from 'react-dropzone';
import Spinner from './spinner';
import Modal from './modal';
import InvalidServerData from './invalid-server-data';
import Link from 'next/link';
import { BiDownload } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import BulkuploadSuccess from './bulk-upload-success';

const UploadOrders = () => {
  const [pathName, setPathName] = useState('');
  const [excelEntries, setExcelEntries] = useState<ImportType[]>([]);
  const [serverData, setServerData] = useState<ServerData>({} as ServerData);
  const [modalState, setModalState] = useState({
    isSuccessModal: false,
    bulkInvalidOpen: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const { mutateAsync: validateUploads } =
    useValidateBulkUploadOrdersMutation();

  const { mutateAsync: bulkUpload } = useBulkUploadOrdersMutation();

  const handleXlsxImport = async (file: File) => {
    setLoading(true);
    const reason = file
      .arrayBuffer()
      .then((res) => {
        let data = new Uint8Array(res);
        let workbook = read(data);
        let sheets = workbook.SheetNames;
        return utils.sheet_to_csv(workbook.Sheets[sheets[0]]);
      })
      .then((data) => {
        return data;
      });
    return reason;
  };

  const parseFile = async (file: any) => {
    if (
      !file.path.endsWith('.csv') &&
      !file.path.endsWith('.xlsx') &&
      !file.path.endsWith('.xls')
    ) {
      return setError(
        'Unsupported file format. You can only upload csv and xlsx files.'
      );
    }
    setPathName(file.path);
    Papa.parse(await handleXlsxImport(file), {
      header: true,
      delimiter: ',',
      skipEmptyLines: 'greedy',
      complete: (results: any) => {
        let resultsData: ImportType[] = [];

        const expectedTitles = [
          'order_number',
          'customer_name',
          'email',
          'product_name',
          'product_category',
          'price',
          'order_date (DD/MM/YYYY)',
        ];

        const actualTitles = Object?.keys(results.data[0]);

        const invalidTitle: string[] = actualTitles.filter((curr) => {
          return !expectedTitles.includes(curr) && curr !== '';
        });

        const missingTitles: string[] = expectedTitles.filter(
          (curr) => !actualTitles.includes(curr)
        );

        let errMsg: string = '';

        if (invalidTitle.length) {
          setLoading(false);

          errMsg = `Invalid Headers! Check the following title${
            invalidTitle.length > 1 ? 's:' : ':'
          } (${invalidTitle.join(
            ', '
          )})  refer to the headers in downloaded template.`;
        } else if (missingTitles.length) {
          setLoading(false);

          errMsg = `Missing Headers! The following title${
            missingTitles.length > 1 ? 's are' : ' is'
          }: (${invalidTitle.join(
            ', '
          )})  refer to the headers in downloaded template.`;
        }

        if (errMsg.length) {
          toast.error(errMsg);
          return setError(errMsg);
        }

        try {
          for (const [_, result] of results.data.entries()) {
            const date = result['order_date (DD/MM/YYYY)'];
            const order_date = moment(date, 'DD/MM/YYYY')
              .format('DD/MM/YYYY')
              .trim();
            const email = result['email'].trim();
            const product_name = result['product_name'].trim();
            const customer_name = result['customer_name'].trim();
            const product_category = result['product_category'].trim();
            const price = Number(result['price']);
            const order_number = result['order_number'];

            resultsData.push({
              order_number,
              customer_name,
              product_name,
              product_category:
                product_category === 'Sci-Fi' ? 'SciFi' : product_category,
              email,
              price,
              order_date,
            });
          }
          setExcelEntries(resultsData);

          if (resultsData.length === 0) {
            setError(
              'No data found in the file you uploaded. Please check the file and try again.'
            );
          }
        } catch (err: any) {
          setError(err.toString());
          setLoading(false);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  useEffect(() => {
    if (!error) return;
    const timeout = setTimeout(() => {
      setError('');
    }, 5000);
    return clearTimeout(timeout);
  }, [error]);

  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles.length) {
      parseFile(acceptedFiles[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
    });

  const uploadOrders = async () => {
    setLoading(true);
    let data: any;

    data = {
      orders: excelEntries,
    };

    const result = await validateUploads(data);

    if (result.status !== 200) {
      setLoading(false);
      toast.error(result.data.message);
      return;
    }

    if (result.data.data.invalidRecordCount > 0) {
      setServerData(result.data.data);
      setModalState({ ...modalState, bulkInvalidOpen: true });
      setLoading(false);
      return;
    }

    if (result.data.data.invalidRecordCount === 0) {
      setLoading(false);

      const validResponse = await bulkUpload({
        orders: result.data.data.validRecords.orders,
      });

      if (validResponse.status === 200 || validResponse.status === 201) {
        setModalState({ ...modalState, isSuccessModal: true });
        setLoading(false);
        setPathName('');
      }
    }
  };

  useEffect(() => {
    if (excelEntries.length) {
      uploadOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [excelEntries.length]);

  return (
    <div className='w-[80vw] md:w-[75vw]'>
      <div className='flex flex-col md:flex-row md:items-center justify-start items-start gap-5 md:justify-between mb-5'>
        <div>
          <h3 className='text-lg font-semibold'>Upload Orders</h3>
          <p className='text-grey text-sm'>
            You can import orders by uploading a csv, xls or xlsx file
          </p>
        </div>
        <Link
          className='flex items-center btn btn-primary gap-2 text-xs md:text-base'
          href={'/template.xlsx'}
          style={{ paddingBlock: '0.5rem' }}
        >
          Download template
          <BiDownload />
        </Link>
      </div>
      <div className='mb-5'>
        {error && <p className='text-red text-xs md:text-sm'>{error}</p>}
      </div>
      <div className='drag-drop' {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <div className='flex-col text-center'>
            <p className='text-sm md:text-base'>Drop file here or browse</p>
            <p className='text-grey font-bold text-xs md:text-sm'>
              Only one file can be uploaded at a time!
            </p>
          </div>
        )}
      </div>
      <div>
        {fileRejections.length > 1 ? (
          <p>You can only upload a maximum of one file at a time!</p>
        ) : (
          fileRejections.length > 0 && (
            <p>
              Unsupported file format. You can only upload csv and xlsx files.
            </p>
          )
        )}
      </div>
      <div className='flex items-center gap-1 mt-3'>
        {loading && (
          <div className='flex items-center'>
            <Spinner />
            <p>Uploading</p>
          </div>
        )}
        <p className='text-base'>
          {pathName ? pathName : null} {loading && '...'}
        </p>
      </div>
      {modalState.bulkInvalidOpen ? (
        <Modal
          onClose={() => {
            setModalState({
              ...modalState,
              bulkInvalidOpen: false,
            });
            router.push('/dashboard');
          }}
        >
          <InvalidServerData
            setModalState={setModalState}
            invalidData={serverData}
          />
        </Modal>
      ) : null}
      {modalState.isSuccessModal ? (
        <Modal
          onClose={() => {
            setModalState({
              ...modalState,
              isSuccessModal: false,
            });
            router.push('/dashboard');
          }}
        >
          <BulkuploadSuccess value={excelEntries.length} />
        </Modal>
      ) : null}
    </div>
  );
};

export default UploadOrders;
