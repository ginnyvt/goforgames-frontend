import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useParams } from 'react-router-dom';

import Spinner from '../../Spinner/Spinner';
import SimpleInputField from '../../Form/SimpleInputField';
import SimpleDurationPicker from '../../Form/SimpleDurationPicker';
import DateTimePicker from '../../Form/DateTimePicker';
import CreateEventModal from './CreateEventModal/CreateEventModal';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import './EditEvent.css';

const EditEvent = () => {
  const server_url = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();
  const { eventId } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    address: '',
    maxParticipants: '',
    imgUrl: '',
    description: '',
  });
  const [fetchedEvent, setFetchedEvent] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [registerDate, setRegisterDate] = useState(new Date());
  const [cancelDate, setCancelDate] = useState(registerDate);
  const [optionValue, setOptionValue] = useState(null);
  const [readonly, setReadonly] = useState(false);
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

  const inputChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const checkEditTime = (time) => {
    const current = dayjs().format;
    if (current > time) {
      return false;
    }
  };

  useEffect(() => {
    const getEvent = async () => {
      const { data } = await axios.get(`${server_url}/events/${eventId}`);
      const e = data.results;
      if (checkEditTime(e.startTime)) {
        setReadonly(true);
      }

      const duration =
        (dayjs(data.results.endTime) - dayjs(data.results.startTime)) / 3600000;
      setOptionValue(duration);
      setFormData({
        ...formData,
        title: e.title,
        address: e.address,
        maxParticipants: e.maxParticipants,
        imgUrl: e.imgUrl || '',
        description: e.description || `Let's have fun time together!`,
      });
      setStartDate(dayjs(e.startTime).toDate());
      setRegisterDate(dayjs(e.registerBefore).toDate());
      setCancelDate(dayjs(e.cancelBefore).toDate());
      setFetchedEvent(data.results);
    };

    getEvent();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowModal(true);
    const token = await getAccessTokenSilently();
    const startTime = dayjs(startDate).format();
    const endTime = dayjs(startTime).add(optionValue, 'h').format();
    const updatedEvent = {
      ...formData,
      startTime,
      endTime,
      registerBefore: dayjs(registerDate).format(),
      cancelBefore: dayjs(cancelDate).format(),
    };
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `${server_url}/events/${eventId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: updatedEvent,
      });
      // console.log(data);
      setMessage(data.message);
    } catch (err) {
      setMessage(err.response.data);
    }
  };

  return fetchedEvent === 'null' ? (
    <Spinner />
  ) : (
    <section className='section edit-event'>
      <div className='section_center'>
        <h3 className='text-center' style={{ fontFamily: `Pacifico, cursive` }}>
          Edit Event
        </h3>
      </div>
      <div className='row container'>
        <div className='col-lg-12'>
          <form onSubmit={submitHandler}>
            <SimpleInputField
              label='Title'
              type='text'
              name='title'
              value={formData.title}
              onChange={inputChangeHandler}
              readOnly={readonly}
            />

            <SimpleInputField
              label='Address'
              type='text'
              name='address'
              value={formData.address}
              onChange={inputChangeHandler}
              readOnly={readonly}
            />

            {/* Starting at */}
            <DateTimePicker
              htmlFor='start-at'
              label='Starts at'
              name='startDate'
              selectedTime={startDate}
              filterTime={filterPassedTime}
              onChange={startDateHandler}
              readOnly={readonly}
            />

            {/* Duration Picker */}
            <div className='form-group'>
              <label>Duration (in hours)</label>
              <SimpleDurationPicker
                valueFromProps={optionValue}
                setOptionValue={setOptionValue}
                readOnly={readonly}
              />
            </div>

            {/* No. max participants */}
            <SimpleInputField
              label='Number of Max Participants'
              type='number'
              placeHolder='No. Max Participant'
              name='maxParticipants'
              value={formData.maxParticipants}
              onChange={inputChangeHandler}
              readOnly={readonly}
            />

            {/* Register before */}
            <DateTimePicker
              htmlFor='register-before'
              label='Register before'
              name='registerDate'
              selectedTime={registerDate}
              filterTime={filterRegisterTime}
              maxDate={startDate}
              onChange={registerDateHandler}
              readOnly={readonly}
            />

            {/* Cancel before */}
            <DateTimePicker
              htmlFor='cancel-before'
              label='Cancel before'
              name='cancelDate'
              selectedTime={cancelDate}
              filterTime={filterRegisterTime}
              maxDate={startDate}
              onChange={cancelDateHandler}
              readOnly={readonly}
            />

            {/* Image url */}
            <SimpleInputField
              label='Image URL'
              type='textarea'
              placeHolder='Enter an image url...'
              name='imgUrl'
              value={formData.imgUrl}
              onChange={inputChangeHandler}
              readOnly={readonly}
            />

            {/* Description */}
            <SimpleInputField
              label='Description'
              type='textarea'
              placeHolder='Description'
              name='description'
              value={formData.description}
              onChange={inputChangeHandler}
              readOnly={readonly}
            />

            {readonly ? (
              <p>You cannot edit past event!</p>
            ) : (
              <div className='edit-buttons'>
                <Button onClick={submitHandler}>Update</Button>
                <Link to='/users/dashboard'>
                  <span>
                    <i className='far fa-arrow-alt-circle-left fa-2x'></i>
                  </span>
                </Link>
              </div>
            )}

            <CreateEventModal
              show={showModal}
              closeModal={closeModalHandler}
              showModal={showModalHandler}
              message={message}
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditEvent;
