import React from 'react';

import IntlMessages from 'helpers/IntlMessages';
import GradientCard from 'components/cards/GradientCard';

const GradientCardContainer = () => {
  return (
    <GradientCard>
      <span className="badge badge-pill badge-theme-3 align-self-start mb-3">
        <IntlMessages id="directory.gogo" />
      </span>
      <p className="lead text-white">
        <IntlMessages id="directory.magic-is-in-the-details" />
      </p>
      <p className="text-white">
        <IntlMessages id="directory.yes-it-is-indeed" />
      </p>
    </GradientCard>
  );
};
export default GradientCardContainer;
