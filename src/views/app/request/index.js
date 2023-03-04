import ViewTable from 'utils/ReactTableCards';
import React, { Suspense, useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CONSTANTS from 'utils/CONSTANTS';
import { getReport } from 'utils/API/api';
import moment from 'moment';
import { Container, Spinner } from 'reactstrap';

const Report = ({ match }) => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getReport();
      if (res !== -1) {
        setReportData(
          res?.data?.data?.data.map((report, index) => {
            return {
              ...report,
              no: index + 1,
              advisor_name: report.Advisor.name,
              user_number: report.User.mobile,
              advisor_number: report.Advisor.mobile,
              advisor_category: report.Advisor.expertise,
              createdAt: moment(report.createdAt).local().format('Do MMMM, YYYY'),
              time: moment(report.createdAt).local().format('h:mm:ss a'),
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
        <Redirect exact from={`${match.url}/`} to={`${match.url}/complain`} />
        <Route
          path={`${match.url}/complain`}
          render={() =>
            !loading ? (
              <ViewTable
                headers={CONSTANTS.TABLE_HEADER.FEEDBACKS}
                items={reportData}
                advisorId={CONSTANTS.TABLE_ID.complain}
                filterParams="advisor_name"
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
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
};
export default Report;
