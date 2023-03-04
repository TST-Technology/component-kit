import React from 'react';
import { Button, Modal, ModalFooter, ModalHeader } from 'reactstrap';

export default function AlertPopup({
  isOpen,
  toggleModal,
  onPositive,
  onNegative,
  positiveText,
  negativeText,
  warning,
}) {
  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader>
        <p>{warning}</p>
      </ModalHeader>
      <ModalFooter>
        <Button color="primary" onClick={onPositive}>
          {positiveText}
        </Button>
        <Button color="secondary" onClick={onNegative}>
          {negativeText}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
