import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './DateTimePicker.css';

const DateTimePicker = (props) => {
  const {
    label,
    htmlFor,
    name,
    onChange,
    maxDate,
    filterTime,
    selectedTime,
    readOnly,
  } = props;

  return (
    <div className='form-group'>
      <label htmlFor={htmlFor}>{label}</label>
      <DatePicker
        wrapperClassName='datetime-picker'
        className='form-control'
        name={name}
        onChange={onChange}
        selected={selectedTime}
        filterTime={filterTime}
        showTimeSelect='true'
        minDate={new Date()}
        maxDate={maxDate}
        timeFormat='HH:mm'
        timeIntervals={15}
        timeCaption='Time'
        dateFormat='MMMM dd, yyyy hh:mm aa'
      />
    </div>
  );
};

export default DateTimePicker;
