import React, { Suspense, useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ViewTable from 'utils/ReactTableCards';
import CONSTANTS, { CURRANT_USER } from 'utils/CONSTANTS';
import AddNewModal from 'utils/Modal';
import { addAdmin, deleteAdmin, getAdmin } from 'utils/API/api';
import { Container, Spinner } from 'reactstrap';
import AlertPopup from 'components/alert-popup';

const Admin = ({ match }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [adminData, setAdminData] = useState([]);
  const [currantAdmin, setCurrantAdmin] = useState({});
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const deleteAdminHandler = () => {
    (async () => {
      setLoading(true);
      await deleteAdmin(currantAdmin.id);
      setLoading(false);
      setAdminData((previous) =>
        previous
          .filter((adminList) => adminList.id !== currantAdmin.id)
          .map((adminList, index) => {
            return { ...adminList, no: index + 1 };
          })
      );
      setIsModelOpen(false);
    })();
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getAdmin();
      if (res !== -1) {
        setAdminData(
          res?.data?.data?.data.map((admin, index) => {
            return {
              ...admin,
              no: index + 1,
              title: `${admin.fname} ${admin.lname}`,
              action: [
                () => {
                  setCurrantAdmin(admin);
                  setIsModelOpen(true);
                },
                CURRANT_USER.user.role === 'Admin'
                  ? admin.email === CURRANT_USER.user.email
                  : true,
              ],
            };
          })
        );
      }
      setLoading(false);
    })();
  }, [refresh]);

  const addAdminData = (e) => {
    e.preventDefault();
    (async () => {

      const payload = {
        fname: e.target.fname.value,
        lname: e.target.lname.value,
        email: e.target.admin_email.value,
        password: e.target.admin_password.value,
        role: e.target.role.value,
      };
      setLoading(true);
      const res = await addAdmin(payload);
      if (res !== -1) {
        setRefresh((previous) => !previous);
        setModalOpen(!modalOpen);
      }
      setLoading(false);
    })();
  };

  return (
    <>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/admin`} />
          <Route
            path={`${match.url}/admin`}
            render={() =>
              !loading ? (
                <>
                  <AddNewModal
                    sidebarMenu="ADMIN_MODAL"
                    dataId={CONSTANTS.TABLE_ID.add}
                    modalTitle={CONSTANTS.TABLE_ID.addModal}
                    modalOpen={modalOpen}
                    toggleModal={() => setModalOpen(!modalOpen)}
                    onSubmit={addAdminData}
                  />
                  <ViewTable
                    headers={CONSTANTS.TABLE_HEADER.ADMIN}
                    items={adminData}
                    advisorId={CONSTANTS.TABLE_ID.admin}
                    filterParams="title"
                  />
                </>
              ) : (
                <Container className="d-flex justify-content-center align-items-center">
                  <Spinner
                    animation="border"
                    className="d-inline-flex m-2 "
                    color="$theme-color-yellow-granola"
                  />
                </Container>
              )
            }
          />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
      <AlertPopup
        isOpen={isModelOpen}
        toggleModal={() => setIsModelOpen((previous) => !previous)}
        onPositive={deleteAdminHandler}
        onNegative={() => setIsModelOpen((previous) => !previous)}
        positiveText="Agree"
        negativeText="cancel"
        warning={`Aar you sure want to delete the ${currantAdmin?.role} ${currantAdmin?.fname} ${currantAdmin?.lname}`}
      />
    </>
  );
};
export default Admin;
