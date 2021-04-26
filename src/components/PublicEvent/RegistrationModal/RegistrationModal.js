import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Spinner from '../../Spinner/Spinner';

const RegistrationModal = (props) => {
  return (
    <Modal
      centered
      keyboard={false}
      backdrop='static'
      show={props.show}
      onHide={props.closeModal}
    >
      <Modal.Body>
        {!props.message ? <Spinner /> : `${props.message}`}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistrationModal;
