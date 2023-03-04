import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Card, CardBody, Row, Spinner } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';

import Breadcrumb from 'containers/navs/Breadcrumb';
import IntlMessages from 'helpers/IntlMessages';
import DatePicker from 'react-datepicker';
import { getAnalytics } from 'utils/API/api';
import RadialProgressCard from 'components/cards/RadialProgressCard';
import GetDate from 'utils/GetTime';
import LableValueCard from 'components/cards/LableValueCard';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

// const chartCommonFormate = {
//   labels: [],
//   data: [],
// };

const activeDeactive = {
  active: 0,
  deActive: 0,
};

const GetPrefixSuffixValue = (item) => {
  let result = item.pre ? item.pre : '';
  result += item.value;
  result += item.post ? item.post : '';
  return result;
};

// const dailyMonthlyInitState = {
//   weekly: chartCommonFormate,
//   monthly: chartCommonFormate,
// };

const AnalyticsCountInit = [
  {
    id: 'analytics1',
    key: 'totalRecharge',
    label: 'Total Amount Recharged',
    value: 0,
    pre: '₹ ',
  },
  {
    id: 'analytics2',
    key: 'remainingUserBallence',
    label: 'Balance in User Wallet',
    value: 0,
    pre: '₹ ',
  },
  {
    id: 'analytics3',
    key: 'avgCallDuration',
    label: 'Avg Call Duration',
    value: 0,
    post: ' Minute',
  },
  {
    id: 'analytics4',
    key: 'avgNPS',
    label: 'Average NPS',
    value: 0,
    post: ' Rating',
  },
];

// const userIntial = {
//   [getPrivesDate(13)]: 0,
//   [getPrivesDate(12)]: 0,
//   [getPrivesDate(11)]: 0,
//   [getPrivesDate(10)]: 0,
//   [getPrivesDate(9)]: 0,
//   [getPrivesDate(8)]: 0,
//   [getPrivesDate(7)]: 0,
//   [getPrivesDate(6)]: 0,
//   [getPrivesDate(5)]: 0,
//   [getPrivesDate(4)]: 0,
//   [getPrivesDate(3)]: 0,
//   [getPrivesDate(2)]: 0,
//   [getPrivesDate(1)]: 0,
//   [getPrivesDate(0)]: 0,
// };

// const advisorIntial = {
//   [getPrivesDate(13)]: 0,
//   [getPrivesDate(12)]: 0,
//   [getPrivesDate(11)]: 0,
//   [getPrivesDate(10)]: 0,
//   [getPrivesDate(9)]: 0,
//   [getPrivesDate(8)]: 0,
//   [getPrivesDate(7)]: 0,
//   [getPrivesDate(6)]: 0,
//   [getPrivesDate(5)]: 0,
//   [getPrivesDate(4)]: 0,
//   [getPrivesDate(3)]: 0,
//   [getPrivesDate(2)]: 0,
//   [getPrivesDate(1)]: 0,
//   [getPrivesDate(0)]: 0,
// };

// const transactionIntialDaily = {
//   [getPrivesDate(13)]: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   [getPrivesDate(12)]: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   [getPrivesDate(11)]: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   [getPrivesDate(10)]: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   [getPrivesDate(9)]: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   [getPrivesDate(8)]: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   [getPrivesDate(7)]: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   [getPrivesDate(6)]: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   [getPrivesDate(5)]: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   [getPrivesDate(4)]: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   [getPrivesDate(3)]: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   [getPrivesDate(2)]: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   [getPrivesDate(1)]: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   [getPrivesDate(0)]: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
// };

// const userIntialMonth = {
//   1: 0,
//   2: 0,
//   3: 0,
//   4: 0,
//   5: 0,
//   6: 0,
//   7: 0,
//   8: 0,
//   9: 0,
//   10: 0,
//   11: 0,
//   12: 0,
// };

// const advisorsIntialMonth = {
//   1: 0,
//   2: 0,
//   3: 0,
//   4: 0,
//   5: 0,
//   6: 0,
//   7: 0,
//   8: 0,
//   9: 0,
//   10: 0,
//   11: 0,
//   12: 0,
// };

// const transactionIntialMonth = {
//   1: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   2: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   3: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   4: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   5: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   6: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   7: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   8: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   9: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   10: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   11: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
//   12: {
//     Deposit: 0,
//     Withdraw: 0,
//   },
// };

// const analyticsSummery = {
//   labels: ['a', 'b'],
//   data: ['0', '0'],
// };

const analyticsUser = {
  active: 0,
  deActive: 0,
};

