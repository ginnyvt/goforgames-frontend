import React from 'react';

import Profile from './Profile/Profile';
import './Dashboard.css';
import MyEvents from './EventManagement/MyEvents/MyEvents';

const Dashboard = () => {
  return (
    <section className='section dashboard'>
      <div className='section_center section_dashboard'>
        <div className='profile-container'>
          <Profile />
        </div>
        <div className='myevents-container'>
          <MyEvents />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
