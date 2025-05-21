import * as React from 'react';
import type { SVGProps } from 'react';
const SvgFavicon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <defs>
      <style>{'.favicon_svg__b{fill:#fff}'}</style>
    </defs>
    <path
      d="M0 0h24v24H0z"
      style={{
        fill: 'transparent',
      }}
    />
    <path
      d="M23.5 14.772c0 .067 0 .133-.069.133a.15.15 0 0 1-.138-.133c-.207-.266-10.675-11.323-11.157-11.723-.207-.2-.275-.133-.482.067C11.588 3.182.707 14.639.569 14.838c-.069.067-.138.067-.138-.067a10.9 10.9 0 0 1-.413-3.663 10.34 10.34 0 0 1 1.515-5.062A11.45 11.45 0 0 1 9.384.318 11.83 11.83 0 0 1 20.61 3.582a10.9 10.9 0 0 1 3.237 6.261 8.8 8.8 0 0 1 .138 1.932 15 15 0 0 1-.485 2.997"
      className="favicon_svg__b"
    />
    <path
      d="M3.531 20.034c-.069-.067-.138-.133 0-.266s8.195-8.593 8.402-8.793c.069-.067.138-.067.138 0 .275.333 8.2 8.726 8.4 8.859.069.067.069.133-.069.133a9.3 9.3 0 0 1-1.515 1.266 11.8 11.8 0 0 1-5.923 2.131 6 6 0 0 1-1.1.067 11.9 11.9 0 0 1-8.333-3.397"
      className="favicon_svg__b"
    />
  </svg>
);
export default SvgFavicon;
