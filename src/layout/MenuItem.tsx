import type { FC, SVGProps } from 'react';

type Props = {
  label: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  path: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};
const MenuItem = ({ label, Icon, path, isActive, onClick }: Props) => (
  <a
    onClick={onClick}
    href={path}
    className={`flex items-center space-x-4 text-base transition-all ${
      isActive
        ? 'text-active fill-active font-bold'
        : 'text-white fill-white hover:text-active hover:fill-active'
    }`}
  >
    <Icon className="w-6 h-6" />
    <span className="md:inline hidden">{label}</span>
  </a>
);

export default MenuItem;
