import React from 'react';
import { Row, Card, CardBody, Button, Container, Spinner } from 'reactstrap';

import { Colxx } from 'components/common/CustomBootstrap';
import { SmallLineChart } from 'components/charts';

import { smallChartData1, smallChartData2 } from 'data/charts';
import IntlMessages from 'helpers/IntlMessages';
import LargeSwitch from 'containers/forms/LargeSwitch';

const SmallLineCharts = ({
  itemClass = 'directory-small-chart',
  callRecords = 0,
  isAdvisor,
  onBlockHandler,
  advisorData,
  loading,
  onApprove,
  onReject,
}) => {
  const isKyc = (userKyc) => {
    if (userKyc.isApproved === true) return false;
    if (userKyc.isRejected) return false;
    return true;
  };


  return (
    <Row>
      <Colxx xxs="6" sm="6" lg="6" xl="6" className="mb-4">
        <Card className={itemClass}>
          <CardBody>
            <IntlMessages id="userinfo.wallet" />
            <SmallLineChart
              data={smallChartData1}
              count={`₹ ${advisorData?.Wallet?.amount !== undefined
                ? advisorData?.Wallet?.amount
                : 0
                }`}
            />
          </CardBody>
        </Card>
      </Colxx>
      <Colxx xxs="6" sm="6" lg="6" xl="6" className="mb-4">
        <Card className={itemClass}>
          <CardBody>
            <IntlMessages id="userinfo.call" />
            <SmallLineChart data={smallChartData2}

              count={`${callRecords !== undefined
                ? callRecords.length
                : 0
                }`} />

          </CardBody>
        </Card>
      </Colxx>
      {isAdvisor && (
        <>
          <Colxx xxs="6" sm="6" lg="6" xl="6" className="mb-4">
            <Card className={itemClass}>
              <Container
                style={{
                  position: 'absolute',
                  bottom: '114px',
                  left: '8px',
                  fontSize: '17px',
                }}
              >
                <IntlMessages id="userinfo.action" />
              </Container>
              <Container
                style={{ position: 'absolute', bottom: '48px', left: '8px' }}
              >
                {!loading ? (
                  <LargeSwitch
                    isBlock={!advisorData.isBlocked}
                    onChange={onBlockHandler}
                    isAdvisor
                  />
                ) : (
                  loading && (
                    <Container className="d-flex justify-content-center align-items-center">
                      <Spinner
                        animation="border"
                        className="d-inline-flex m-2 "
                        color="$theme-color-yellow-granola"
                      />
                    </Container>
                  )
                )}
              </Container>
            </Card>
          </Colxx>
          {advisorData?.Kyc && isKyc(advisorData?.Kyc) && (
            <Colxx xxs="6" sm="6" lg="6" xl="6" className="mb-4">
              <Card className={itemClass}>
                <Container
                  style={{
                    position: 'absolute',
                    bottom: '114px',
                    left: '8px',
                    fontSize: '17px',
                  }}
                >
                  <IntlMessages id="advisorinfo.transaction" />
                </Container>
                <Container
                  style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    position: 'absolute',
                    bottom: '63px',
                    right: '33px',
                  }}
                >
                  <Button
                    outline
                    color="success"
                    onClick={() => onApprove(advisorData)}
                  >
                    Approve
                  </Button>
                  <Button
                    outline
                    color="danger"
                    onClick={() => onReject(advisorData)}
                  >
                    Reject
                  </Button>
                </Container>
              </Card>
            </Colxx>
          )}
        </>
      )}
    </Row>
  );
};

export default SmallLineCharts;
