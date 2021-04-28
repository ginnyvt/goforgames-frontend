import React, { useState } from 'react';
import { useField } from '@formiz/core';

const InputField = (props) => {
  const {
    errorMessage,
    id,
    isValid,
    isPristine,
    isSubmitted,
    setValue,
    value,
  } = useField(props);

  const { label, type, required } = props;
  const [isFocused, setIsFocused] = React.useState(false);
  const showError = !isValid && !isFocused && (!isPristine || isSubmitted);

  return (
    <div className='form-group'>
      <label htmlFor={id}>
        {label}
        {required && ' *'}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={id}
          rows='5'
          value={value || ''}
          className='form-control'
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-invalid={!isValid}
          aria-describedby={!isValid ? `${id}-error` : null}
        ></textarea>
      ) : (
        <input
          id={id}
          type={type || 'text'}
          value={value || ''}
          className='form-control'
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-invalid={!isValid}
          aria-describedby={!isValid ? `${id}-error` : null}
        />
      )}

      {showError && (
        <small id={`${id}-error`} className='text-danger'>
          {errorMessage}
        </small>
      )}
    </div>
  );
};

export default InputField;
