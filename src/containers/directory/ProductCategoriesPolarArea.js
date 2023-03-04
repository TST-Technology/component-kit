import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { PolarAreaChart } from 'components/charts';
import { ThemeColors } from 'helpers/ThemeColors';

// import { polarAreaChartData } from 'data/charts';

const ProductCategoriesPolarArea = ({
  name,
  labels,
  data,
  chartClass = 'chart-container',
}) => {
  const colors = ThemeColors();

  const polarAreaChartData = {
    labels,
    datasets: [
      {
        data,
        borderWidth: 2,
        borderColor: [
          colors.themeColor4,
          colors.themeColor2,
          colors.themeColor5,
          colors.themeColor2,
          colors.themeColor2,
        ],
        backgroundColor: [
          colors.themeColor4_10,
          colors.themeColor2_10,
          colors.themeColor5_10,
          colors.themeColor2_10,
          colors.themeColor2_10,
        ],
      },
    ],
  };

  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id={name} />
        </CardTitle>
        <div className={chartClass}>
          <PolarAreaChart shadow data={polarAreaChartData} />
        </div>
      </CardBody>
    </Card>
  );
};

ProductCategoriesPolarArea.defaultProps = {
  name: '',
  labels: [],
  data: [],
};
export default ProductCategoriesPolarArea;
