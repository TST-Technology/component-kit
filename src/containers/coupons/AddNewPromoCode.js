import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { addTodoItem } from 'redux/actions';

const initialState = {
  name: '',
  detail: '',
  discountPerc: 0,
  validity: 0,
};

const AddNewPromoCode = ({ modalOpen, toggleModal, addPromoCode, labels }) => {
  const [state, setState] = useState(initialState);

  const addNetItem = () => {
    const payload = {
      name: state.name,
      detail: state.detail,
      discountPerc: state.discountPerc,
      validity: state.validity,
    };

    addPromoCode(payload);
    toggleModal();
    setState(initialState);
  };

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      labels
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="promocode.add-new-title" />
      </ModalHeader>
      <ModalBody>
        <Label className="mt-4">
          <IntlMessages id="promocode.title" />
        </Label>
        <Input
          type="text"
          defaultValue={state.name}
          onChange={(event) => setState({ ...state, name: event.target.value })}
        />
        <Label className="mt-4">
          <IntlMessages id="promocode.detail" />
        </Label>
        <Input
          type="textarea"
          defaultValue={state.detail}
          onChange={(event) =>
            setState({ ...state, detail: event.target.value })
          }
        />
        <Label className="mt-4">
          <IntlMessages id="promocode.label" />
        </Label>
        <Input
          type="number"
          placeholder="Enter Discount in %"
          options={labels.map((x, i) => {
            return {
              label: x.label,
              value: x.label,
              key: i,
              color: x.color,
            };
          })}
          defaultValue={state.discountPerc}
          onChange={(event) =>
            setState({ ...state, discountPerc: event.target.value })
          }
        />
        <Label className="mt-4">
          <IntlMessages id="promocode.expiryDay" />
        </Label>
        <Input
          type="number"
          placeholder="How many days from the date of creation"
          options={labels.map((x, i) => {
            return {
              label: x.label,
              value: x.label,
              key: i,
              color: x.color,
            };
          })}
          defaultValue={state.validity}
          onChange={(event) =>
            setState({ ...state, validity: event.target.value })
          }
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="promocode.cancel" />
        </Button>
        <Button color="primary" onClick={() => addNetItem()}>
          <IntlMessages id="promocode.submit" />
        </Button>{' '}
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ todoApp }) => {
  const { labels, categories } = todoApp;
  return {
    labels,
    categories,
  };
};
export default connect(mapStateToProps, {
  addTodoItemAction: addTodoItem,
})(AddNewPromoCode);
