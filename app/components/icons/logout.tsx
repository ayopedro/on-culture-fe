import { SVGProps } from 'react';

const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width='22'
    height='22'
    viewBox='0 0 22 22'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M12.8333 7.33333V5.5C12.8333 5.01377 12.6402 4.54745 12.2964 4.20363C11.9525 3.85982 11.4862 3.66666 11 3.66666H4.58333C4.0971 3.66666 3.63079 3.85982 3.28697 4.20363C2.94315 4.54745 2.75 5.01377 2.75 5.5V16.5C2.75 16.9862 2.94315 17.4525 3.28697 17.7964C3.63079 18.1402 4.0971 18.3333 4.58333 18.3333H11C11.4862 18.3333 11.9525 18.1402 12.2964 17.7964C12.6402 17.4525 12.8333 16.9862 12.8333 16.5V14.6667'
      stroke='#64748B'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M6.41666 11H19.25M19.25 11L16.5 8.25M19.25 11L16.5 13.75'
      stroke='#64748B'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default SVGComponent;
