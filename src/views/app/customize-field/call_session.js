import React, { Suspense, useState, useEffect } from 'react';
import {
  addCallSession,
  deleteCallSession,
  getCallSession,
} from 'utils/API/api';
import ViewTable from 'utils/ReactTableCards';
import { Container, Spinner } from 'reactstrap';
import AddNewModal from 'utils/Modal';
import AlertPopup from 'components/alert-popup';
import { NotificationManager } from 'components/common/react-notifications';
import CONSTANTS from 'utils/CONSTANTS';

const CallSesstion = ({ location }) => {
  const [callSessionData, setCallSessionData] = useState([]);
  const [currantCallSessionData, setCurrantCallSessionData] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const currentAdvisor = location.pathname.replace(
    `/app/customize-field/call_session/`,
    ''
  );

  const deleteCallSessionData = () => {
    (async () => {
      setIsModelOpen(false);
      setLoading(true);
      const res = await deleteCallSession(currantCallSessionData.id);
      if (res !== -1) {
        NotificationManager.success(
          `Call Session Data Deleted`,
          'Delete Data',
          3000,
          null,
          null,
          ''
        );
      }
      setRefresh(!refresh);
    })();
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getCallSession(currentAdvisor);
      if (res !== -1) {
        setCallSessionData(
          res?.data?.data?.data.map((callSession, index) => {
            return {
              ...callSessionData,
              no: index + 1,
              duration: `${callSession.duration}`,
              discount: `${callSession.discount}`,
              action: [
                () => {
                  setCurrantCallSessionData(callSession);
                  setIsModelOpen(true);
                },
              ],
            };
          })
        );
      }
      setLoading(false);
    })();
  }, [refresh, currentAdvisor]);

  const addCallSessionData = (e) => {
    e.preventDefault();
    (async () => {
      const payload = {
        duration: e.target.duration.value,
        discount: e.target.discount.value,
        expertise: currentAdvisor,
      };
      setLoading(true);
      const res = await addCallSession(payload);
      if (res !== -1) {
        setRefresh((previous) => !previous);
        setModalOpen(!modalOpen);
        NotificationManager.success(
          `Call Session Data Added`,
          'Add Data',
          3000,
          null,
          null,
          ''
        );
      }
      setLoading(false);
    })();
  };

  return (
    <>
      <Suspense fallback={<div className="loading" />}>
        {!loading ? (
          <>
            <AddNewModal
              sidebarMenu="CALL_SESSION"
              dataId={CONSTANTS.TABLE_ID.add}
              modalTitle={CONSTANTS.TABLE_ID.addModal}
              modalOpen={modalOpen}
              toggleModal={() => setModalOpen(!modalOpen)}
              onSubmit={addCallSessionData}
            />
            <ViewTable
              headers={CONSTANTS.TABLE_HEADER.CALL_SESSION}
              items={callSessionData}
              advisorId={CONSTANTS.TABLE_ID.callSession}
              filterParams="duration"
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
        )}
      </Suspense>
      <AlertPopup
        isOpen={isModelOpen}
        toggleModal={() => setIsModelOpen((previous) => !previous)}
        onPositive={deleteCallSessionData}
        onNegative={() => setIsModelOpen((previous) => !previous)}
        positiveText="Agree"
        negativeText="cancel"
        warning={`Aar you sure want to delete the duration ${currantCallSessionData?.duration} discount ${currantCallSessionData?.discount}`}
      />
    </>
  );
};

export default CallSesstion;
