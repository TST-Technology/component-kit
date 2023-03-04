import LargeSwitch from 'containers/forms/LargeSwitch';
import moment from 'moment';
import React from 'react';
import { Card, CardBody } from 'reactstrap';

const GradientWithRadialProgressCard = ({
  icon = 'iconsminds-bell',
  title = 'title',
  detail = 'detail',
  isBlock = false,
  onBlockStatusChange,
  lastOpenDate,
  userToken,
}) => {
  return (
    <>
      <Card className="progress-banner">
        <CardBody className="justify-content-between d-flex flex-row align-items-center">
          <div>
            <i
              className={`${icon} mr-2 text-white align-text-bottom d-inline-block`}
            />

            <section
              style={{ position: 'absolute', right: '20px', top: '26px' }}
            >
              <LargeSwitch isBlock={!isBlock} onChange={onBlockStatusChange} />
            </section>

            <div>
              <p className="text-small text-white">{detail}</p>
              <p className="lead text-white">{title}</p>
              <p className="text-small text-white">{`Last Open : ${moment(
                lastOpenDate.createdAt
              ).format('Do MMMM, YYYY h:mm:ss a')}`}</p>
            </div>
          </div>
          <div className="progress-bar-circle progress-bar-banner position-relative" />
        </CardBody>
      </Card>
      <p
        style={{
          color: '#000 !important',
          width: '100%',
          marginTop: '17px',
          wordWrap: 'break-word',
        }}
      >{`Token : ${userToken}`}</p>
    </>
  );
};
export default React.memo(GradientWithRadialProgressCard);
