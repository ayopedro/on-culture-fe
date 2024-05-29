import * as Yup from 'yup';

export const CreateOrderSchema = Yup.object().shape({
  customer_name: Yup.string().required('Customer name is required'),
  email: Yup.string()
    .trim()
    .email('Invalid email!')
    .required('Customer email is required!'),
  product_name: Yup.string().required('Product name is required'),
  product_category: Yup.string().required('Product category is required'),
  price: Yup.string().required('Price is required'),
  order_date: Yup.string().required('Order date is required'),
});
