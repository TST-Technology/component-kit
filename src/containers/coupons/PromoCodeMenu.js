/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classnames from 'classnames';

import IntlMessages from 'helpers/IntlMessages';
import ApplicationMenu from 'components/common/ApplicationMenu';
import { getTodoListWithFilter } from 'redux/actions';

const PromoCodeMenu = ({
  todoItems,
  filter,
  allTodoItems,
  loaded,
  getTodoListWithFilterAction,
}) => {
  const addFilter = (column, value) => {
    getTodoListWithFilterAction(column, value);
  };

  return (
    <ApplicationMenu>
      <PerfectScrollbar
        options={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <div className="p-4">
          <p className="text-muted text-small">
            <IntlMessages id="promocode.status" />
          </p>
          <ul className="list-unstyled mb-5">
            <NavItem className={classnames({ active: !filter })}>
              <NavLink to="#" onClick={() => addFilter('', '')} location={{}}>
                <i className="simple-icon-reload" />
                <IntlMessages id="promocode.total_coupon" />
                <span className="float-right">
                  {loaded && allTodoItems.length}
                </span>
              </NavLink>
            </NavItem>
            <NavItem
              className={classnames({
                active:
                  filter &&
                  filter.column === 'status' &&
                  filter.value === 'INACTIVE',
              })}
            >
              <NavLink
                location={{}}
                to="#"
                onClick={() => addFilter('status', 'INACTIVE')}
              >
                <i className="simple-icon-refresh" />
                <IntlMessages id="promocode.inactive-coupon" />
                <span className="float-right">
                  {loaded &&
                    todoItems.filter((x) => x.status === 'INACTIVE').length}
                </span>
              </NavLink>
            </NavItem>
            <NavItem
              className={classnames({
                active:
                  filter &&
                  filter.column === 'status' &&
                  filter.value === 'ACTIVE',
              })}
            >
              <NavLink
                to="#"
                location={{}}
                onClick={() => addFilter('status', 'ACTIVE')}
              >
                <i className="simple-icon-check" />
                <IntlMessages id="promocode.active-coupon" />
                <span className="float-right">
                  {loaded &&
                    todoItems.filter((x) => x.status === 'ACTIVE').length}
                </span>
              </NavLink>
            </NavItem>
          </ul>
        </div>
      </PerfectScrollbar>
    </ApplicationMenu>
  );
};

const mapStateToProps = ({ todoApp }) => {
  const { todoItems, filter, allTodoItems, loaded, labels, categories } =
    todoApp;

  return {
    todoItems,
    filter,
    allTodoItems,
    loaded,
    labels,
    categories,
  };
};
export default connect(mapStateToProps, {
  getTodoListWithFilterAction: getTodoListWithFilter,
})(PromoCodeMenu);
