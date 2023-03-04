import ViewTable from 'utils/ReactTableCards';
import React, { Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CONSTANTS from 'utils/CONSTANTS';
import { getAdvisorTransaction } from 'utils/API/api';
import moment from 'moment';

const Account = ({ match }) => {
  const [advisorTransaction, setAdvisorTransaction] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getAdvisorTransaction();
      if (res !== -1) {
        setAdvisorTransaction(
          res?.data?.data?.data.map((transaction, index) => {
            return {
              ...transaction,
              name: transaction?.Advisor?.name,
              createdAt: moment(transaction?.createdAt).local().format('Do MMMM, YYYY'),
              no: index + 1,
            };
          })
        );
      }
      setLoading(false);
    })();
  }, []);

  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        <Route
          path={`${match.url}/advisor-transaction`}
          render={() =>
            !loading ? (
              <ViewTable
                headers={CONSTANTS.TABLE_HEADER.ADVISORS_TRANSACTION}
                items={advisorTransaction}
                advisorId={CONSTANTS.TABLE_ID.adminTransaction}
                filterParams="name"
              />
            ) : (
              <></>
            )
          }
        />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
};
export default Account;
