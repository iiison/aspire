import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
    <path d="M0 0h16v16H0z" fill="none" />
    <path
      d="M8 12.999a7.822 7.822 0 01-4.484-1.4 7.9 7.9 0 01-2.849-3.6 7.879 7.879 0 0114.666 0 7.9 7.9 0 01-2.848 3.6A7.824 7.824 0 018 12.999zm0-8.334a3.333 3.333 0 103.334 3.334A3.337 3.337 0 008 4.667z"
      stroke="transparent"
      strokeMiterlimit={10}
    />
    <path d="M8 6a2 2 0 102 2 2 2 0 00-2-2z" />
  </svg>
);

export default SvgComponent;
