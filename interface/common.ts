import { ReactNode } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

export interface IMenuItem {
  label: string;
  index: string;
  path: string;
  icon?: any;
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
