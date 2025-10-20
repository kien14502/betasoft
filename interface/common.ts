import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

export interface IMenuItem {
  label: string;
  index: string;
  path: string;
  icon?: React.ForwardRefExoticComponent<
    Omit<AntdIconProps, 'ref'> & React.RefAttributes<HTMLSpanElement>
  >;
  children?: IMenuItem[] | null;
}

export interface Pagination {
  page?: number;
  page_size?: number;
}
