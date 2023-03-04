import React, { useEffect, useState } from 'react';
import { Row, Card, Container, Spinner, Button, Input } from 'reactstrap';
import moment from 'moment';
import { Colxx } from 'components/common/CustomBootstrap';
import SingleLightbox from 'components/advisor/SingleLightbox';
import SmallLineCharts from 'containers/directory/SmallLineCharts';
import {
  addAvailability,
  approveRejectKyc,
  deleteKYCAdvisorVideo,
  getAdvisorAllDetails,
  getSpecializations,
  updateAdvisorAction,
  updateAdvisorDetails,
  updateAdvisorPic,
  updateKYCAdvisorDetails,
} from 'utils/API/api';
import ModalUi from 'utils/BasicModal';
import AdvisorTableBody from './advisor-table';

const ProfilePortfolio = ({ match, location }) => {
  const [advisorData, setAdvisorData] = useState({});
  const [callRecords, setCallRecords] = useState([]);
  const [chatRecords, setChatRecords] = useState([]);
  const [language, setLanguage] = useState([]);
  const [categories, setAllCategories] = useState([]);

  const [refreash, setRefreash] = useState(false);

  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  const [advisorTransaction, setAdvisorTransaction] = useState([]);
  const AdvisorId = location.pathname.replace(`${match.url}/`, '');

  const [modalOpen, setModalOpen] = useState({
    isOpen: false,
    type: '',
    data: {},
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getAdvisorAllDetails(AdvisorId);
      if (res !== -1) {
        setAdvisorData(res[0]?.data?.data?.data);
        setAdvisorTransaction(res[1]?.data?.data?.data);
        setChatRecords(res[3]?.data?.data?.data);
        setLanguage(res[4]?.data?.data?.data);
        setCallRecords(
          res[2]?.data?.data?.data.map((record) => {
            return {
              ...record,
              createdAt: moment(record?.createdAt)
                .local()
                .format('MMMM Do YYYY'),
            };
          })
        );
        setChatRecords(res[3]?.data?.data?.data);
      }
      setLoading(false);
    })();
  }, [refreash]);

  useEffect(() => {
    (async () => {
      if (advisorData?.expertise) {
        const res = await getSpecializations(advisorData?.expertise);
        console.log(res);
        if (res !== -1) {
          setAllCategories(res?.data?.data?.data);
        }
      }
    })();
  }, [advisorData]);

  const onApprove = (kyc) => {
    setModalOpen({ isOpen: true, type: 'approve', data: { kyc } });
  };

  const onReject = (kyc) => {
    setModalOpen({ isOpen: true, type: 'reject', data: { kyc } });
  };

  const onBlockHandler = (isBlocked) => {
    (async () => {
      const res = await updateAdvisorAction(AdvisorId);
      setLoading(true);
      if (res !== -1) {
        setAdvisorData((previous) => {
          return { ...previous, isBlocked: !isBlocked };
        });
      } else {
        setAdvisorData((previous) => {
          return { ...previous, isBlocked };
        });
      }
      setLoading(false);
    })();
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

        await approveRejectKyc(modalOpen.data.kyc.Kyc.id, payload);
        setLoading(false);
        window.location.reload();
      } else {
        payload.approve = false;
        setModalOpen(false);
        setLoading(true);
        await approveRejectKyc(modalOpen.data.kyc.Kyc.id, payload);
        setLoading(false);
        window.location.reload();
      }
    })();
  };

  const updateAdvisorProfile = (data) => {
    (async () => {
      setLoading(true);
      const payload = data;
      if (!payload.languages) payload.languages = advisorData?.languages;
      console.log(payload);
      const res = await updateAdvisorDetails(payload, AdvisorId);
      if (res !== -1) {
        setRefreash((previous) => !previous);
      }
      setLoading(false);
    })();
  };

  const updateAdvisorKycProfile = (payload) => {
    (async () => {
      setLoading(true);
      const res = await updateKYCAdvisorDetails(payload, AdvisorId);
      if (res !== -1) {
        setRefreash((previous) => !previous);
      }
      setLoading(false);
    })();
  };

  const addAvailabilityData = (data) => {
    (async () => {
      setLoading(true);
      const payload = data;
      payload.AdvisorId = AdvisorId;
      const res = await addAvailability(payload);
      if (res !== -1) {
        setRefreash((previous) => !previous);
      }
      setLoading(false);
    })();
  };

  const updateAdvisorVideo = (VideoFile) => {
    (async () => {
      setVideoLoading(true);
      const payload = new FormData();
      payload.append('video', VideoFile);
      const res = await updateKYCAdvisorDetails(payload, AdvisorId);
      if (res !== -1) {
        setRefreash((previous) => !previous);
      }
      setVideoLoading(false);
    })();
  };

  const deleteAdvisorVideo = () => {
    (async () => {
      setVideoLoading(true);
      const res = await deleteKYCAdvisorVideo(AdvisorId);
      if (res !== -1) {
        setRefreash((previous) => !previous);
      }
      setVideoLoading(false);
    })();
  };

  const updateAdvisorProfilePic = (image) => {
    (async () => {
      setLoading(true);
      const payload = new FormData();
      payload.append('profile', image);
      payload.append('languages', advisorData?.languages);
      const res = await updateAdvisorPic(payload, AdvisorId);
      if (res !== -1) {
        setRefreash((previous) => !previous);
      }
      setLoading(false);
    })();
  };

  return (
    <>
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
      <Colxx xl="12" className="mb-4">
        <Row lg="12" xl="12">
          <Colxx lg="4" xl="4">
            {advisorData.profile ? (
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
                    onChange={(e) => updateAdvisorProfilePic(e.target.files[0])}
                  />
                  <Button outline color="primary" className="top-right-button">
                    Edit
                  </Button>
                </div>
                <SingleLightbox
                  thumb={
                    advisorData.profile
                      ? advisorData.profile
                      : '/assets/img/profiles/1.jpg'
                  }
                  large={
                    advisorData.profile
                      ? advisorData.profile
                      : '/assets/img/profiles/1.jpg'
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
          <Colxx lg="6" xl="8" className="mb-4">
            <SmallLineCharts
              onBlockHandler={onBlockHandler}
              isAdvisor
              advisorData={advisorData}
              loading={loading}
              onApprove={onApprove}
              onReject={onReject}
              callRecords={callRecords}
            />
          </Colxx>
        </Row>
      </Colxx>
      <Row>
        {advisorData?.Kyc && advisorTransaction && (
          <AdvisorTableBody
            Kyc={advisorData.Kyc}
            advisorTransaction={advisorTransaction}
            advisorData={advisorData}
            advisorAvailabilities={advisorData?.AdvisorAvailibilities}
            callRecords={callRecords}
            chatRecords={chatRecords}
            updateAdvisorProfile={updateAdvisorProfile}
            updateAdvisorKycProfile={updateAdvisorKycProfile}
            updateAdvisorVideo={updateAdvisorVideo}
            addAvailabilityData={addAvailabilityData}
            deleteAdvisorVideo={deleteAdvisorVideo}
            videoLoading={videoLoading}
            language={language}
            categories={categories}
            setRefreash={() => setRefreash(!refreash)}
            setLoading={() => setLoading(!loading)}
          />
        )}
      </Row>
    </>
  );
};
export default ProfilePortfolio;
