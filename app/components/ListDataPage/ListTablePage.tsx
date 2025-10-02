import React from 'react';
import ListHeader, { ListHeaderProps } from './components/ListHeader';
import ListTableData from './components/ListTableData';
import { TableProps } from 'antd';
import ListFilter, { ListFilterProps } from './components/ListFilter';

interface ListDataPageProps {
  listHeader: ListHeaderProps;
  listFilter?: ListFilterProps;
  listTableData: TableProps;
}

export default function ListDataPage({ listHeader, listFilter, listTableData }: ListDataPageProps) {
  return (
    <div style={{ height: '100%', padding: 5 }}>
      <ListHeader {...listHeader} />
      {listFilter && <ListFilter {...listFilter} />}
      <ListTableData {...listTableData} />
    </div>
  );
}
