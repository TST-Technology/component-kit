/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Card, CardBody, CardTitle, Progress } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';

const ProfileStatuses = ({ cardClass = 'h-100', data }) => {
  const totalCallCount = data.reduce((total, call) => total + call.count, 0);
  return (
    <Card className={cardClass}>
      <CardBody>
        <CardTitle className="mb-4">
          <IntlMessages id="directory.profile-call" />
        </CardTitle>
        {data.map((call, index) => {
          return (
            <div key={index} className="mb-4">
              <p className="mb-2">
                {call.status ? call.status : 'No Status'}
                <span className="float-right text-muted">
                  {call.count}/ {totalCallCount}
                </span>
              </p>
              <Progress value={(call.count / totalCallCount) * 100} />
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
};

ProfileStatuses.defaultProps = {
  data: {
    callsData: [],
    callTotal: 0,
  },
};

export default ProfileStatuses;
