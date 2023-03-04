import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

const countStyle = {
  marginTop: '9px',
  fontWeight: '800',
};

const LableValueCard = ({ title, value }) => {
  return (
    <Card className="w-100">
      <CardBody className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">
          {title}
          <h2 style={countStyle}>{value}</h2>
        </CardTitle>
      </CardBody>
    </Card>
  );
};

LableValueCard.defaultProps = {
  title: 'title',
  value: 0,
};

export default React.memo(LableValueCard);
