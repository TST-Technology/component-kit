import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'reactstrap';
import { getCouponDetails } from 'utils/API/api';
import CONSTANTS from 'utils/CONSTANTS';
import ViewTable from 'utils/ReactTableCards';
// import { getCouponDetails } from 'utils/API/api';

const CouponDetails = ({ location, match }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const currantCoupon = location.pathname.replace(`${match.path}/`, '');

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await getCouponDetails(currantCoupon);
      if (res !== -1) {
        setUser(
          res?.data?.data?.data.map((userData, index) => {
            return {
              ...userData,
              no: index + 1,
              ...userData?.User,
              createdTime: moment(userData?.createdAt)
                .local()
                .format('h:mm:ss a'),
              createdAt: moment(userData?.createdAt)
                .local()
                .format('dddd, MMMM Do YYYY'),
              mobileClick: [userData?.User?.mobile, userData?.User.id],
            };
          })
        );
      }
      setLoading(false);
    })();
  }, []);


  return (
    <>
      {!loading ? (
        <>
          <ViewTable
            headers={CONSTANTS.TABLE_HEADER.COUPON_USER}
            items={user}
            advisorId={CONSTANTS.TABLE_ID.couponUsage}
            filterParams="mobile"
          />
        </>
      ) : (
        <Container className="d-flex justify-content-center align-items-center">
          <Spinner
            animation="border"
            className="d-inline-flex m-2 "
            color="$theme-color-yellow-granola"
          />
        </Container>
      )}
    </>
  );
};

export default CouponDetails;
