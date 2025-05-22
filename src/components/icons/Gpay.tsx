import type { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      style={{
        fill: '#fff',
        stroke: '#eee',
      }}
    >
      <circle
        cx={16}
        cy={16}
        r={16}
        stroke="none"
        style={{
          stroke: 'none',
        }}
      />
      <circle
        cx={16}
        cy={16}
        r={15.5}
        style={{
          fill: 'none',
        }}
      />
    </g>
    <path
      d="M60.988 47.06a8.1 8.1 0 0 0-.106-1.311h-6.01v2.487h3.443a3 3 0 0 1-1.274 1.964v1.616h2.053a6.352 6.352 0 0 0 1.894-4.756Z"
      style={{
        fillRule: 'evenodd',
        fill: '#4285f4',
      }}
      transform="translate(-38.747 -30.951)"
    />
    <path
      d="M12.231 71.408a6.045 6.045 0 0 0 4.222-1.562L14.4 68.23a3.78 3.78 0 0 1-2.168.619 3.82 3.82 0 0 1-3.576-2.666H6.54v1.67a6.356 6.356 0 0 0 5.691 3.555Z"
      style={{
        fill: '#34a853',
        fillRule: 'evenodd',
      }}
      transform="translate(3.894 -48.98)"
    />
    <path
      d="M3.532 35.172a3.954 3.954 0 0 1 0-2.478v-1.661H1.417a6.492 6.492 0 0 0 0 5.8Z"
      style={{
        fill: '#fbbc04',
        fillRule: 'evenodd',
      }}
      transform="translate(9.017 -17.968)"
    />
    <path
      d="M12.231 3.318a3.4 3.4 0 0 1 2.443.97l1.826-1.85A6.1 6.1 0 0 0 12.231.76 6.365 6.365 0 0 0 6.54 4.324l2.115 1.67a3.816 3.816 0 0 1 3.576-2.676Z"
      style={{
        fill: '#ea4335',
        fillRule: 'evenodd',
      }}
      transform="translate(3.894 8.741)"
    />
  </svg>
);

export default SvgComponent;
