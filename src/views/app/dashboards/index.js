import React from 'react';
import { injectIntl } from 'react-intl';
import { Route } from 'react-router-dom';
import DashboardAnalyticsPage from './dashboard-analytics-page';
import 'react-datepicker/dist/react-datepicker.css';
import DashboardTable from './dashboard-table';

const Dashboards = ({ match }) => {
  return (
    <>
      <Route
        path={match.url}
        exact
        render={(props) => <DashboardAnalyticsPage {...props} />}
      />
      <Route
        path={`${match.url}/*`}
        exact
        render={(props) => <DashboardTable {...props} />}
      />
    </>
  );
};
export default injectIntl(Dashboards);
