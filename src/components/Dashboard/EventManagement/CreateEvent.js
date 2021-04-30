import React, { useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { Formiz, FormizStep, useForm } from '@formiz/core';
import { isMinNumber, isMinLength } from '@formiz/validations';

import InputField from '../../Form/InputField';
import DurationPicker from '../../Form/DurationPicker';
import DateTimePicker from '../../Form/DateTimePicker';
import CreateEventModal from './CreateEventModal/CreateEventModal';

import './CreateEvent.css';

const CreateEvent = () => {
  const server_url = process.env.REACT_APP_SERVER_URL;

  const myForm = useForm();
  const { getAccessTokenSilently } = useAuth0();

  const [startDate, setStartDate] = useState(new Date());
  const [registerDate, setRegisterDate] = useState(new Date());
  const [cancelDate, setCancelDate] = useState(registerDate);
  const [optionValue, setOptionValue] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setMessage('');
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const filterRegisterTime = (time) => {
    const currentDate = startDate;
    const selectedDate = new Date(time);
    return currentDate.getTime() > selectedDate.getTime();
  };

  const startDateHandler = (date) => {
    setStartDate(date);
  };

  const registerDateHandler = (date) => {
    setRegisterDate(date);
  };

  const cancelDateHandler = (date) => {
    setCancelDate(date);
  };

  const formSubmitHandler = async (values) => {
    setShowModal(true);
    const startTime = dayjs(startDate).format();
    const endTime = dayjs(startTime).add(optionValue, 'h').format();
    const registerBefore = dayjs(registerDate).format();
    const cancelBefore = dayjs(cancelDate).format();
    const createdEvent = {
      ...values,
      startTime,
      endTime,
      registerBefore,
      cancelBefore,
    };
    delete createdEvent.duration;

    const token = await getAccessTokenSilently();

    try {
      const { data } = await axios({
        method: 'POST',
        url: `${server_url}/events`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: createdEvent,
      });
      setMessage(data.message);
    } catch (err) {
      setMessage(err.response.data);
    }
  };

  return (
    <section className='section new-event'>
      <div className='section_center'>
        <h3 className='text-center' style={{ fontFamily: `Pacifico, cursive` }}>
          Create New Event
        </h3>
        <div className='new-event-wrapper'>
          <div>
            <Formiz connect={myForm} onValidSubmit={formSubmitHandler}>
              <form
                onSubmit={myForm.submitStep}
                noValidate
                className='new-event-form'
              >
                <FormizStep name='step1'>
                  {/* Title */}
                  <InputField
                    name='title'
                    label='Title'
                    required='Title is required'
                    validations={[
                      {
                        rule: isMinLength(3),
                        message: 'Title must be at least 3 characters',
                      },
                    ]}
                  />

                  {/* Location */}
                  <InputField
                    name='address'
                    label='Location'
                    required='Location is required'
                  />
                </FormizStep>

                <FormizStep name='step2'>
                  {/* Starting time */}
                  <DateTimePicker
                    htmlFor='start-at'
                    label='Starts at *'
                    name='startDate'
                    selectedTime={startDate}
                    filterTime={filterPassedTime}
                    onChange={startDateHandler}
                  />

                  {/* Duration */}
                  <DurationPicker
                    name='duration'
                    label='Duration (in hours)'
                    required='Duration is required'
                    valueFromProps={optionValue}
                    setOptionValue={setOptionValue}
                  />
                </FormizStep>

                <FormizStep name='step3'>
                  {/* Register before */}
                  <DateTimePicker
                    htmlFor='register-before'
                    label='Register before *'
                    name='registerDate'
                    selectedTime={registerDate}
                    filterTime={filterRegisterTime}
                    maxDate={startDate}
                    onChange={registerDateHandler}
                  />

                  {/* Cancel before */}
                  <DateTimePicker
                    htmlFor='cancel-before'
                    label='Cancel before *'
                    name='cancelDate'
                    selectedTime={cancelDate}
                    filterTime={filterRegisterTime}
                    maxDate={startDate}
                    onChange={cancelDateHandler}
                  />
                </FormizStep>

                <FormizStep name='step4'>
                  {/* Number of max participants */}
                  <InputField
                    name='maxParticipants'
                    type='number'
                    label='Number of max participants'
                    required='Number of max participants required'
                    validations={[
                      {
                        rule: isMinNumber(2),
                        message: 'At least 2 participants required',
                      },
                    ]}
                  />

                  {/* Imgurl */}
                  <InputField name='imgUrl' type='textarea' label='Image URL' />

                  {/* Description */}
                  <InputField
                    name='description'
                    type='textarea'
                    label='Description'
                  />
                </FormizStep>

                <div className='btn-group'>
                  <div>
                    {!myForm.isFirstStep && (
                      <button
                        type='button'
                        className='btn btn-info mr-3'
                        onClick={myForm.prevStep}
                      >
                        Back
                      </button>
                    )}

                    {myForm.isLastStep ? (
                      <button type='submit' className='btn btn-info'>
                        Submit
                      </button>
                    ) : (
                      <button type='submit' className='btn btn-info'>
                        Continue
                      </button>
                    )}
                  </div>

                  <div className='btn-backhome'>
                    <Link to='/users/dashboard'>
                      <span>
                        <i className='far fa-arrow-alt-circle-left fa-2x'></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <CreateEventModal
                  show={showModal}
                  closeModal={closeModalHandler}
                  showModal={showModalHandler}
                  message={message}
                />
              </form>
            </Formiz>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateEvent;
