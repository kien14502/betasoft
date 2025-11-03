import { ChartArea, LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

export interface IMenuItem {
  label: string;
  index: string;
  path: string;
  icon?: typeof ChartArea;
  children?: IMenuItem[] | null;
}

export interface Pagination {
  page?: number;
  page_size?: number;
}

export interface Tab {
  name: string;
  key: string;
  icon: ReactNode;
}
export interface FormProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  className?: string;
}

export type Icon = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;
