import React, { Suspense, useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ViewTable from 'utils/ReactTableCards';
import CONSTANTS, { CATEGORY } from 'utils/CONSTANTS';
import { addPlan, deletePlans, getPlans } from 'utils/API/api';
import { Button, Container, Spinner } from 'reactstrap';
import AlertPopup from 'components/alert-popup';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';
import IntlMessages from 'helpers/IntlMessages';
import { NotificationManager } from 'components/common/react-notifications';

const Plans = ({ match }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [planData, setPlanData] = useState([]);
  const [currantPlan, setCurrantPlan] = useState({});
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const deletePlansHandler = () => {
    (async () => {
      setLoading(true);
      await deletePlans(currantPlan.id);
      setLoading(false);
      setPlanData((previous) =>
        previous
          .filter((planList) => planList.id !== currantPlan.id)
          .map((planList, index) => {
            return { ...planList, no: index + 1 };
          })
      );
      setIsModelOpen(false);
    })();
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getPlans();
      if (res !== -1) {
        setPlanData(
          res?.data?.data?.data.map((plan, index) => {
            return {
              ...plan,
              no: index + 1,
              category: plan.category.replaceAll(',', ' | '),
              action: [
                () => {
                  setCurrantPlan(plan);
                  setIsModelOpen(true);
                },
                false,
              ],
            };
          })
        );
      }
      setLoading(false);
    })();
  }, [refresh]);

  const addPlanHandler = (e) => {
    e.preventDefault();
    (async () => {
      const selectedCategory = [];
      CATEGORY.list.map((CategoryItem) => {
        if (e.target[CategoryItem.expertise].checked) {
          selectedCategory.push(e.target[CategoryItem.expertise].value);
        }
        return 0;
      });
      console.log(e.target, selectedCategory);

      if (selectedCategory.length <= 0) {
        NotificationManager.warning(
          'Plan Name is already exist in list',
          3000,
          null,
          null,
          ''
        );
      } else {
        const payload = { category: selectedCategory.toString() };
        CONSTANTS.RIGHT_SIDEBAR_FIELD.CREATE_PLAN.filter(
          (MenuItem) => MenuItem.type !== 'dynemicCheckboxList'
        ).map((MenuItem) => {
          payload[MenuItem.name] = e.target[MenuItem.name].value;
          return 0;
        });

        setLoading(true);
        const res = await addPlan(payload);
        if (res !== -1) {
          setRefresh((previous) => !previous);
          setModalOpen(!modalOpen);
        }
        setLoading(false);
      }
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
                  <AddNewModalWithOutButton
                    modalOpen={modalOpen}
                    toggleModal={() => setModalOpen((previous) => !previous)}
                    sidebarMenu="CREATE_PLAN"
                    modalTitle={CONSTANTS.TABLE_ID.addplan}
                    onSubmit={addPlanHandler}
                    titleId="Edit Advisor Details"
                    formData={{}}
                    dynemicCheckboxListData={CATEGORY.list.map(
                      (planDataItem) => {
                        return {
                          ...planDataItem,
                          type: 'checkbox',
                          required: false,
                          value: planDataItem.expertise,
                          id: planDataItem.expertise,
                          Label: planDataItem.expertise,
                        };
                      }
                    )}
                  />
                  <Button
                    outline
                    color="primary"
                    style={{
                      marginLeft: 'auto',
                      marginBottom: '14px',
                      right: '15px',
                      top: '-50px',
                      zIndex: '100',
                    }}
                    className="top-right-button"
                    onClick={() => {
                      setModalOpen((previous) => !previous);
                      return 0;
                    }}
                  >
                    <IntlMessages id="table.react-button-plans" />
                  </Button>
                  <ViewTable
                    headers={CONSTANTS.TABLE_HEADER.PLANS}
                    items={planData.map((plan) => {
                      return {
                        ...plan,
                        amount: `₹${plan.amount}`,
                        duration: `${plan.amount} Days`,
                      };
                    })}
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
        onPositive={deletePlansHandler}
        onNegative={() => setIsModelOpen((previous) => !previous)}
        positiveText="Agree"
        negativeText="cancel"
        warning="Aar you sure want to delete ?"
      />
    </>
  );
};
export default Plans;
