import React from 'react';

const SimpleInputField = ({
  value,
  label,
  placeHolder,
  type,
  onChange,
  name,
  readOnly,
}) => {
  return (
    <div className='form-group'>
      {label && <label htmlFor={name}>{label}</label>}
      {type === 'textarea' ? (
        <textarea
          className='form-control'
          placeholder={placeHolder}
          onChange={onChange}
          value={value}
          name={name}
          readOnly={readOnly}
        ></textarea>
      ) : (
        <input
          type={type}
          className='form-control'
          placeholder={placeHolder}
          onChange={onChange}
          value={value}
          name={name}
          readOnly={readOnly}
        />
      )}
    </div>
  );
};

export default SimpleInputField;
