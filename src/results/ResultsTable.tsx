import React from 'react';
import { DataTable } from 'franklin-sites';
import ColumnConfiguration from '../model/ColumnConfiguration';
import '../styles/alert.scss';
import { SelectedRows, SortType, SortableColumns } from './types/resultsTypes';

const DEFAULT_COLUMN_WIDTH = 200;

type ResultsTableProps = {
  results: any[];
  columnNames: string[];
  selectedRows: SelectedRows;
  handleRowSelect: (rowId: string) => void;
  handleHeaderClick: (column: SortableColumns) => void;
  handleLoadMoreRows: any;
  totalNumberResults: number;
  nextUrl: string;
  sort: SortType;
};

const ResultsTable: React.FC<ResultsTableProps> = ({
  results = [],
  columnNames,
  selectedRows,
  handleRowSelect,
  handleHeaderClick,
  handleLoadMoreRows,
  sort,
  nextUrl,
  totalNumberResults,
}) => {
  const columns = columnNames.map(columnName => {
    let render;
    if (columnName in ColumnConfiguration) {
      render = (row: any) => ColumnConfiguration[columnName].render(row);
    } else {
      render = () => (
        <div className="warning">{`${columnName} has no render method`}</div>
      );
    }
    const attributes = ColumnConfiguration[columnName];
    return {
      label: attributes.label,
      name: columnName,
      render,
      sortable: columnName in SortableColumns,
      sorted: columnName === sort.column ? sort.direction : false,
      width: attributes.width || DEFAULT_COLUMN_WIDTH,
    };
  });
  return (
    <DataTable
      idKey="primaryAccession"
      columns={columns}
      data={results}
      selectable={true}
      selectedRows={selectedRows}
      onSelect={handleRowSelect}
      onHeaderClick={handleHeaderClick}
      onLoadMoreRows={handleLoadMoreRows}
      fixedRowCount={1}
      totalNumberRows={totalNumberResults}
      showHeader={true}
    />
  );
};
export default ResultsTable;
