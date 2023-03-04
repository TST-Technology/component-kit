import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CouponDetails from './coupon-details';

const Todo = React.lazy(() =>
  import(/* webpackChunkName: "application-promocode" */ './promocode')
);

const Coupons = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/promocode`} />

      <Route
        path={`${match.url}/promoDetails`}
        render={(props) => <CouponDetails {...props} />}
      />

      <Route
        path={`${match.url}/promocode`}
        render={(props) => <Todo {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Coupons;
