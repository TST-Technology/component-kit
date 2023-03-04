import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
import Dashboards from './dashboards';
import Chatview from './chatview';
import Plans from './plans';
import Categorys from './category';

// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Admin = React.lazy(() =>
  import(/* webpackChunkName: "directory" */ './admin')
);
const Corporate = React.lazy(() =>
  import(/* webpackChunkName: "directory" */ './corporate')
);
const Directorys = React.lazy(() =>
  import(/* webpackChunkName: "directory" */ './directory')
);
const Advisor = React.lazy(() =>
  import(/* webpackChunkName: "advisor" */ './advisor')
);
const Coupons = React.lazy(() =>
  import(/* webpackChunkName: "coupons" */ './coupons')
);
const Account = React.lazy(() =>
  import(/* webpackChunkName: "account" */ './account')
);
const Request = React.lazy(() =>
  import(/* webpackChunkName: "menu" */ './request')
);
const Kyc = React.lazy(() => import(/* webpackChunkName: "kyc" */ './kyc'));

const CustomizeField = React.lazy(() =>
  import(/* webpackChunkName: "kyc" */ './customize-field')
);

const NoKyc = React.lazy(() => import(/* webpackChunkName: "kyc" */ './noKyc'));

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="directory-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboards`}
            />
            <Route
              path={`${match.url}/dashboards`}
              render={(props) => <Dashboards {...props} />}
            />
            <Route
              path={`${match.url}/corporate`}
              render={(props) => <Corporate {...props} />}
            />
            <Route
              path={`${match.url}/admin`}
              render={(props) => <Admin {...props} />}
            />
            <Route
              path={`${match.url}/plans`}
              render={(props) => <Plans {...props} />}
            />
            <Route
              path={`${match.url}/directory`}
              render={(props) => <Directorys {...props} />}
            />
            <Route
              path={`${match.url}/categories`}
              render={(props) => <Categorys {...props} />}
            />
            <Route
              path={`${match.url}/coupons`}
              render={(props) => <Coupons {...props} />}
            />
            <Route
              path={`${match.url}/advisor`}
              render={(props) => <Advisor {...props} />}
            />
            <Route
              path={`${match.url}/account`}
              render={(props) => <Account {...props} />}
            />
            <Route
              path={`${match.url}/request`}
              render={(props) => <Request {...props} />}
            />
            <Route
              path={`${match.url}/kyc`}
              render={(props) => <Kyc {...props} />}
            />
            <Route
              path={`${match.url}/customize-field`}
              render={(props) => <CustomizeField {...props} />}
            />
            <Route
              path={`${match.url}/chatinfo/:id`}
              render={() => <Chatview />}
            />
            <Route
              path={`${match.url}/noKyc`}
              render={(props) => <NoKyc {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
