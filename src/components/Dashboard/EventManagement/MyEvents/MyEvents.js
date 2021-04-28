import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import HostedEvents from './HostedEvents/HostedEvents';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const MyEvents = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [key, setKey] = useState('host');
  return (
    <article className='my-events'>
      {/* <div>
        <h3>List of my events</h3>
      </div> */}

      <div>
        <Tabs
          id='controlled-tab-example'
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey='host' title='Host'>
            <HostedEvents getToken={getAccessTokenSilently} keyTab={key} />
          </Tab>
          <Tab eventKey='member' title='Member'>
            <p>Joined events</p>
          </Tab>
        </Tabs>
      </div>
    </article>
  );
};

export default MyEvents;
