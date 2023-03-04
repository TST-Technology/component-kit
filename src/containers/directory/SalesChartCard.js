import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { LineChart } from 'components/charts';

import { lineChartData } from 'data/charts';

const SalesChartCard = () => {
  return (
    <Card>
      <div className="position-absolute card-top-buttons">
        <UncontrolledDropdown>
          <DropdownToggle color="" className="btn btn-header-light icon-button">
            <i className="simple-icon-refresh" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <IntlMessages id="directory.sales" />
            </DropdownItem>
            <DropdownItem>
              <IntlMessages id="directory.orders" />
            </DropdownItem>
            <DropdownItem>
              <IntlMessages id="directory.refunds" />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <CardBody>
        <CardTitle>
          <IntlMessages id="directory.sales" />
        </CardTitle>
        <div className="directory-line-chart">
          <LineChart shadow data={lineChartData} />
        </div>
      </CardBody>
    </Card>
  );
};

export default SalesChartCard;
