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
import { AreaChart } from 'components/charts';
import { ThemeColors } from 'helpers/ThemeColors';
import { getKey } from 'utils/function';

const ConversionRatesChartCard = ({ data, name }) => {
  const colors = ThemeColors();
  const options = Object.keys(data);
  const [option, setOption] = useState(options[0]);
  if (options.length === 0) {
    return <></>;
  }
  const conversionChartData = {
    labels: data[option].labels,
    datasets: [
      {
        label: '',
        data: data[option].data,
        borderColor: colors.themeColor2,
        pointBackgroundColor: colors.foregroundColor,
        pointBorderColor: colors.themeColor2,
        pointHoverBackgroundColor: colors.themeColor2,
        pointHoverBorderColor: colors.foregroundColor,
        pointRadius: 4,
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        fill: true,
        borderWidth: 2,
        backgroundColor: colors.themeColor2_10,
      },
    ],
  };

  return (
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
            <DropdownToggle caret color="secondary" className="btn-xs" outline>
              <IntlMessages id={getKey[option]} />
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
        <AreaChart shadow data={conversionChartData} />
      </div>
    </Card>
  );
};

export default React.memo(ConversionRatesChartCard);
