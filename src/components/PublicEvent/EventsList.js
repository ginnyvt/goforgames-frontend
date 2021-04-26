import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import SingleEvent from './SingleEvent';

import './EventsList.module.css';

const EventsList = ({ keyTab }) => {
  // const { getAccessTokenSilently } = useAuth0();
  // getAccessTokenSilently().then((res) => {
  //   console.log(res);
  // });

  const [eventsList, setEventsList] = useState([]);
  const [noEvents, setNoEvents] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios({
          method: 'GET',
          url: 'http://localhost:5000/events',
          params: {
            type: keyTab,
          },
        });
        if (data.results.length === 0) {
          setNoEvents(true);
        }
        setEventsList(data.results);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEvents();
  }, [keyTab]);

  return (
    <>
      <div className='events_list'>
        {eventsList.map((singE) => {
          return <SingleEvent key={singE._id} singleEvent={singE} />;
        })}
      </div>
      <div>{noEvents ? <p>No upcoming events</p> : null}</div>
    </>
  );
};

export default EventsList;
