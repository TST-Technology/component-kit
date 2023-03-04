import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner } from 'reactstrap';
import moment from 'moment';
import { parsePhoneNumber } from 'libphonenumber-js';
import { Colxx } from 'components/common/CustomBootstrap';
import GradientWithRadialProgressCard from 'components/cards/GradientWithRadialProgressCard';
import SmallLineCharts from 'containers/directory/SmallLineCharts';
import { injectIntl } from 'react-intl';
import { getUserAllDetails, updateUserAction } from 'utils/API/api';
import UserTableBody from './user-table-body';

const UserInfo = ({ userID }) => {
  const [userTransaction, setUserTransaction] = useState([]);
  const [userCallRecord, setUserCallRecord] = useState([]);
  const [loginHistory, setLoginHistory] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [userChatRecord, setUserChatRecord] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getUserAllDetails(userID );
      if (res !== -1) {
        setUserTransaction(res[0]?.data?.data?.data);
        setUserDetails(res[1]?.data?.data?.data[0]);
        setUserCallRecord(
          res[2]?.data?.data?.data.map((record) => {
            return {
              ...record,
              createdAt: moment(record.createdAt)
                .local()
                .format('Do MMMM, YYYY'),
              createdTime: moment(record.createdAt)
                .local()
                .format('h:mm:ss a')
            };
          })
        );
        setLoginHistory(res[3]?.data?.data?.data);
        setUserChatRecord(res[4]?.data?.data?.data); 
        
      }
    })();
  }, []);

  const blockStatusChangeHandler = (flag) => {
    (async () => {
      const res = await updateUserAction(userID);
      if (res !== -1) {
        setUserDetails((previous) => {
          return { ...previous, isBlocked: flag };
        });
      } else {
        setUserDetails((previous) => {
          return { ...previous, isBlocked: !flag };
        });
      }
    })();
  };
  return (
    <>
      <Row>
        <Colxx lg="12" md="6" xl="4">
          <Row>
            <Colxx lg="4" xl="12" className="mb-4">
              {userDetails?.mobile ? (
                <GradientWithRadialProgressCard
                  icon="iconsminds-male"
                  detail="User's Mobile Number"
                  title={parsePhoneNumber(
                    `+${userDetails?.mobile}`
                  ).formatInternational()}
                  lastOpenDate={userDetails?.updatedAt}
                  isBlock={userDetails?.isBlocked}
                  onBlockStatusChange={blockStatusChangeHandler}
                />
              ) : (
                <Container className="d-flex justify-content-center align-items-center">
                  <Spinner
                    animation="border"
                    className="d-inline-flex m-2 "
                    color="$theme-color-yellow-granola"
                  />
                </Container>
              )}
            </Colxx>
          </Row>
        </Colxx>

        <Colxx lg="12" xl="8" className="mb-4">
          <SmallLineCharts advisorData={userDetails} callRecords={userCallRecord} />
        </Colxx>
      </Row>
      <Row>
        <UserTableBody
          userTransaction={userTransaction}
          userCallRecord={userCallRecord}
          userChatRecord={userChatRecord}
          loginHistory={loginHistory}
        />
      </Row>
    </>
  );
};
export default injectIntl(UserInfo);
