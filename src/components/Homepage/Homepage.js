import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import EventsList from '../PublicEvent/EventsList';
import Hero from '../Layout/Header/Hero/Hero';

import styles from './Homepage.module.css';

const Homepage = () => {
  const [key, setKey] = useState('upcoming');

  const tabKeyHandler = (key) => {
    setKey(key);
  };

  return (
    <>
      <Hero />
      <section className={`section ${styles.events_list} `}>
        <div className={styles.title_wrapper}>
          <h2 className={styles.title}>Our Events</h2>
        </div>

        <div className='section_center'>
          <Tab.Container
            id='controlled-tab'
            activeKey={key}
            onSelect={tabKeyHandler}
          >
            <Row>
              <Col sm={3}>
                <Nav className={`flex-column ${styles.nav_tabs}`}>
                  <Nav.Item>
                    <Nav.Link eventKey='upcoming'>Upcoming</Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey='past'>Past</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>

              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey='upcoming'>
                    <EventsList keyTab={key} />
                  </Tab.Pane>

                  <Tab.Pane eventKey='past'>
                    <EventsList keyTab={key} />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </section>
    </>
  );
};

export default Homepage;
