import SingleLightbox from 'components/advisor/SingleLightbox';
import { Colxx } from 'components/common/CustomBootstrap';
import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Spinner, Input, Button } from 'reactstrap';
import {
  addNewPlan,
  addSignatories,
  addUserCorporate,
  getCorporateAllDetails,
  removeCorporateUser,
  removeSignatories,
  updateCorporate,
} from 'utils/API/api';
import { NotificationManager } from 'components/common/react-notifications';
import CONSTANTS from 'utils/CONSTANTS';
import { createFormPayload } from 'utils/function';
import { parsePhoneNumber } from 'libphonenumber-js';
import CorporateTableBody from './corporate-table-body';
import defaultImage from '../../../assets/img/login/background.jpg';

const CorporateDetailsPage = ({ location }) => {
  const [loading, setLoading] = useState(false);
  const [corporateData, setCorporateData] = useState({});
  const [corporateUser, setCorporateUser] = useState([]);
  const [signatories, setSignatories] = useState([]);
  const [plans, setPlans] = useState([]);
  const [refreash, setRefreash] = useState(false);
  const [planInfo, setplanInfo] = useState([]);
  const [percentage, setPercentage] = useState(['Adding users', 0]);
  const CorporateId = location.pathname.replace(`/app/corporate/`, '');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getCorporateAllDetails(CorporateId);
      if (res !== -1) {
        setCorporateData(res[0]?.data?.data?.data);
        setCorporateUser(res[1]?.data?.data?.data);
        setSignatories(res[2]?.data?.data?.data);
        setplanInfo(res[4]?.data?.data?.data);
        setPlans(
          res[3]?.data?.data?.data.map((plan) => {
            return {
              ...plan,
              ...plan?.B2BPlan,
            };
          })
        );
      }
      setLoading(false);
    })();
  }, [refreash]);

  const updateCorporateDetailsProfile = (key, data) => {
    (async () => {
      setLoading(true);
      const payload = createFormPayload(key, data);
      const res = await updateCorporate(payload, CorporateId);

      if (res !== -1) {
        setRefreash((previous) => !previous);
      }
      setLoading(false);
    })();
  };

  const AddUser = (data) => {
    (async () => {
      setLoading(true);

      const payload = {
        mobile: data?.mobile?.value,
        OrganizationId: CorporateId,
      };

      const res = await addUserCorporate(payload);
      if (res !== -1) {
        setRefreash((previous) => !previous);
      }
      setLoading(false);
    })();
  };

  const RemoveBlukUser = (userIdList = []) => {
    (async () => {
      setLoading(true);
      await Promise.all(
        userIdList.map(async (item, index) => {
          await removeCorporateUser(item);
          setPercentage(['Removing users', (index / userIdList.length) * 100]);
          return item + 1;
        })
      );
      setRefreash((previous) => !previous);
      setPercentage(['Adding users', 0]);
      setLoading(false);
    })();
  };

  const RemoveUser = (userId) => {
    (async () => {
      setLoading(true);

      const res = await removeCorporateUser(userId);
      if (res !== -1) {
        setRefreash((previous) => !previous);
      }
      setLoading(false);
    })();
  };

  const AddBulkUser = (userArr) => {
    (async () => {
      setLoading(true);

      await Promise.all(
        userArr.map(async (item, index) => {
          try {
            parsePhoneNumber(`+${item}`).formatInternational();
            const payload = {
              mobile: item,
              OrganizationId: CorporateId,
            };
            await addUserCorporate(payload);
            setPercentage(['Adding users', (index / userArr.length) * 100]);
          } catch (e) {
            NotificationManager.warning(
              `${item} is not correct Formate For Mobile number`,
              3000,
              null,
              null,
              ''
            );
          }
          return item + 1;
        })
      );

      setRefreash((previous) => !previous);
      setPercentage(['Adding users', 0]);
      setLoading(false);
    })();
  };

  const AddSignatoris = (data) => {
    (async () => {
      setLoading(true);

      let payload = {};
      CONSTANTS.RIGHT_SIDEBAR_FIELD.ADD_SIGNATORIES.map((signatorie) => {
        payload[signatorie.name] = data[signatorie.name].value;
        return 0;
      });

      payload = { ...payload, OrganizationId: CorporateId };

      const res = await addSignatories(payload);
      if (res !== -1) {
        NotificationManager.warning(
          'Signatory Added successfully',
          3000,
          null,
          null,
          ''
        );
        setRefreash((previous) => !previous);
      }
      setLoading(false);
    })();
  };

  const AddPlans = (data) => {
    (async () => {
      setLoading(true);

      let query = '';
      CONSTANTS.RIGHT_SIDEBAR_FIELD.ADD_PLAN.map((plan) => {
        const [selectedPlan] = planInfo.filter(
          (planDetails) => planDetails.name === data[plan.name].value
        );
        query += selectedPlan?.id;
        return 0;
      });

      query += `?OrganizationId=${CorporateId}`;

      const res = await addNewPlan(query);
      if (res !== -1) {
        NotificationManager.warning(
          'Signatory Added successfully',
          3000,
          null,
          null,
          ''
        );
        setRefreash((previous) => !previous);
      }
      setLoading(false);
    })();
  };

  const RemoveSignatoris = (userId) => {
    (async () => {
      setLoading(true);

      const res = await removeSignatories(userId);
      if (res !== -1) {
        NotificationManager.warning(
          'Signatory Deleted successfully',
          3000,
          null,
          null,
          ''
        );
        setRefreash((previous) => !previous);
      }
      setLoading(false);
    })();
  };

  return (
    <>
      {loading && (
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ flexDirection: 'column' }}
        >
          {percentage[1] > 0 && (
            <p>{`${percentage[0]} ${percentage[1].toFixed(0)}%`}</p>
          )}
          <Spinner
            animation="border"
            className="d-inline-flex m-2 "
            color="$theme-color-yellow-granola"
          />
        </Container>
      )}
      {!loading && (
        <>
          <Colxx xl="12" className="mb-4">
            <Row lg="12" xl="12">
              <Colxx lg="4" xl="4">
                {corporateData.id ? (
                  <Card className="mb-2">
                    <div
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '10px',
                        background: '#000000b5',
                        borderRadius: '20px',
                        zIndex: '10',
                      }}
                    >
                      <Input
                        style={{
                          width: '65px',
                          height: '37px',
                          cursor: 'pointer !important',
                          position: 'absolute',
                          opacity: '0',
                        }}
                        type="file"
                        accept="image/jpg,image/jpeg,image/png,image/*"
                        onChange={(e) =>
                          updateCorporateDetailsProfile([{ name: 'image' }], {
                            image: { value: e.target.files[0] },
                          })
                        }
                      />
                      <Button
                        outline
                        color="primary"
                        className="top-right-button"
                      >
                        Edit
                      </Button>
                    </div>
                    <SingleLightbox
                      thumb={
                        corporateData.image ? corporateData.image : defaultImage
                      }
                      large={
                        corporateData.image ? corporateData.image : defaultImage
                      }
                      className="card-img-top"
                    />
                  </Card>
                ) : (
                  <Container className="d-flex justify-content-center align-items-center">
                    <Spinner
                      animation="border"
                      className="d-inline-flex m-2 "
                      color="$theme-color-yellow-granola"
                    />
                  </Container>
                )}
              </Colxx>
            </Row>
          </Colxx>
          <Row>
            {corporateData.id && (
              <CorporateTableBody
                corporateUser={corporateUser}
                corporateData={corporateData}
                signatories={signatories}
                plans={plans}
                planInfo={planInfo}
                updateCorporateDetailsProfile={updateCorporateDetailsProfile}
                AddUser={AddUser}
                AddBulkUser={AddBulkUser}
                RemoveUser={RemoveUser}
                RemoveBlukUser={RemoveBlukUser}
                AddSignatoris={AddSignatoris}
                AddPlans={AddPlans}
                RemoveSignatoris={RemoveSignatoris}
              />
            )}
          </Row>
        </>
      )}
    </>
  );
};

export default CorporateDetailsPage;
