import React from 'react';
import Select from 'react-select';
import { durationPickerOpts } from './duration-picker-opts';

const SimpleDurationPicker = ({ setOptionValue, valueFromProps, readOnly }) => {
  const optionChangeHandler = (newValue) => {
    setOptionValue(newValue.value);
  };

  return (
    <Select
      options={durationPickerOpts}
      value={{ label: valueFromProps, value: valueFromProps }}
      onChange={(value) => optionChangeHandler(value)}
      isDisabled={readOnly}
    />
  );
};

export default SimpleDurationPicker;
