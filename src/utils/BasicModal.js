import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  Input,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import CONSTANTS from './CONSTANTS';

const ModalUi = ({
  modalOpen,
  modelData,
  toggleModal,
  basicModal = 'KYC_MODAL',
  onSubmit = () => {},
}) => {
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal}>
      <ModalHeader>
        <IntlMessages
          id={
            modelData.type === 'approve'
              ? 'modal.modal-approve'
              : 'modal.modal-reject'
          }
        />
      </ModalHeader>
      <Form onSubmit={onSubmit}>
        <ModalBody>
          {CONSTANTS.RIGHT_SIDEBAR_FIELD[basicModal].map((data) => (
            <div key={data.id} className="mt-2">
              <Label>
                <IntlMessages id={data.Label} />
              </Label>
              <Input
                id={data.id}
                name={data.name}
                type={data.type}
                placeholder={data.placeholder}
                required
              />
            </div>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button color="primary">
            {modelData.type === 'approve' ? 'Approve' : 'Reject'}
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ModalUi;
