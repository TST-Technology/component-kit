import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { DoughnutChart } from 'components/charts';
import { ThemeColors } from 'helpers/ThemeColors';

const ProductCategoriesDoughnut = ({ name, data }) => {
  const colors = ThemeColors();

  const doughnutChartData = {
    // labels: ['Cakes', 'Cupcakes', 'Desserts'],
    labels: data.status,
    datasets: [
      {
        label: '',
        borderColor: [
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor4,
          colors.themeColor5,
        ],
        backgroundColor: [
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor4_10,
          colors.themeColor5_10,
        ],
        borderWidth: 2,
        // data: [15, 25, 20],
        data: data.count,
      },
    ],
  };
  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle className="mb-4">
          <IntlMessages id={name} />
        </CardTitle>
        <div className="directory-donut-chart">
          {data.count.length > 0 && (
            <DoughnutChart shadow data={doughnutChartData} />
          )}
        </div>
      </CardBody>
    </Card>
  );
};

ProductCategoriesDoughnut.defaultProps = {
  data: {
    status: [],
    count: [],
  },
};

export default ProductCategoriesDoughnut;
