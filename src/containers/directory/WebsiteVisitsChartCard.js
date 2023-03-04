import React from 'react';
import {
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { AreaChart } from 'components/charts';
// import { areaChartData } from 'data/charts';

const WebsiteVisitsChartCard = (props,{ className = '', controls = true }) => {
  return (
    <Card className={`${className} directory-filled-line-chart`}>
      <CardBody>
        <div className="float-left float-none-xs">
          <div className="d-inline-block">
            <h5 className="d-inline">
              <IntlMessages id="directory.website-visits" />
            </h5>
            <span className="text-muted text-small d-block">
              <IntlMessages id="directory.unique-visitors" />
            </span>
          </div>
        </div>
        {controls && (
          <div className="btn-group float-right float-none-xs mt-2">
            <UncontrolledDropdown>
              <DropdownToggle caret color="primary" className="btn-xs" outline>
                <IntlMessages id="directory.this-week" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <IntlMessages id="directory.last-week" />
                </DropdownItem>
                <DropdownItem>
                  <IntlMessages id="directory.this-month" />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )}
      </CardBody>

      <div className="chart card-body pt-0">
        <AreaChart shadow data={props.data} />
      </div>
    </Card>
  );
};

export default WebsiteVisitsChartCard;
