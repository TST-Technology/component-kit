import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  Container,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import CONSTANTS from './CONSTANTS';

const AddNewModal = ({
  modalOpen,
  toggleModal,
  sidebarMenu = 'LAWYER_EXPERTISE',
  dataId,
  modalTitle,
  onSubmit = () => {},
}) => {
  return (
    <>
      <Container
        style={{
          display: 'flex',
          justifyContent: 'end',
          maxWidth: '100%',
          margin: '0px',
          padding: '0',
          marginTop: '-10px',
          marginBottom: '15px',
          marginLeft: '-27px',
        }}
      >
        <Button
          outline
          color="primary"
          className="top-right-button"
          onClick={() => toggleModal()}
        >
          <IntlMessages id={dataId} />
        </Button>
      </Container>
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          <IntlMessages id={modalTitle} />
        </ModalHeader>

        <Form onSubmit={onSubmit}>
          <ModalBody>
            {CONSTANTS.RIGHT_SIDEBAR_FIELD[sidebarMenu].map((data) => (
              <div key={data.id} className="mt-2">
                <Label>
                  <IntlMessages id={data.Label} />
                </Label>
                {data.type === 'select' ? (
                  <Input id={data.id} type="select" size="1" required>
                    {data.option.length > 0 &&
                      data.option.map((item) => (
                        <option key={`role_${item.id}`} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                  </Input>
                ) : (
                  <Input {...data} />
                )}
              </div>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button color="secondary" outline onClick={toggleModal}>
              <IntlMessages id="advisor.cancel" />
            </Button>
            <Button color="primary">
              <IntlMessages id="advisor.submit" />
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default AddNewModal;
