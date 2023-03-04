import React, { Suspense, useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ViewTable from 'utils/ReactTableCards';
import CONSTANTS from 'utils/CONSTANTS';
import {
  addCorporate,
  getCorporate,
  updateCorporateAction,
} from 'utils/API/api';
import { Button, Container, Spinner } from 'reactstrap';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';
import IntlMessages from 'helpers/IntlMessages';
import { createFormPayload } from 'utils/function';
import CorporateDetailsPage from './corporate-details-page';
import defaultImage from '../../../assets/img/login/background.jpg';

const Corporate = ({ match }) => {
  const [corporateData, setcorporateData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [planInfo, setplanInfo] = useState([]);

  const updateCorporate = (corporate) => {
    (async () => {
      await updateCorporateAction(corporate.id);
      setRefresh((previous) => !previous);
    })();
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getCorporate();
      if (res !== -1) {
        setcorporateData(
          res[0]?.data?.data?.data.map((corporate, index) => {
            return {
              ...corporate,
              no: index + 1,
              image: `${corporate?.image ? corporate?.image : defaultImage}`,
              name: [
                `${corporate?.name}`,
                `${corporate?.id}`,
                corporate?.OrgPlanSubscriptions &&
                corporate?.OrgPlanSubscriptions.length > 0
                  ? corporate?.OrgPlanSubscriptions[
                      corporate?.OrgPlanSubscriptions.length - 1
                    ]?.B2BPlanId
                  : '',
              ],
              launch: [false, `/${corporate?.id}`],
              email: `${corporate?.email}`,
              action: [!corporate?.isBlocked, () => updateCorporate(corporate)],
            };
          })
        );

        setplanInfo(res[1]?.data?.data?.data);
      }
      setLoading(false);
    })();
  }, [refresh]);

  const addcorporateData = (e) => {
    e.preventDefault();
    (async () => {
      const payload = createFormPayload(
        CONSTANTS.RIGHT_SIDEBAR_FIELD.CORPORATE.filter(
          (corporateItem) => corporateItem.type !== 'select'
        ),
        e.target
      );

      const [planId] = planInfo.filter(
        (planData) => planData.name === e.target.B2BPlanId.value
      );
      payload.append('B2BPlanId', planId.id);

      setLoading(true);
      const res = await addCorporate(payload);
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
          <Route
            path={`${match.url}`}
            exact
            render={() =>
              !loading ? (
                <>
                  <AddNewModalWithOutButton
                    modalOpen={modalOpen}
                    toggleModal={() => setModalOpen((previous) => !previous)}
                    sidebarMenu="CORPORATE"
                    modalTitle="advisor.add-new-corporate-title"
                    onSubmit={addcorporateData}
                    titleId="Edit Advisor Details"
                    formData={{
                      B2BPlanId: planInfo.map((plan, index) => {
                        return { id: index, value: plan.name };
                      }),
                    }}
                  />

                  <Button
                    outline
                    color="primary"
                    style={{
                      marginBottom: '14px',
                      zIndex: '100',
                    }}
                    className="top-right-button"
                    onClick={() => setModalOpen((previous) => !previous)}
                  >
                    <IntlMessages id="advisor.add-new-corporate-title" />
                  </Button>

                  <ViewTable
                    headers={CONSTANTS.TABLE_HEADER.CORPORATE}
                    items={corporateData}
                    advisorId={CONSTANTS.TABLE_ID.corporate}
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
          <Route
            path="/*"
            render={(props) => <CorporateDetailsPage {...props} />}
          />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </>
  );
};
export default Corporate;
