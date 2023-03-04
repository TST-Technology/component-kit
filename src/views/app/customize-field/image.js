import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Button,
  Container,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { updateTextandCharges, userCategoryImg } from 'utils/API/api';
import { Colxx } from 'components/common/CustomBootstrap';

const Image = () => {
  const [textandCharge, setTextandCharge] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [editExpertise, setEditExpertise] = useState({});
  const [updateimage, setUpdateimage] = useState('');
  const [flag, setFlag] = useState(true);
  const toggle = () => setModal(!modal);

  const onChangeImage = async (e) => {
    setUpdateimage(e.target.files[0]);
  };

  const getId = {
    Sexologist: process.env.REACT_APP_BASE_URL_SEXOLOGIST,
    Lawyer: process.env.REACT_APP_BASE_URL_LAWYER,
    Psychiatrist: process.env.REACT_APP_BASE_URL_PSYCHIATRIST,
  };

  const onUpdateImage = async (name) => {
    const formData = new FormData();
    formData.append('categoryImage', updateimage);
    await updateTextandCharges(getId[name], formData);
    setFlag(!flag);
    toggle();
  };

  const onClickEdit = (textandChargeItem) => {
    toggle();
    setEditExpertise(textandChargeItem.expertise);
  };

  useEffect(async () => {
    setLoading(true);
    const res = await userCategoryImg();
    setTextandCharge(res?.data?.data?.data);
    setLoading(false);
  }, [flag]);

  return (
    <>
      <Row className="survey-app">
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>Image(189 * 237)</h1>
          </div>
        </Colxx>
      </Row>
      {!loading ? (
        <Row>
          {textandCharge.length >= 0 &&
            textandCharge.map((textandChargeItem) => {
              return (
                <Colxx sm="12" md="6" lg="4" key={textandChargeItem.createdAt}>
                  <Card>
                    <CardBody className="px-3 pb-0 d-flex align-items-center justify-content-between">
                      <CardTitle>{textandChargeItem.expertise}</CardTitle>
                      <div>
                        <Button
                          outline
                          size="sm"
                          color="primary"
                          onClick={() => onClickEdit(textandChargeItem)}
                        >
                          Edit
                        </Button>
                      </div>
                    </CardBody>
                    <CardImg
                      className="p-3"
                      top
                      width="100%"
                      src={textandChargeItem.categoryImage}
                      alt="Card image cap"
                    />
                  </Card>
                </Colxx>
              );
            })}
        </Row>
      ) : (
        <Container className="d-flex justify-content-center align-items-center">
          <Spinner
            animation="border"
            className="d-inline-flex m-2 "
            color="$theme-color-yellow-granola"
          />
        </Container>
      )}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{editExpertise}</ModalHeader>
        <ModalBody>
          <input type="file" onChange={(e) => onChangeImage(e)} />
        </ModalBody>
        <ModalFooter>
          <Button outline size="sm" color="primary" onClick={toggle}>
            Cancel
          </Button>{' '}
          <Button
            outline
            size="sm"
            color="primary"
            onClick={() => onUpdateImage(editExpertise)}
          >
            Update
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Image;
