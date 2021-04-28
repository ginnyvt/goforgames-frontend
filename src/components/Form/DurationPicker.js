import React from 'react';
import Select from 'react-select';
import { useField } from '@formiz/core';
import { durationPickerOpts } from './duration-picker-opts';

const DurationPicker = (props) => {
  const {
    id,
    errorMessage,
    isValid,
    isSubmitted,
    setValue,
    value,
    isPristine,
  } = useField(props);

  const { label, required, valueFromProps, setOptionValue } = props;
  const [isFocused, setIsFocused] = React.useState(false);
  const showError = !isValid && !isFocused && (!isPristine || isSubmitted);

  const optionChangeHandler = (newValue) => {
    setValue(newValue.value);
    setOptionValue(newValue.value);
  };

  return (
    <div className='form-group'>
      <label htmlFor='duration'>
        {label} {required && ' *'}
      </label>
      <Select
        options={durationPickerOpts}
        value={{ label: valueFromProps, value: valueFromProps }}
        onChange={(newValue) => optionChangeHandler(newValue)}
        aria-invalid={!isValid}
        aria-describedby={!isValid ? `${id}-error` : null}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      ></Select>
      {showError && <small className='text-danger'>{errorMessage}</small>}
    </div>
  );
};

export default DurationPicker;
