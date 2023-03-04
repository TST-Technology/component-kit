import ViewTable from 'utils/ReactTableCards';
import React, { Suspense, useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CONSTANTS, { CATEGORY } from 'utils/CONSTANTS';
import { addKYC, getNoKycList } from 'utils/API/api';
import { Container, Spinner } from 'reactstrap';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';
import { NotificationManager } from 'components/common/react-notifications';

const Kyc = ({ match, location }) => {
  const [loading, setLoading] = useState(false);
  const [kycData, setKycData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const currentKyc = location.pathname.replace(`${match.url}/`, '');
  const [advisorId, setAdvisorId] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getNoKycList();
      if (res !== -1) {
        console.log(res?.data?.advisors);
        setKycData(
          res?.data?.advisors.map((kyc, index) => {
            return {
              ...kyc,
              no: index + 1,
            };
          })
        );
      }
      setLoading(false);
    })();
  }, [currentKyc, refresh]);

  const addAdminHandler = (e) => {
    e.preventDefault();
    (async () => {
      const payload2 = new FormData();

      payload2.append('practicingCourt', e.target.practicingCourt.value);
      payload2.append('practicingLocation', e.target.practicingLocation.value);
      payload2.append(
        'practicingStartDate',
        e.target.practicingStartDate.value
      );
      payload2.append('specification', '');
      payload2.append('aadhar', e.target.aadhar.value);
      payload2.append('pan', e.target.pan.value);
      payload2.append('aadharFile', e.target.aadharFile.files[0]);
      payload2.append('panFile', e.target.panFile.files[0]);
      setLoading(true);

      payload2.append('AdvisorId', advisorId);

      const res2 = await addKYC(payload2);
      if (res2 !== -1) {
        setRefresh((previous) => !previous);
        setModalOpen(!modalOpen);
        setAdvisorId('');
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
      setLoading(false);
    })();
  };

  const onAddNewKyc = (id) => {
    setModalOpen((previous) => !previous);
    setAdvisorId(id);
  };

  const toggleModel = () => {
    setAdvisorId('');
    setModalOpen((previous) => !previous);
  };

  return (
    <>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Route
            path={`${match.url}`}
            render={() =>
              !loading ? (
                <>
                  <AddNewModalWithOutButton
                    modalOpen={modalOpen}
                    toggleModal={() => toggleModel()}
                    sidebarMenu="ADVISOR_KVC_MODAL"
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

                  <ViewTable
                    headers={CONSTANTS.TABLE_HEADER.NO_KYC}
                    items={kycData.map((advisor, index) => {
                      return {
                        ...advisor,
                        name: [advisor.name, advisor.id],
                        no: index + 1,
                        actionItem: {
                          onAddNewKyc,
                          value: advisor.id,
                        },
                      };
                    })}
                    advisorId={CONSTANTS.TABLE_ID.noKyc}
                    filterParams="name"
                  />
                </>
              ) : (
                <Container className="d-flex justify-content-center align-items-center">
                  <Spinner animation="border" className="d-inline-flex m-2 " />
                </Container>
              )
            }
          />

          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </>
  );
};
export default Kyc;
