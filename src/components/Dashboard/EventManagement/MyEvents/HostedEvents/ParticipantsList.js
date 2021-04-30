import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Spinner from '../../../../Spinner/Spinner';

const ParticipantsList = (props) => {
  const server_url = process.env.REACT_APP_SERVER_URL;
  const [participantsList, setParticipantsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noParticipants, setNoParticipants] = useState(false);

  useEffect(() => {
    const getList = async () => {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${server_url}/participants/list/${props.eventId}`,
        });
        const participantsId = data.results.map((p) => {
          return p.userId;
        });

        const participants = await Promise.all(
          participantsId.map(async (pId) => {
            try {
              const { data } = await axios({
                method: 'GET',
                url: `${server_url}/users/${pId}`,
              });
              return `${data.results.name} - ${data.results.email}`;
            } catch (err) {
              console.log(err.response);
            }
          })
        );

        if (participants.length === 0) {
          setNoParticipants(true);
        }

        setParticipantsList(participants);
        setLoading(false);
      } catch (err) {
        console.log(err.response);
      }
    };
    getList();
  }, []);

  const renderParticipantsList = () => {
    if (noParticipants) {
      return <p>No participants...</p>;
    } else {
      return (
        <ul>
          {participantsList.map((p) => {
            return <li>{p}</li>;
          })}
        </ul>
      );
    }
  };

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
        {loading ? <Spinner /> : renderParticipantsList()}
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
