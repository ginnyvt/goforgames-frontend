import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleEvent from './SingleEvent';

import './EventsList.module.css';

import Spinner from '../Spinner/Spinner';

const EventsList = ({ keyTab }) => {
  const server_url = process.env.REACT_APP_SERVER_URL;

  const [eventsList, setEventsList] = useState([]);
  const [noUpcomingEvents, setNoUpcomingEvents] = useState(false);
  const [noPastEvents, setNoPastEvents] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${server_url}/events`,
          params: {
            type: keyTab,
          },
        });
        if (keyTab === 'upcoming' && data.results.length === 0) {
          setNoUpcomingEvents(true);
        }

        if (keyTab === 'past' && data.results.length === 0) {
          setNoPastEvents(true);
        }
        setEventsList(data.results);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEvents();
  }, [keyTab]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className='events_list'>
          {eventsList.map((singE) => {
            return <SingleEvent key={singE._id} singleEvent={singE} />;
          })}
        </div>
      )}

      <div>{noUpcomingEvents ? <p>No upcoming events</p> : null}</div>
      <div>{noPastEvents ? <p>No past events</p> : null}</div>
    </>
  );
};

export default EventsList;
