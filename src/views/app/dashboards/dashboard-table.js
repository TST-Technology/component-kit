import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'reactstrap';
import { getAllCallsDetails, getAllNPSsDetails } from 'utils/API/api';
import CONSTANTS from 'utils/CONSTANTS';
import {
  AnalyticscallRecordsParsers,
  AnalyticsNPSRecordsParsers,
} from 'utils/function';
import ViewTable from 'utils/ReactTableCards';

const getTableHader = {
  Calls: CONSTANTS.TABLE_HEADER.DASHBOARD_CALL_RECORDS,
  AverageNPS: CONSTANTS.TABLE_HEADER.DASHBOARD_NPS_RECORDS,
};

const getFilterPeramater = {
  Calls: 'mobile',
  AverageNPS: 'mobile',
};

const DashboardTable = ({ location }) => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const CardId = location.pathname.replace(`/app/dashboards/`, '');

  useEffect(() => {
    (async () => {
      setLoading(true);

      if (CardId === 'Calls') {
        const res = await getAllCallsDetails();
        if (res !== -1) {
          setAnalyticsData(AnalyticscallRecordsParsers(res?.data?.data?.data));
          setLoading(false);
        }
      }

      if (CardId === 'AverageNPS') {
        const res = await getAllNPSsDetails();
        if (res !== -1) {
          setAnalyticsData(AnalyticsNPSRecordsParsers(res?.data?.data?.data));
          setLoading(false);
        }
      }
    })();
  }, [CardId]);
  return (
    <>
      {!loading ? (
        <ViewTable
          headers={getTableHader[CardId]}
          items={analyticsData}
          advisorId={CONSTANTS.TABLE_ID[CardId]}
          filterParams={getFilterPeramater[CardId]}
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
      )}
    </>
  );
};

export default DashboardTable;
