import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import 'bootswatch/dist/flatly/bootstrap.min.css';

import ProtectedRoute from './auth0-config/protected-route';
import Layout from './components/Layout/Layout';
import Homepage from './components/Homepage/Homepage';
import Spinner from './components/Spinner/Spinner';
import EventDetail from './components/PublicEvent/EventDetail';
import CreateEvent from './components/Dashboard/EventManagement/CreateEvent';
import EditEvent from './components/Dashboard/EventManagement/EditEvent';
import Dashboard from './components/Dashboard/Dashboard';

import EventContext from './context/event-context';

const App = () => {
  const [fetchedEvent, setFetchedEvent] = useState(null);
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Spinner />;
  }

  const fetchEventHandler = (eventObj) => {
    setFetchedEvent(eventObj);
  };

  return (
    <EventContext.Provider
      value={{ eventObj: fetchedEvent, onFetchEvent: fetchEventHandler }}
    >
      <Layout>
        <Switch>
          <Route exact path='/events/:eventId' component={EventDetail} />
          <Route exact path='/' component={Homepage} />
          <ProtectedRoute path='/new-event' component={CreateEvent} />
          <ProtectedRoute
            path='/users/events/:eventId/edit'
            component={EditEvent}
          />
          <ProtectedRoute path='/users/dashboard' component={Dashboard} />
        </Switch>
      </Layout>
    </EventContext.Provider>
  );
};

export default App;
