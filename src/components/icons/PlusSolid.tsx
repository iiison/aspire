import type { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M0 0h16v16H0z"
      style={{
        fill: 'transparent',
      }}
    />
    <path
      d="M7.5 0A7.5 7.5 0 1 0 15 7.5 7.508 7.508 0 0 0 7.5 0Zm3.281 8.125H8.125v2.656a.625.625 0 1 1-1.25 0V8.125H4.219a.625.625 0 1 1 0-1.25h2.656V4.219a.625.625 0 1 1 1.25 0v2.656h2.656a.625.625 0 1 1 0 1.25Zm0 0"
      style={{
        stroke: '#325baf',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '.5px',
      }}
      transform="translate(.5 .5)"
    />
  </svg>
);

export default SvgComponent;
