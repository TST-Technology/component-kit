import React, { Suspense, useState, useEffect } from 'react';
import { Button, Container, Spinner } from 'reactstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import CONSTANTS from 'utils/CONSTANTS';
import ViewTable from 'utils/ReactTableCards';
import { addCategory, getCategory, updateCategory } from 'utils/API/api';

import IntlMessages from 'helpers/IntlMessages';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';

const Categorys = ({ match }) => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCateegory, setSelectedCateegory] = useState({});

  const updateAction = (e) => {
    (async () => {
      setLoading(true);
      const payload = new FormData();
      payload.append('expertise', e.target.expertise.value);
      if (e.target.image.files.length > 0) {
        payload.append('image', e.target.image.files[0]);
      }
      const res = await updateCategory(selectedCateegory.id, payload);
      if (res !== -1) {
        setSelectedCateegory({});
        setRefresh((previous) => !previous);
        setModalOpen(false);
      }
      setLoading(false);
    })();
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getCategory();
      if (res !== -1) {
        setUserList(
          res?.data?.data?.data.map((user, index) => {
            return {
              ...user,
              no: index + 1,
              action: [
                () => {
                  setModalOpen(true);
                  const categoty = user;
                  delete categoty.image;
                  setSelectedCateegory(categoty);
                  return 0;
                },
                false,
                'Edit',
              ],
            };
          })
        );
      }
      setLoading(false);
    })();
  }, [refresh]);

  const callFormSubmitFuction = (e) => {
    e.preventDefault();
    (async () => {
      setLoading(true);
      const payload = new FormData();
      payload.append('expertise', e.target.expertise.value);
      payload.append('image', e.target.image.files[0]);
      const res = await addCategory(payload);
      if (res !== -1) {
        setRefresh((previous) => !previous);
        setModalOpen(false);
      }
      setLoading(false);
    })();
  };
  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/userlist`} /> */}
        <Route
          path={`${match.url}`}
          render={() =>
            !loading ? (
              <>
                <AddNewModalWithOutButton
                  modalOpen={modalOpen}
                  toggleModal={() => {
                    setModalOpen((previous) => !previous);
                    setSelectedCateegory({});
                  }}
                  sidebarMenu={
                    selectedCateegory.id
                      ? 'Edit_CATEGORY_MODAL'
                      : 'CATEGORY_MODAL'
                  }
                  modalTitle={CONSTANTS.TABLE_ID.addModal}
                  onSubmit={
                    selectedCateegory.id ? updateAction : callFormSubmitFuction
                  }
                  titleId="Edit Category Details"
                  formData={selectedCateegory}
                />

                <Button
                  outline
                  color="primary"
                  style={{
                    marginLeft: 'auto',
                    marginBottom: '14px',
                  }}
                  className="top-right-button"
                  onClick={() => setModalOpen((previous) => !previous)}
                >
                  <IntlMessages id="survey.add-new" />
                </Button>

                <ViewTable
                  headers={CONSTANTS.TABLE_HEADER.CATEGORY_LIST}
                  items={userList}
                  advisorId="table.react-table-category"
                  filterParams="mobile"
                />
              </>
            ) : (
              <>
                <Container className="d-flex justify-content-center align-items-center">
                  <Spinner
                    animation="border"
                    className="d-inline-flex m-2 "
                    color="$theme-color-yellow-granola"
                  />
                </Container>
              </>
            )
          }
        />

        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
};
export default Categorys;
