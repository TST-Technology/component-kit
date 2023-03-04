import ViewTable from 'utils/ReactTableCards';
import React, { Suspense, useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CONSTANTS from 'utils/CONSTANTS';
import { approveRejectKyc, getKycRequest } from 'utils/API/api';
import ModalUi from 'utils/BasicModal';
import { Container, Spinner } from 'reactstrap';
import AdminInfo from '../advisor/advisorInfo';

const Kyc = ({ match, location }) => {
  const [loading, setLoading] = useState(false);
  const [kycData, setKycData] = useState([]);
  const [modalOpen, setModalOpen] = useState({
    isOpen: false,
    type: '',
    data: {},
  });
  const currentKyc = location.pathname.replace(`${match.url}/`, '');
  console.log(currentKyc);
  const onApprove = (kyc) => {
    setModalOpen({ isOpen: true, type: 'approve', data: { kyc } });
  };

  const onReject = (kyc) => {
    setModalOpen({ isOpen: true, type: 'reject', data: { kyc } });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    (async () => {
      const payload = {
        remark: e.target.remark.value,
      };
      if (modalOpen.type === 'approve') {
        payload.approve = true;
        setModalOpen(false);
        setLoading(true);
        const res = await approveRejectKyc(modalOpen.data.kyc.id, payload);
        if (res !== -1) {
          setKycData((previous) =>
            previous
              .filter((advisor) => advisor.id !== modalOpen.data.kyc.id)
              .map((advisor, index) => {
                return { ...advisor, no: index + 1 };
              })
          );
        }
        setLoading(false);
      } else {
        payload.approve = false;
        setModalOpen(false);
        setLoading(true);
        const res = await approveRejectKyc(modalOpen.data.kyc.id, payload);
        if (res !== -1) {
          setKycData((previous) =>
            previous
              .filter((advisor) => advisor.id !== modalOpen.data.kyc.id)
              .map((advisor, index) => {
                return { ...advisor, no: index + 1 };
              })
          );
        }
        setLoading(false);
      }
    })();
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getKycRequest();
      if (res !== -1) {
        setKycData(
          res?.data?.data?.data.map((kyc, index) => {
            return {
              ...kyc,
              no: index + 1,
              action: [() => onApprove(kyc), () => onReject(kyc)],
            };
          })
        );
      }
      setLoading(false);
    })();
  }, [currentKyc]);

  return (
    <>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/lawyer`} /> */}
          <Route
            path={`${match.url}/advisorkycinfo`}
            render={(props) => <AdminInfo {...props} />}
          />

          <Route
            path={`${match.url}/${currentKyc.toLowerCase()}`}
            render={() =>
              !loading ? (
                <ViewTable
                  headers={CONSTANTS.TABLE_HEADER.KYC}
                  items={kycData
                    .filter(
                      (advisor) => advisor.Advisor.expertise === currentKyc
                    )
                    .map((advisor, index) => {
                      return {
                        ...advisor,
                        ...advisor.Advisor,
                        name: [advisor.Advisor.name, advisor.Advisor.id],
                        no: index + 1,
                      };
                    })}
                  advisorId={CONSTANTS.TABLE_ID.kyc}
                  filterParams="name"
                />
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
      <ModalUi
        modalOpen={modalOpen.isOpen}
        modelData={modalOpen}
        toggleModal={() =>
          setModalOpen((previous) => {
            return { ...previous, isOpen: !previous.isOpen };
          })
        }
        basicModal="KYC_MODAL"
        onSubmit={onSubmitHandler}
      />
    </>
  );
};
export default Kyc;
