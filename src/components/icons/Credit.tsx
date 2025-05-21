import type { SVGProps } from 'react';
const SvgCredit = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M0 0h24v24H0z"
      style={{
        fill: 'transparent',
      }}
    />
    <path
      d="M12 24A12 12 0 0 1 3.515 3.516a12 12 0 0 1 16.97 16.971A11.92 11.92 0 0 1 12 24M10.453 9.746v8.837a1.16 1.16 0 0 0 1.161 1.161h.775a1.16 1.16 0 0 0 1.161-1.161V9.746l3.5 3.652a1.16 1.16 0 0 0 1.659.021l.527-.533a1.16 1.16 0 0 0 .342-.827 1.14 1.14 0 0 0-.342-.812l-6.413-6.422a1.16 1.16 0 0 0-1.64 0l-6.426 6.422a1.16 1.16 0 0 0-.342.824 1.14 1.14 0 0 0 .342.815l.527.533a1.17 1.17 0 0 0 .823.339 1.15 1.15 0 0 0 .842-.36l3.5-3.65Z"
      transform="translate(0 -.001)"
    />
  </svg>
);
export default SvgCredit;