const advisorsDataMain = {
  Lawyer: {
    active: 0,
    deActive: 0,
  },
  Sexologist: {
    active: 0,
    deActive: 0,
  },
  Psychiatrist: {
    active: 0,
    deActive: 0,
  },
};

const DashboardAnalytics = ({ match, intl }) => {
  // Date Piker
  const [startDateRange, setStartDateRange] = useState();
  const [endDateRange, setEndDateRange] = useState();
  const { messages } = intl;

  // Analytics Data Daily & Monthly
  // const [userData, setUserData] = useState(dailyMonthlyInitState);
  // const [transactionData, setTransactionData] = useState(dailyMonthlyInitState);
  // const [advisorData, setAdvisorData] = useState(dailyMonthlyInitState);

  // Loader
  const [loading, setLoading] = useState(false);

  // Analytics Data Between Two Days
  // const [advisorComparison, setAdvisorComparison] = useState(analyticsSummery);
  const [analyticUser, setAnalyticUser] = useState(analyticsUser);
  const [shareAnalytics, setShareAnalytics] = useState([]);

  const [psychiatrist, setPsychiatrist] = useState(
    advisorsDataMain.Psychiatrist
  );
  const [analyticsCount, setAnalyticsCount] = useState(AnalyticsCountInit);
  const [lawyer, setLawyer] = useState(advisorsDataMain.Lawyer);
  const [sexologist, setSexologist] = useState(advisorsDataMain.Sexologist);
  // const [payouts, setPayouts] = useState({ status: [], count: [] });
  // const [nps, setNps] = useState({ status: [], count: [] });
  // const [callData, setCallData] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setAnalyticUser(activeDeactive);
      setPsychiatrist(activeDeactive);
      setLawyer(activeDeactive);
      setSexologist(activeDeactive);

      let date = '';
      if (startDateRange && endDateRange) {
        date = `?startDate=${GetDate(startDateRange, 'L')}&endDate= ${GetDate(
          endDateRange,
          'L'
        )}`;
      }

      const res = await getAnalytics(date);
      if (res !== -1) {
        const apiRes = res[0]?.data?.data?.data;
        setLoading(false);

        // User
        apiRes?.users.map((e) => {
          if (e.isBlocked === 0) {
            analyticsUser.active = e.count;
          } else {
            analyticsUser.deActive = e.count;
          }
          return 0;
        });

        AnalyticsCountInit.map((Item, index) => {
          AnalyticsCountInit[index].value = apiRes[Item.key];
          return 0;
        });

        // advisors
        apiRes?.advisors.map((advaiser) => {
          if (advisorsDataMain[advaiser.expertise]) {
            if (advaiser.isBlocked === 0) {
              advisorsDataMain[advaiser.expertise].active = advaiser.count;
            } else {
              advisorsDataMain[advaiser.expertise].deActive = advaiser.count;
            }
          }
          return 0;
        });

        // payouts
        const payoutStatus = [];
        const payoutCount = [];
        apiRes?.payouts.map((payout) => {
          if (payout?.status !== 'success') {
            payoutStatus.push(payout?.status);
            payoutCount.push(payout?.count);
          }

          return 0;
        });

        // nps
        const npsRating = [];
        const npsCount = [];
        apiRes?.nps.map((payout) => {
          npsRating.push(`${payout?.rating} Start`);
          npsCount.push(payout?.count);
          return 0;
        });

        const shareRes = res[1]?.data?.data;
        const shareAnalyticsData = [
          {
            id: `share0`,
            label: 'Calls',
            value: apiRes?.calls.reduce(
              (total, callType) => total + callType.count,
              0
            ),
            pre: '₹ ',
          },
          {
            id: `share1`,
            label: 'Widur Share',
            value: shareRes?.widurShare,
            pre: '₹ ',
          },
          {
            id: `share2`,
            label: 'Advisor Share',
            value: shareRes?.advisorShare,
            pre: '₹ ',
          },
          {
            id: `share3`,
            label: 'Widur Share Percent',
            value: shareRes?.widurSharePercent
              ? shareRes?.widurSharePercent
              : 0,
            post: ' %',
          },
        ];

        setShareAnalytics(shareAnalyticsData);
        setAnalyticUser({
          active: analyticsUser.active,
          deActive: analyticsUser.deActive,
        });
        setPsychiatrist({
          active: advisorsDataMain.Psychiatrist.active,
          deActive: advisorsDataMain.Psychiatrist.deActive,
        });
        setLawyer({
          active: advisorsDataMain.Lawyer.active,
          deActive: advisorsDataMain.Lawyer.deActive,
        });
        setSexologist({
          active: advisorsDataMain.Sexologist.active,
          deActive: advisorsDataMain.Sexologist.deActive,
        });
        setAnalyticsCount(AnalyticsCountInit);
        setLoading(false);
      }
    })();
  }, [startDateRange, endDateRange]);

  const progressCard = [
    {
      id: 'progress1',
      title: messages['directory.user'],
      activedeactivecount: analyticUser,
    },
    {
      id: 'progress2',
      title: messages['directory.lawyer'],
      activedeactivecount: lawyer,
    },
    {
      id: 'progress3',
      title: messages['directory.sexologist'],
      activedeactivecount: sexologist,
    },
    {
      id: 'progress4',
      title: messages['directory.psychiatrist'],
      activedeactivecount: psychiatrist,
    },
  ];

  // const chartDataCards = [
  //   {
  //     id: 'chart1',
  //     name: 'directory.user-Daily',
  //     // data: userData,
  //   },
  //   {
  //     id: 'chart2',
  //     name: 'directory.advisors',
  //     // data: advisorData,
  //   },
  // ];

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Dashboard" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" xl="12" className="mb-4">
          <Card>
            <CardBody>
              <IntlMessages id="form-components.date-range" />
              {loading && (
                <Spinner
                  animation="border"
                  className="d-inline-flex ml-2 smallLoader"
                  color="$theme-color-yellow-granola"
                  style={{
                    padding: '0px',
                    width: '0.8rem',
                    height: '.8rem',
                  }}
                />
              )}
              <Row className="my-3">
                <Colxx xxs="6">
                  <IntlMessages id="form-components.date-start" />
                  <DatePicker
                    selected={startDateRange}
                    selectsStart
                    startDate={startDateRange}
                    endDate={endDateRange}
                    onChange={setStartDateRange}
                    placeholderText={messages['form-components.empty']}
                  />
                </Colxx>
                <Colxx xxs="6">
                  <IntlMessages id="form-components.date-end" />
                  <DatePicker
                    selected={endDateRange}
                    selectsEnd
                    startDate={startDateRange}
                    endDate={endDateRange}
                    onChange={setEndDateRange}
                    placeholderText={messages['form-components.empty']}
                  />
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row>
        {analyticsCount.map((items) => (
          <Colxx xl="3" lg="6" className="mb-4" key={items.id}>
            <Link to={`${match.url}/${items.label.replaceAll(' ', '')}`}>
              <LableValueCard
                title={items.label}
                value={GetPrefixSuffixValue(items)}
              />
            </Link>
          </Colxx>
        ))}
      </Row>
      <Row>
        {shareAnalytics.map((items) => (
          <Colxx xl="3" lg="6" className="mb-4" key={items.id}>
            <Link to={`${match.url}/${items.label}`}>
              <LableValueCard
                title={items.label}
                value={GetPrefixSuffixValue(items)}
              />
            </Link>
          </Colxx>
        ))}
      </Row>
      <Row>
        {progressCard.map((card) => (
          <Colxx xl="3" lg="6" className="mb-4" key={card.id}>
            <RadialProgressCard
              title={card.title}
              activedeactivecount={card.activedeactivecount}
            />
          </Colxx>
        ))}
      </Row>

      {/* <Row>
            <Colxx xl="4" lg="6" md="12" className="mb-4">
              <ProductCategoriesDoughnut
                name="directory.product-payout"
                data={payouts}
              />
            </Colxx>
            <Colxx xl="4" lg="6" md="12" className="mb-4">
              <NavLink to="/app/dashboards/calls">
                <ProfileStatuses
                  cardClass="dashboard-progress"
                  data={callData}
                />
              </NavLink>
            </Colxx>
            <Colxx xl="4" lg="6" md="12" className="mb-4">
              <ProductCategoriesDoughnut
                name="directory.product-rating"
                data={nps}
              />
            </Colxx>
          </Row>
          <Row>
            {chartDataCards.map((chart) => (
              <Colxx key={chart.id} lg="12" xl="6">
                <ConversionRatesChartCard name={chart.name} data={chart.data} />
              </Colxx>
            ))}
            <Colxx lg="12" xl="6" className="mt-4">
              <ConversionBarChart
                name="directory.transaction"
                // data={transactionData}
              />
            </Colxx>
            <Colxx lg="12" xl="6" className="mt-4">
              <ProductCategoriesPolarArea
                name="dashboards.analytics-summary"
                // {...advisorComparison}
              />
            </Colxx>
          </Row> */}
    </>
  );
};
export default injectIntl(DashboardAnalytics);
