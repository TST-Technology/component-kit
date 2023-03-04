/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, CardBody, CardTitle } from 'reactstrap';
import { CSVLink } from 'react-csv';
import { useTable, usePagination, useSortBy } from 'react-table';
import classnames from 'classnames';

import IntlMessages from 'helpers/IntlMessages';
import DatatablePagination from 'components/DatatablePagination';
import Search from 'utils/Search';

function Table({ columns, data, divided = false, defaultPageSize = 10 }) {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table
        {...getTableProps()}
        className={`r-table table ${classnames({ 'table-divided': divided })}`}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'sorted-desc'
                        : 'sorted-asc'
                      : ''
                  }
                >
                  {column.render('Header')}
                  <span />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`td_${cellIndex}`}
                    {...cell.getCellProps({
                      className: cell.column.cellClass,
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <DatatablePagination
        page={pageIndex}
        advisor={pageCount}
        canPrevious={canPreviousPage}
        canNext={canNextPage}
        pageSizeOptions={[10, 20, 30, 40, 50]}
        showPageSizeOptions={[10, 20, 30, 40, 50]}
        showPageJump={false}
        defaultPageSize={pageSize}
        onPageChange={(p) => gotoPage(p)}
        onPageSizeChange={(s) => setPageSize(s)}
        paginationMaxSize={pageCount}
      />
    </>
  );
}

const ViewTable = ({ headers, items, advisorId, filterParams = 'id' }) => {
  const [itemsList, setItemList] = useState([]);
  useEffect(() => {
    setItemList(items);
  }, [items]);

  const isDataEmpty = items.length <= 0;
  const CSVData = [];

  const filterItemHandler = (filterData) => {
    setItemList(
      items.filter((item) => {
        return item[filterParams].toString().includes(filterData);
      })
    );
  };
  if (!isDataEmpty) {
    CSVData[0] = Object.keys(items[0]);
    items.map((item, index) => {
      CSVData[index + 1] = Object.values(item);
      return 0;
    });
  }

  return (
    <>
      <Card className="mb-4">
        <CardBody style={{ overflowX: 'scroll' }}>
          <CardTitle className="btn-export">
            <IntlMessages id={advisorId} />

            {!isDataEmpty && (
              <CSVLink data={CSVData}>
                <Button outline color="primary">
                  <IntlMessages id="button.export" />
                </Button>
              </CSVLink>
            )}
          </CardTitle>
          {isDataEmpty && (
            <Alert color="danger" className="mt-4">
              <IntlMessages id="alert.danger-text" />
            </Alert>
          )}
          {!isDataEmpty && <Search onChange={filterItemHandler} />}
          {itemsList.length !== 0 && (
            <Table columns={headers} data={itemsList} />
          )}
          {!isDataEmpty && itemsList.length === 0 && (
            <Alert color="danger" className="mt-4">
              <IntlMessages id="alert.danger-text" />
            </Alert>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default ViewTable;
