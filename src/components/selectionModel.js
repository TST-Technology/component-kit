import React, { useState } from 'react';
import { Button, Modal, ModalFooter } from 'reactstrap';

export default function SelectionModel({
  isOpen,
  toggleModal,
  onSubmit,
  dataList = [],
  selectedData = [],
}) {
  const [selectedState, setSelectedSate] = useState(selectedData);
  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <div
        style={{
          display: 'flex',
          padding: '20px',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        {dataList.map((item) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
          <p
            key={item.key}
            style={{
              border: `1px solid ${
                selectedState.filter(
                  (selectedItem) => item.key === selectedItem.key
                ).length > 0
                  ? '#c0a145'
                  : '#000'
              }`,
              padding: '3px 10px',
              borderRadius: '33px',
              cursor: 'pointer',
              color:
                selectedState.filter(
                  (selectedItem) => item.key === selectedItem.key
                ).length > 0
                  ? '#c0a145'
                  : '#000',
            }}
            onClick={() => {
              setSelectedSate((previous) => {
                if (
                  previous.filter(
                    (selectedItem) => item.key === selectedItem.key
                  ).length > 0
                ) {
                  return previous.filter(
                    (selectedItem) => item.key !== selectedItem.key
                  );
                }
                return [...previous, item];
              });
            }}
          >
            {item.value}
          </p>
        ))}
      </div>
      <ModalFooter>
        <Button color="secondary" onClick={() => onSubmit(selectedState)}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}
