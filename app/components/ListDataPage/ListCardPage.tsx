import React from "react";
import ListHeader, { ListHeaderProps } from "./components/ListHeader";
import ListFilter, { ListFilterProps } from "./components/ListFilter";
import ListCardData, { ListCardDataProps } from "./components/ListCardData";
interface ListDataPageProps {
  listHeader: ListHeaderProps;
  listFilter?: ListFilterProps;
  listCardData: ListCardDataProps;
}

function ListCardPage({
  listHeader,
  listFilter,
  listCardData,
}: ListDataPageProps) {
  return (
    <div style={{ height: "100%", padding: 5 }}>
      <ListHeader {...listHeader} />
      {listFilter && <ListFilter {...listFilter} />}
      <ListCardData {...listCardData} />
    </div>
  );
}

export default ListCardPage;
