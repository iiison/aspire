import type { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M0 0h16v16H0Z"
      style={{
        fill: 'none',
      }}
    />
    <path
      d="M7.333 10a7.822 7.822 0 0 1-4.484-1.4A7.9 7.9 0 0 1 0 5a7.879 7.879 0 0 1 14.666 0 7.9 7.9 0 0 1-2.848 3.6A7.824 7.824 0 0 1 7.333 10Zm0-8.334A3.333 3.333 0 1 0 10.667 5a3.337 3.337 0 0 0-3.334-3.332Z"
      style={{
        stroke: 'transparent',
        strokeMiterlimit: 10,
        fill: '#01d167',
      }}
      transform="translate(.667 2.999)"
    />
    <path
      d="M2 0a2 2 0 1 0 2 2 2 2 0 0 0-2-2Z"
      style={{
        fill: '#01d167',
      }}
      transform="translate(6 6)"
    />
  </svg>
);

export default SvgComponent;
