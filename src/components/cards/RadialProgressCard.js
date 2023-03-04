import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { CircularProgressbar } from 'react-circular-progressbar';

const countStyle = {
  marginTop: '9px',
  fontWeight: '800',
  fontSize: '17px',
  color: 'black',
};

const spanStyle = {
  marginTop: '10px',
  fontWeight: '400',
  fontSize: '17px',
  color: 'gray',
};

const RadialProgressCard = ({ title, activedeactivecount }) => {
  let percentage = 0;
  if (+activedeactivecount.active + activedeactivecount.deActive !== 0) {
    percentage =
      (+activedeactivecount.active /
        (+activedeactivecount.active + activedeactivecount.deActive)) *
      100;
  }

  return (
    <Card className="w-100">
      <CardBody className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">
          {title}
          <h2 style={countStyle}>Active: {activedeactivecount.active}</h2>
          <h2 style={spanStyle}>Block: {activedeactivecount.deActive}</h2>
        </CardTitle>

        <div className="progress-bar-circle">
          <CircularProgressbar
            strokeWidth={4}
            value={percentage}
            text={`${percentage.toFixed(0)}%`}
          />
        </div>
      </CardBody>
    </Card>
  );
};

RadialProgressCard.defaultProps = {
  title: 'title',
  activedeactivecount: {
    active: 0,
    deActive: 0,
  },
};

export default React.memo(RadialProgressCard);
