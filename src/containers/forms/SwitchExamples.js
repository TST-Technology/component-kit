/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';

const SwitchExamples = ({ checked, onChange }) => {
  return (
    <Switch
      className="custom-switch custom-switch-primary custom-switch-small"
      checked={checked}
      onChange={onChange}
    />
  );
};
export default SwitchExamples;
