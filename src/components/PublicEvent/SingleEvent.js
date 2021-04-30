import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';

import EventContext from '../../context/event-context';

import './SingleEvent.css';
import eventImg from '../../images/badminton.jpg';

const SingleEvent = ({ singleEvent }) => {
  const server_url = process.env.REACT_APP_SERVER_URL;

  const [creator, setCreator] = useState('');
  const ctx = useContext(EventContext);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${server_url}/events/${singleEvent._id}`,
        });
        // console.log(data);
        ctx.onFetchEvent(data.results);
        const creatorInfo =
          `${data.results.creator.given_name} ${data.results.creator.family_name}` ||
          data.results.creator.name;
        setCreator(creatorInfo);
      } catch (err) {
        console.log(err);
      }
    };

    getEvent();
  }, []);

  const imageUrl = singleEvent.imgUrl || eventImg;
  const bgStyle = {
    backgroundImage: `url(${imageUrl})`,
  };

  return (
    <article className='event_card mt-5'>
      <div className='event_meta'>
        <div className='event_img' style={bgStyle}></div>
        <ul className='event_details'>
          <li className='event_creator'>{creator}</li>
          <li className='event_date'>
            {' '}
            {dayjs(singleEvent.startTime).format('MMMM DD, YYYY')}{' '}
          </li>
          <li className='event_time'>
            {dayjs(singleEvent.startTime).format('HH:mm')}
          </li>
        </ul>
      </div>
      <div className='event_info'>
        <h1 className='event_title'>{singleEvent.title}</h1>
        <h2 className='event_subtitle'>Location: {singleEvent.address}</h2>
        <p className='event_desc'>
          <span>Description:</span>{' '}
          {singleEvent.description || `Let's have fun time together!`}
        </p>
        <p className='attend'>
          <Link to={`/events/${singleEvent._id}`}>
            <button className='btn btn-success'>Attend</button>
          </Link>
        </p>
      </div>
    </article>
  );
};

export default SingleEvent;
