import type { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="translate(213 -305)">
      <circle
        cx={16}
        cy={16}
        r={16}
        style={{
          fill: '#325baf',
        }}
        transform="translate(-213 305)"
      />
      <path
        d="M64.444 138.522a1.925 1.925 0 0 0 1.919 1.927h7.675a1.925 1.925 0 0 0 1.919-1.927v-9.633H64.444Z"
        style={{
          fill: '#9ac0fa',
        }}
        transform="translate(-267.481 188.551)"
      />
      <path
        d="M40.861-.037V-1h-3.84v.963h-4.8v2.249h13.44V-.037Z"
        style={{
          fill: '#f1f3f4',
        }}
        transform="translate(-236.222 314)"
      />
    </g>
  </svg>
);

export default SvgComponent;
