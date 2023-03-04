import React, { Suspense, useState, useEffect } from 'react';
import { Container, Spinner } from 'reactstrap';
import moment from 'moment';
import { Redirect, Route, Switch } from 'react-router-dom';
import CONSTANTS, { TIME_DIFFERENT } from 'utils/CONSTANTS';
import ViewTable from 'utils/ReactTableCards';
import { getUsers, updateUserAction } from 'utils/API/api';

import UserInfo from './userInfo';

const Directorys = ({ match, location }) => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const CurrentMobileNumber = location.pathname.replace(
    `${match.url}/userinfo/`,
    ''
  );

  const updateAction = (user) => {
    (async () => {
      setLoading(true);
      await updateUserAction(user.id);
      setRefresh((previous) => !previous);
      setLoading(false);
    })();
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getUsers();
      if (res !== -1) {
        setUserList(
          res?.data?.data?.data.map((user, index) => {
            // const parsedPhoneNumber = parsePhoneNumber(
            //   `+${user?.mobile}`
            // ).formatInternational();
            const today = moment(new Date().toISOString());
            const lastDate = moment(user.updatedAt);
            return {
              ...user,
              no: index + 1,
              mobile: [user?.mobile, user.id],
              amount: user?.Wallet?.amount,
              lastOpen: TIME_DIFFERENT(today, lastDate),
              action: [!user.isBlocked, () => updateAction(user)],
            };
          })
        );
      }
      setLoading(false);
    })();
  }, [refresh]);

  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/userlist`} /> */}
        <Route
          path={`${match.url}/userlist`}
          render={() =>
            !loading ? (
              <ViewTable
                headers={CONSTANTS.TABLE_HEADER.USER_LIST}
                items={userList}
                advisorId={CONSTANTS.TABLE_ID.user}
                filterParams="mobile"
              />
            ) : (
              <>
                <Container className="d-flex justify-content-center align-items-center">
                  <Spinner
                    animation="border"
                    className="d-inline-flex m-2 "
                    color="$theme-color-yellow-granola"
                  />
                </Container>
              </>
            )
          }
        />
        <Route
          path={`${match.url}/userinfo`}
          render={(props) => (
            <UserInfo {...props} userID={CurrentMobileNumber} />
          )}
        />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
};
export default Directorys;
