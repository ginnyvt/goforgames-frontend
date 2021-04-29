import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Spinner from '../../../../Spinner/Spinner';

const ParticipantsList = (props) => {
  const [participantsList, setParticipantsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getList = async () => {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `http://localhost:5000/participants/list/${props.eventId}`,
        });
        const participantsId = data.results.map((p) => {
          return p.userId;
        });

        const participants = await Promise.all(
          participantsId.map(async (pId) => {
            try {
              const { data } = await axios({
                method: 'GET',
                url: `http://localhost:5000/users/${pId}`,
              });
              return `${data.results.name} - ${data.results.email}`;
            } catch (err) {
              console.log(err.response);
            }
          })
        );

        setParticipantsList(participants);
        setLoading(false);
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
        {loading ? (
          <Spinner />
        ) : (
          <ul>
            {participantsList.map((p) => {
              return <li>{p}</li>;
            })}
          </ul>
        )}
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
