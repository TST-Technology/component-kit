import React, { useState } from 'react';
import { Row } from 'reactstrap';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
import { Colxx } from 'components/common/CustomBootstrap';

const LargeSwitch = ({ isBlock, onChange, isAdvisor }) => {
  const [checkedPrimaryInverse, setCheckedPrimaryInverse] = useState(isBlock);
  return (
    <Row className="mb-4">
      <Colxx xxs="6">
        <Switch
          className="custom-switch custom-switch-primary-inverse"
          checked={isAdvisor ? isBlock : checkedPrimaryInverse}
          onChange={(primaryInverse) => {
            onChange(primaryInverse);
            if (!isAdvisor) setCheckedPrimaryInverse(primaryInverse);
          }}
        />
      </Colxx>
    </Row>
  );
};
export default LargeSwitch;
