import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Colxx } from '../common/CustomBootstrap';

const PromoCodeTitle = ({ title }) => {
  return (
    <Colxx xxs="12">
      <Card className="card d-flex mb-3">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <span className="align-middle d-inline-block">{title.name}</span>

            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              {title.startDate}
            </p>
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              {title.stopDate}
            </p>
            <div className="w-15 w-xs-100">
              {/* <Badge color={item.labelColor} pill> */}
              {title.discount}
              {/* </Badge> */}
            </div>
          </CardBody>
        </div>
      </Card>
    </Colxx>
  );
};

export default React.memo(PromoCodeTitle);
