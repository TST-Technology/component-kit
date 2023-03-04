/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';

import { smallLineChartOptions } from './config';

const addCommas = (nStr) => {
  nStr += '';
  const x = nStr.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? `.${x[1]}` : '';
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1,$2');
  }
  return x1 + x2;
};

const Scatter = ({ count = '0' }) => {
  const currentValue = count !== '$undefined' ? count : 0;
  return (
    <>
      <div>
        <p
          className="lead color-theme-1 mb-1 value"
          style={{
            fontSize: '2.4rem',
            lineHeight: '4rem',
            fontWeight: '800',
            color: '#3b3b3b',
          }}
        >
          {currentValue}
        </p>
      </div>
    </>
  );
};

export default Scatter;
