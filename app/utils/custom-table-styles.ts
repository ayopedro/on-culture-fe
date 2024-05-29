import { TableStyles } from 'react-data-table-component';

export const customStyles: TableStyles = {
  table: {
    style: {
      height: 'fit-content',
    },
  },
  headRow: {
    style: {
      display: 'flex',
      gap: '0.5rem',
      backgroundColor: '#F8FAFC',
    },
  },
  headCells: {
    style: {
      padding: '0.5rem 1rem',
      letterSpacing: '0.2px',
      fontSize: '14px',
    },
  },
  rows: {
    style: {
      display: 'flex',
      gap: '0.5rem',
    },
  },
  cells: {
    style: {
      padding: '0.5rem 1rem',
      letterSpacing: '0.2px',
      fontSize: '14px',
      minWidth: 'unset',
      textTransform: 'capitalize',
    },
  },
};
