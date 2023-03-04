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
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import CONSTANTS from 'utils/CONSTANTS';

const AddNewModalWithOutButton = ({
  modalOpen,
  toggleModal,
  sidebarMenu = 'LAWYER_EXPERTISE',
  modalTitle,
  onSubmit = () => {},
  formData = {},
  dynemicCheckboxListData = [],
}) => {
  const getInputFormate = (data) => {
    switch (data.type) {
      case 'select':
        return (
          <>
            <Label>
              <IntlMessages id={data.Label} />
            </Label>
            <Input
              id={data.id}
              type={data.type}
              size="1"
              required={data?.required}
              defaultValue={
                formData?.selected ? formData?.selected[data.id] : ''
              }
            >
              {data.option
                ? data.option.length > 0 &&
                  data.option.map((item) => (
                    <option key={`role_${item.id}`} value={item.value}>
                      {item.label}
                    </option>
                  ))
                : formData[data.name] &&
                  formData[data.name].length > 0 &&
                  formData[data.name].map((item) => (
                    <option key={`role_${item.id}`} value={item.value}>
                      {item.value}
                    </option>
                  ))}
            </Input>
          </>
        );
      case 'checkbox':
        return (
          <div style={{ padding: '0px 23px' }}>
            <Label for={data.id}>
              <Input
                id={data.id}
                type={data.type}
                size="1"
                required={data?.required}
                value={data?.value}
              />
              <IntlMessages id={data.Label} />
            </Label>
          </div>
        );
      case 'dynemicCheckboxList':
        return (
          <div
            style={{
              padding: '0px 23px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {dynemicCheckboxListData.map((CheckboxData) => (
              <Label for={CheckboxData.id} key={CheckboxData.id}>
                <Input
                  id={CheckboxData.id}
                  type={CheckboxData.type}
                  size="1"
                  required={CheckboxData?.required}
                  value={CheckboxData?.value}
                />
                <IntlMessages id={CheckboxData.Label} />
              </Label>
            ))}
          </div>
        );
      default:
        return (
          <>
            <Label>
              <IntlMessages id={data.Label} />
            </Label>
            <Input
              id={data.id}
              name={data.name}
              type={data.type}
              defaultValue={
                data.type !== 'file' && formData ? formData[data.name] : ''
              }
              required={data?.required}
            />
          </>
        );
    }
  };
  return (
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
              {getInputFormate(data)}
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
  );
};

export default AddNewModalWithOutButton;
