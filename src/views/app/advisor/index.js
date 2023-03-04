import { Button, Container, Spinner } from 'reactstrap';
import React, { Suspense, useState, useEffect } from 'react';
import ViewTable from 'utils/ReactTableCards';
import { Redirect, Route, Switch } from 'react-router-dom';
import CONSTANTS, { CATEGORY } from 'utils/CONSTANTS';
import IntlMessages from 'helpers/IntlMessages';
import {
  addKYC,
  addNewAdvisor,
  getAdvisorById,
  getAllAdvisors,
  updateAdvisorAction,
  updateAdvisorDetails,
} from 'utils/API/api';
import { NotificationManager } from 'components/common/react-notifications';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';
import AdminInfo from './advisorInfo';

const Advisor = ({ match, location }) => {
  const [advisorData, setAdvisorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const currentAdvisor = location.pathname.replace(`${match.url}/`, '');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getAllAdvisors(currentAdvisor);
      console.log(res);
      if (res !== -1) {
        setAdvisorData(
          res?.data?.data?.data.map((advisor, index) => {
            return {
              ...advisor,
              no: index + 1,
              name: [advisor.name, advisor.id],
            };
          })
        );
      }
      setLoading(false);
    })();
  }, [refresh, currentAdvisor]);

  const addAdminHandler = (e) => {
    e.preventDefault();
    (async () => {
      const payload1 = new FormData();
      const payload2 = new FormData();

      payload1.append('name', e.target.name.value);
      payload1.append('charges', e.target.charges.value);
      payload1.append('upiId', e.target.upiId.value);
      payload1.append('profile', e.target.profile.files[0]);
      payload1.append('about', e.target.about.value);
      payload1.append('mobile', e.target.mobile.value);

      payload1.append('expertise', e.target.expertise.value.trim());
      payload1.append('languages', 'Hindi,English');

      payload2.append('license', e.target.license.files[0]);
      payload2.append('practicingCourt', e.target.practicingCourt.value);
      payload2.append('specification', e.target.specification.value);
      payload2.append('practicingLocation', e.target.practicingLocation.value);
      payload2.append(
        'practicingStartDate',
        e.target.practicingStartDate.value
      );
      payload2.append('aadhar', e.target.aadhar.value);
      payload2.append('registrationNo', e.target.registrationNo.value);
      payload2.append('pan', e.target.pan.value);
      payload2.append('aadharFile', e.target.aadharFile.files[0]);
      payload2.append('panFile', e.target.panFile.files[0]);
      setLoading(true);
      const res = await addNewAdvisor(payload1);
      if (res !== -1) {
        payload2.append('AdvisorId', res?.data?.data?.data?.id);

        const res2 = await addKYC(payload2);
        if (res2 !== -1) {
          setRefresh((previous) => !previous);
          setModalOpen(!modalOpen);
        } else {
          NotificationManager.warning(
            'Advisor KVC not submitted',
            'Advsor KYC Error',
            3000,
            null,
            null,
            ''
          );
        }
      }
      setLoading(false);
    })();
  };

  const blockHandler = (advisor, index) => {
    (async () => {
      setUpdateLoading(true);
      const res = await updateAdvisorAction(advisor.id);
      if (res !== -1) {
        setAdvisorData((previous) => {
          const newAdvisorData = [...previous];
          newAdvisorData[index] = {
            ...newAdvisorData[index],
            isBlocked: !newAdvisorData[index].isBlocked,
          };
          return newAdvisorData;
        });
      }
      setUpdateLoading(false);
    })();
  };

  const visibilityHandler = (advisor, index) => {
    (async () => {
      setUpdateLoading(true);

      const res = await getAdvisorById(advisor.id);
      if (res !== -1) {
        const payload = {
          languages: res?.data?.data?.data?.languages.toString(),
          isVisibleToB2BUser: !advisorData[index].isVisibleToB2BUser,
        };
        const res1 = await updateAdvisorDetails(payload, advisorData[index].id);
        if (res1 !== -1) {
          NotificationManager.success(
            'Advisor Details Successfully updated',
            'Advisor Updated',
            null,
            null,
            ''
          );
          setAdvisorData((previous) => {
            const newAdvisorData = [...previous];
            newAdvisorData[index] = {
              ...newAdvisorData[index],
              isVisibleToB2BUser: !newAdvisorData[index].isVisibleToB2BUser,
            };
            return newAdvisorData;
          });
        }
        setUpdateLoading(false);
      }
    })();
  };

  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/lawyer`} /> */}

        <Route
          path={`${match.url}/advisorinfo`}
          render={(props) => <AdminInfo {...props} />}
        />

        <Route
          exact
          path={`${match.url}/${currentAdvisor}`}
          render={() =>
            !loading ? (
              <>
                {updateLoading && (
                  <Container className="d-flex position-absolute justify-content-center align-items-center">
                    <Spinner
                      animation="border"
                      className="d-inline-flex m-2 "
                      color="$theme-color-yellow-granola"
                    />
                  </Container>
                )}
                <AddNewModalWithOutButton
                  modalOpen={modalOpen}
                  toggleModal={() => setModalOpen(!modalOpen)}
                  sidebarMenu="NEW_DVISOR_MODAL"
                  modalTitle={CONSTANTS.TABLE_ID.addModal}
                  onSubmit={addAdminHandler}
                  titleId="Edit Category Details"
                  formData={{
                    expertise: CATEGORY.list.map((Category) => {
                      return {
                        name: Category?.expertise.trim(),
                        value: Category?.expertise.trim(),
                      };
                    }),
                  }}
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
                  headers={CONSTANTS.TABLE_HEADER.ADVISOR}
                  items={advisorData.map((advisor, index) => {
                    return {
                      ...advisor,
                      no: index + 1,
                      isVisible: [
                        advisor.isVisibleToB2BUser,
                        () => visibilityHandler(advisor, index),
                      ],
                      isBlocked: [
                        !advisor.isBlocked,
                        () => blockHandler(advisor, index),
                      ],
                    };
                  })}
                  advisorId={currentAdvisor}
                  filterParams="name"
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
  );
};
export default Advisor;
