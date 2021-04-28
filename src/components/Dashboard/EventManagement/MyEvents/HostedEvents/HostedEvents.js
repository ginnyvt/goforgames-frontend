import React, { useEffect, useState } from 'react';
import axios from 'axios';

import HostedEvent from './HostedEvent';

const HostedEvents = (props) => {
  const [hostedEvents, setHostedEvents] = useState([]);

  useEffect(() => {
    const getHostedEvents = async () => {
      const token = await props.getToken();

      try {
        const { data } = await axios({
          method: 'GET',
          url: 'http://localhost:5000/events/myevents',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(data.results);
        setHostedEvents(data.results);
      } catch (err) {
        console.log(err.response);
      }
    };

    getHostedEvents();
  }, [props.keyTab]);

  return (
    <div className='row mt-4 '>
      {hostedEvents.map((hE) => {
        return (
          <div className='col-sm-12 col-md-6 col-lg-4 mt-5' key={hE._id}>
            <HostedEvent hostedEvent={hE} />
          </div>
        );
      })}
    </div>
  );
};

export default HostedEvents;
