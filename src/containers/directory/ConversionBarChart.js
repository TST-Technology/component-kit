import React, { useState } from 'react';
import {
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { BarChart } from 'components/charts';
import { getKey } from 'utils/function';
import { chartColor, chartColor10 } from 'utils/CONSTANTS';

const ConversionBarChart = ({ name, data }) => {
  const options = Object.keys(data);
  const [option, setOption] = useState(options.length !== 0 ? options[0] : []);
  if (options.length === 0 || data[option].data.length === 0) {
    return <></>;
  }

  const barChartData = {
    labels: data[option].labels,
    datasets: Object.keys(data[option].data[0]).map((barDataKey, index) => {
      return {
        label: barDataKey,
        borderColor: chartColor[index],
        backgroundColor: chartColor10[index],
        data: data[option].data.map((barData) => barData[barDataKey]),
        borderWidth: 2,
      };
    }),
  };

  return (
    <>
      <Card className="directory-filled-line-chart">
        <CardBody>
          <div className="float-left float-none-xs">
            <div className="d-inline-block">
              <h5 className="d-inline">
                <IntlMessages id={name} />
              </h5>
            </div>
          </div>

          <div className="btn-group float-right float-none-xs mt-2">
            <UncontrolledDropdown>
              <DropdownToggle
                caret
                color="secondary"
                className="btn-xs"
                outline
              >
                <IntlMessages id="directory.last-week" />
              </DropdownToggle>
              <DropdownMenu right>
                {options.map((optionItem) => (
                  <DropdownItem
                    key={optionItem}
                    onClick={() => setOption(optionItem)}
                  >
                    <IntlMessages id={getKey[optionItem]} />
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </CardBody>

        <div className="chart card-body pt-0">
          <BarChart shadow data={barChartData} />
        </div>
      </Card>
    </>
  );
};

export default React.memo(ConversionBarChart);
