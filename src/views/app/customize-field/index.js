import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CallSesstion from './call_session';
import SettingsPage from './setting';
import Banner from './banner';
import Expertise from './expertise';
import Image from './image';

const CallAmount = React.lazy(() =>
  import(/* webpackChunkName: "application-call-amount" */ './call_amount')
);

const Applications = ({ match, location }) => {
  const currentAdvisor = location.pathname.replace(
    `${match.url}/expertise/`,
    ''
  );
  const currentAdvisorTax = location.pathname.replace(
    `${match.url}/call-amount/`,
    ''
  );

  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        <Route
          path={`${match.url}/call-amount/${currentAdvisorTax.toLowerCase()}`}
          render={(props) => <CallAmount {...props} />}
        />
        <Route
          path={`${match.url}/expertise/${currentAdvisor}`}
          render={(props) => (
            <Expertise currentAdvisor={currentAdvisor} {...props} />
          )}
        />
        <Route path={`${match.url}/banner`} render={() => <Banner />} />
        <Route path={`${match.url}/image`} render={() => <Image />} />
        <Route
          path={`${match.url}/call_session`}
          render={(props) => <CallSesstion {...props} />}
        />
        <Route
          path={`${match.url}/setting`}
          render={(props) => <SettingsPage {...props} />}
        />

        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
};
export default Applications;
