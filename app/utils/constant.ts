import { Period } from '@@/types';

export enum ProductCategory {
  DRAMA = 'Drama',
  COMEDY = 'Comedy',
  DOCUMENTARY = 'Documentary',
  HORROR = 'Horror',
  SCIFI = 'SciFi',
}

export const ProductCategories = [
  {
    key: 1,
    label: 'Comedy',
    value: ProductCategory.COMEDY,
  },
  {
    key: 2,
    label: 'Documentary',
    value: ProductCategory.DOCUMENTARY,
  },
  {
    key: 3,
    label: 'Drama',
    value: ProductCategory.DRAMA,
  },
  {
    key: 4,
    label: 'Horror',
    value: ProductCategory.HORROR,
  },
  {
    key: 5,
    label: 'Sci-Fi',
    value: ProductCategory.SCIFI,
  },
];

export const DateFilter = [
  {
    key: 1,
    label: 'All',
    value: '',
  },
  {
    key: 2,
    label: 'This Year',
    value: Period.THIS_YEAR,
  },
  {
    key: 3,
    label: 'This Month',
    value: Period.THIS_MONTH,
  },
  {
    key: 4,
    label: 'Last Month',
    value: Period.LAST_MONTH,
  },
  {
    key: 5,
    label: 'Last Year',
    value: Period.LAST_YEAR,
  },
  {
    key: 6,
    label: 'Last 2 Years',
    value: Period.TWO_YEARS,
  },
  {
    key: 7,
    label: 'Last 3 Years',
    value: Period.THREE_YEARS,
  },
];
