import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Spinner from '../../../../Spinner/Spinner';

const ParticipantsList = (props) => {
  const [participantsList, setParticipantsList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `http://localhost:5000/participants/list/${props.eventId}`,
        });
        const participants = data.results.map((p) => {
          return p.userId;
        });
        setParticipantsList(participants);
      } catch (err) {
        console.log(err.response);
      }
    };
    getList();
  }, []);

  return (
    <Modal
      centered
      keyboard={false}
      backdrop='static'
      show={props.show}
      onHide={props.closeModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id='participants-list'>List of participants</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {participantsList.map((p) => {
            return <li>{p}</li>;
          })}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ParticipantsList;
