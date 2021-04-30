import React, { useEffect, useState } from 'react';
import axios from 'axios';

import HostedEvent from './HostedEvent';

const HostedEvents = (props) => {
  const server_url = process.env.REACT_APP_SERVER_URL;
  const [hostedEvents, setHostedEvents] = useState([]);
  const [noEvents, setNoEvents] = useState(false);

  useEffect(() => {
    const getHostedEvents = async () => {
      const token = await props.getToken();

      try {
        const { data } = await axios({
          method: 'GET',
          url: `${server_url}/events/myevents`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(data.results);
        if (data.results.length === 0) {
          setNoEvents(true);
        }
        setHostedEvents(data.results);
      } catch (err) {
        console.log(err.response);
      }
    };

    getHostedEvents();
  }, [props.keyTab]);

  return (
    <>
      <div className='row mt-4 '>
        {hostedEvents.map((hE) => {
          return (
            <div className='col-sm-12 col-md-6 col-lg-4 mt-5' key={hE._id}>
              <HostedEvent hostedEvent={hE} />
            </div>
          );
        })}
      </div>
      {noEvents ? <h4 className='p-4'>You dont have any events...</h4> : null}
    </>
  );
};

export default HostedEvents;
