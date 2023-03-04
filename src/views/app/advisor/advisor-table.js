import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  CardHeader,
  Button,
  Input,
} from 'reactstrap';
import ViewTable from 'utils/ReactTableCards';
import CONSTANTS, {
  CATEGORY,
  Days,
  getTime,
  getTimeInMinute,
} from 'utils/CONSTANTS';
import { Colxx } from 'components/common/CustomBootstrap';
import classnames from 'classnames';
import IntlMessages from 'helpers/IntlMessages';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import { parsePhoneNumber } from 'libphonenumber-js';
import { getChatStatus } from 'utils/function';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';
import './main.css';
import SelectionModel from 'components/selectionModel';
import AlertPopup from 'components/alert-popup';
import { deleteAvailability } from 'utils/API/api';

const isEditButtonVisible = {
  AdvisorInfo: true,
  kyc: true,
};

const getValue = (id, data) => {
  switch (id) {
    case 'mobile':
      return parsePhoneNumber(`+${data[id].toString()}`).formatInternational();

    case 'type':
      return CONSTANTS.ADVISOR_TYPE[data[id]];

    default:
      return data[id];
  }
};

const AdvisorTableBody = ({
  Kyc,
  advisorTransaction,
  advisorData,
  callRecords,
  chatRecords = [],
  language,
  advisorAvailabilities = [],
  updateAdvisorProfile = () => {},
  updateAdvisorKycProfile = () => {},
  updateAdvisorVideo = () => {},
  addAvailabilityData = () => {},
  deleteAdvisorVideo = () => {},
  videoLoading = false,
  categories,
  setRefreash,
  setLoading,
}) => {
  const [activeTab, setActiveTab] = useState('AdvisorInfo');
  const [modalOpen, setModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [AvailabilityDeleteData, setAvailabilityDeleteData] = useState({});
  const getformDetails = () => {
    switch (activeTab) {
      case 'AdvisorInfo':
        return {
          ...advisorData,
          selected: {
            expertise: advisorData?.expertise,
          },
          expertise: CATEGORY.list.map((Category) => {
            return {
              id: Category?.id,
              name: Category?.expertise,
              value: Category?.expertise,
            };
          }),
        };
      case 'kyc':
        return Kyc;
      default:
        return {
          ...advisorData,
          expertise: CATEGORY.list.map((Category) => {
            return {
              id: Category?.id,
              name: Category?.expertise,
              value: Category?.expertise,
            };
          }),
        };
    }
  };

  const getFormKey = () => {
    switch (activeTab) {
      case 'AdvisorInfo':
        return 'ADVISOR_MODAL';
      case 'kyc':
        return 'ADVISOR_KVC_MODAL';
      case 'availability':
        return 'AVAILABILITY_MODAL';
      default:
        return 'ADVISOR_MODAL';
    }
  };

  const callFormSubmitFuction = (e) => {
    e.preventDefault();
    let payload = {};

    switch (activeTab) {
      case 'AdvisorInfo':
        CONSTANTS.RIGHT_SIDEBAR_FIELD[getFormKey()].map((field) => {
          payload[field.name] =
            field.type === 'number'
              ? +e.target[field.name].value
              : e.target[field.name].value;
          return 0;
        });
        setModalOpen((previous) => !previous);

        return updateAdvisorProfile(payload);
      case 'kyc':
        payload = new FormData();
        CONSTANTS.RIGHT_SIDEBAR_FIELD[getFormKey()]
          .filter((field) => field.type !== 'file')
          .map((field) => {
            // console.log('field', field.name, e.target[field.name].value);
            payload.append(
              field.name,
              field.type === 'number'
                ? +e.target[field.name].value
                : e.target[field.name].value
            );

            return 0;
          });
        CONSTANTS.RIGHT_SIDEBAR_FIELD[getFormKey()]
          .filter((field) => field.type === 'file')
          .map((field) => {
            if (e.target[field.name].files[0]) {
              console.log('fieldFile', field.name);
              payload.append(field.name, e.target[field.name].files[0]);
            }
            return 0;
          });
        setModalOpen((previous) => !previous);
        return updateAdvisorKycProfile(payload);
      case 'availability':
        CONSTANTS.RIGHT_SIDEBAR_FIELD[getFormKey()]
          .filter((field) => field.type !== 'checkbox')
          .map((field) => {
            payload[field.name] =
              field.type === 'number'
                ? +e.target[field.name].value
                : e.target[field.name].value;
            return 0;
          });
        CONSTANTS.RIGHT_SIDEBAR_FIELD[getFormKey()]
          .filter((field) => field.type === 'checkbox')
          .map((field) => {
            payload[field.name] = e.target[field.name].checked;
            return 0;
          });
        setModalOpen((previous) => !previous);
        return addAvailabilityData(payload);
      default:
        return updateAdvisorProfile(payload);
    }
  };
  const deleteAvailabilityHandler = () => {
    setLoading();
    setIsModelOpen(false);
    (async () => {
      const res = await deleteAvailability(AvailabilityDeleteData.id);
      if (res !== -1) {
        setRefreash();
      } else {
        setLoading();
      }
    })();
  };
  const deletePopup = (Availability) => {
    setAvailabilityDeleteData(Availability);
    setIsModelOpen(true);
  };

  const copyContent = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Colxx xxs="12">
      <AddNewModalWithOutButton
        modalOpen={modalOpen}
        toggleModal={() => setModalOpen((previous) => !previous)}
        sidebarMenu={getFormKey()}
        modalTitle={CONSTANTS.TABLE_ID.addModal}
        onSubmit={callFormSubmitFuction}
        titleId="Edit Advisor Details"
        formData={getformDetails()}
      />
      {isEditButtonVisible[activeTab] && (
        <Button
          outline
          color="primary"
          style={{
            marginLeft: 'auto',
            marginBottom: '14px',
            position: 'absolute',
            right: '15px',
            top: '-50px',
            zIndex: '100',
          }}
          className="top-right-button"
          onClick={() => setModalOpen((previous) => !previous)}
        >
          <IntlMessages id="survey.add-new-edit" />
        </Button>
      )}
      <Row>
        <Colxx xxs="12" xl="12" className="col-left">
          <Card className="mb-4">
            <CardHeader>
              <Nav tabs className="card-header-tabs">
                {CONSTANTS.ADVISOR_INFO.map((data) => (
                  <NavItem key={data.id}>
                    <Card
                      className={classnames({
                        active: activeTab === data.tabId,
                        'nav-link': true,
                      })}
                      onClick={() => setActiveTab(data.tabId)}
                    >
                      <IntlMessages id={data.Label} />
                    </Card>
                  </NavItem>
                ))}
              </Nav>
            </CardHeader>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="AdvisorInfo">
                <Row>
                  <Colxx sm="12">
                    <CardBody>
                      {Object.keys(advisorData)
                        .filter(
                          (id) =>
                            id === 'name' ||
                            id === 'mobile' ||
                            id === 'expertise' ||
                            id === 'about' ||
                            id === 'charges' ||
                            id === 'upiId' ||
                            id === 'ratings' ||
                            id === 'profileViews' ||
                            id === 'type' ||
                            id === 'FcmToken'
                        )
                        .map((id) => (
                          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                          <p
                            className="mb-3"
                            key={id}
                            onClick={() =>
                              id === 'FcmToken'
                                ? copyContent(advisorData?.FcmToken)
                                : () => {}
                            }
                          >
                            {CONSTANTS.ABOUT_US_DETAILS[id]} :{' '}
                            <span>{getValue(id, advisorData)}</span>
                          </p>
                        ))}
                      {advisorData?.languages != null && (
                        <>
                          <p className="mb-3">
                            Languages : &nbsp;
                            {advisorData?.languages
                              .toString()
                              .replaceAll(',', ', ')}
                          </p>
                          <Button
                            outline
                            color="primary"
                            className="top-right-button"
                            onClick={() => setIsOpen(true)}
                          >
                            Edit Language
                          </Button>
                        </>
                      )}
                    </CardBody>
                    <SelectionModel
                      isOpen={isOpen}
                      toggleModal={() => {
                        setIsOpen(false);
                      }}
                      onSubmit={(selectedState) => {
                        console.log(selectedState);
                        updateAdvisorProfile({
                          languages: selectedState
                            .map((selectedItem) => selectedItem.value)
                            .toString(),
                        });
                        setIsOpen(false);
                      }}
                      dataList={language.map((item) => {
                        return { key: item?.language, value: item?.language };
                      })}
                      selectedData={advisorData?.languages.map((item) => {
                        return { key: item, value: item };
                      })}
                    />
                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId="transactions">
                <Row>
                  <Colxx sm="12">
                    <CardBody>
                      <ViewTable
                        headers={CONSTANTS.TABLE_HEADER.ADMIN_TRANSACTION}
                        filterParams="id"
                        items={advisorTransaction.map((item, index) => {
                          return {
                            ...item,
                            no: index + 1,
                            createdTime: moment(item.createdAt)
                              .local()
                              .format('h:mm:ss a'),
                            createdAt: moment(item.createdAt)
                              .local()
                              .format('dddd, MMMM Do YYYY'),
                            transactionText: [item?.amount, item?.status],
                          };
                        })}
                        advisorId={CONSTANTS.TABLE_ID.adminTransaction}
                      />
                    </CardBody>
                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId="callhistory">
                <Row>
                  <Colxx sm="12">
                    <CardBody>
                      <ViewTable
                        headers={CONSTANTS.TABLE_HEADER.CALL_RECORDS}
                        items={callRecords.map((record, index) => {
                          return {
                            ...record,
                            ...record.Advisor,
                            no: index + 1,
                            callDuration: getTime(record.callDuration),
                            createdAt: moment(record?.createdAt)
                              .local()
                              .format('Do MMMM, YYYY h:mm:ss a'),
                          };
                        })}
                        advisorId={CONSTANTS.TABLE_ID.callRecords}
                      />
                    </CardBody>
                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId="kyc">
                <Row>
                  <Colxx sm="12">
                    <CardBody>
                      <div style={{ display: 'flex' }}>
                        <p className="mb-3">Video Introduction </p>

                        <div
                          style={{
                            marginBottom: '20px',
                            display: 'flex',
                            gap: '10px',
                            width: '205px',
                            justifyContent: 'end',
                          }}
                        >
                          {/* {Kyc.video && (
                            <Button
                              outline
                              color="primary"
                              className="top-right-button"
                              onClick={() => getImages(Kyc.video)}
                            >
                              <i className="simple-icon-arrow-down" />
                            </Button>
                          )} */}
                          <div>
                            <Input
                              style={{
                                width: '65px',
                                height: '37px',
                                cursor: 'pointer !important',
                                position: 'absolute',
                                opacity: '0',
                              }}
                              type="file"
                              accept="video/mp4,video/x-m4v,video/*"
                              onChange={(e) =>
                                updateAdvisorVideo(e.target.files[0])
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
                          {Kyc.video ? (
                            <Button
                              outline
                              color="primary"
                              className="top-right-button"
                              onClick={() => {
                                deleteAdvisorVideo();
                              }}
                            >
                              Delete
                            </Button>
                          ) : null}
                        </div>
                      </div>

                      {videoLoading && <p>Loading ...</p>}

                      {Kyc.video ? (
                        <video width="320" height="240" controls>
                          <source src={Kyc.video} type="video/mp4" />
                          <track
                            src="captions_en.vtt"
                            kind="captions"
                            srcLang="en"
                            label="english_captions"
                          />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <p
                          style={{
                            background: '#d4d4d485',
                            width: '320px',
                            textAlign: 'center',
                            height: '139px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '10px',
                            color: '#8c8c8c',
                          }}
                        >
                          No Video Found
                        </p>
                      )}

                      <p className="mb-3">
                        Category : <span>{Kyc?.specification}</span>
                      </p>

                      <Button
                        outline
                        color="primary"
                        className="top-right-button mb-3"
                        onClick={() => setIsCategoryOpen(true)}
                      >
                        Edit
                      </Button>

                      {Object.keys(Kyc)
                        .filter(
                          (id) =>
                            id === 'practicingLocation' ||
                            (Kyc?.practicingCourt !== null &&
                              id === 'practicingCourt') ||
                            id === 'practicingStartDate' ||
                            id === 'aadhar' ||
                            (Kyc?.pan !== null && id === 'pan') ||
                            (Kyc?.registrationNo !== null &&
                              id === 'registrationNo') ||
                            (Kyc?.remark !== null && id === 'remark') ||
                            id === 'AdvisorId'
                        )
                        .map((id) => (
                          <p className="mb-3" key={id}>
                            {CONSTANTS.ADVISOR_KYC_DETAILS[id]} :{' '}
                            <span>{Kyc[id]}</span>
                          </p>
                        ))}

                      {Object.keys(Kyc)
                        .filter(
                          (id) =>
                            (Kyc?.license !== null && id === 'license') ||
                            (Kyc?.aadharFile !== null && id === 'aadharFile') ||
                            (Kyc?.panFile !== null && id === 'panFile')
                        )
                        .map((id) => (
                          <a href={Kyc[id]} key={id}>
                            <Button outline color="primary" key={id}>
                              {`Download ${id}`}
                            </Button>
                          </a>
                        ))}
                    </CardBody>
                  </Colxx>
                </Row>

                <SelectionModel
                  isOpen={isCategoryOpen}
                  toggleModal={() => {
                    setIsCategoryOpen(false);
                  }}
                  onSubmit={(selectedState) => {
                    console.log(selectedState);
                    const value = selectedState
                      .map((row) => row.value)
                      .toString();
                    const formData = new FormData();
                    formData.append('specification', value);
                    updateAdvisorKycProfile(formData);
                    setIsCategoryOpen(false);
                  }}
                  dataList={categories.map((item) => {
                    return {
                      key: item?.specialization,
                      value: item?.specialization,
                    };
                  })}
                  selectedData={
                    Kyc.specification
                      ? Kyc.specification.split(',').map((item) => {
                          return { key: item.trim(), value: item.trim() };
                        })
                      : []
                  }
                />
              </TabPane>
              <TabPane tabId="chatHistory">
                <Row>
                  <Colxx sm="12">
                    <CardBody>
                      <ViewTable
                        headers={CONSTANTS.TABLE_HEADER.ADVISOR_CHAT_HISTORY}
                        items={chatRecords.map((chatData, index) => {
                          return {
                            ...chatData,
                            no: index + 1,
                            ...chatData?.Advisor,
                            mobile: chatData?.User?.mobile
                              ? parsePhoneNumber(
                                  `+${chatData?.User?.mobile}`
                                ).formatInternational()
                              : 'No Number Found',
                            status: getChatStatus(chatData),
                            duration: getTime(chatData?.duration * 60),
                            userCost: [
                              chatData?.userCost ? chatData?.userCost : `0`,
                              `a${getChatStatus(chatData)}`,
                            ],
                            advisorCharge: chatData?.advisorCharge
                              ? `₹${
                                  chatData?.advisorCharge *
                                  getTimeInMinute(chatData?.duration * 60)
                                }`
                              : `₹0`,
                            chatIcon: [
                              `simple-icon-eyeglass`,
                              `/app/chatinfo/${chatData.id}`,
                            ],
                            createdAt: moment(chatData?.createdAt)
                              .local()
                              .format('Do MMMM, YYYY'),
                            createdTime: moment(chatData?.createdAt)
                              .local()
                              .format('h:mm:ss a'),
                          };
                        })}
                        advisorId={CONSTANTS.TABLE_ID.chatHistory}
                        filterParams="name"
                      />
                    </CardBody>
                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId="availability">
                <Row>
                  <Colxx sm="12">
                    <Row className="justify-content-end">
                      <Button
                        outline
                        color="primary"
                        style={{
                          // alignItems: 'end',
                          // margin: '0 0 20px 20px',
                          marginLeft: 'auto',
                          marginBottom: '14px',
                          position: 'absolute',
                          right: '15px',
                          top: '-100px',
                          zIndex: '100',
                        }}
                        className="top-right-button"
                        onClick={() => setModalOpen((previous) => !previous)}
                      >
                        <IntlMessages id="survey.add-new" />
                      </Button>
                    </Row>
                    <CardBody>
                      <ViewTable
                        headers={CONSTANTS.TABLE_HEADER.ADVISOR_AVAILABILITY}
                        filterParams="id"
                        items={advisorAvailabilities
                          .sort((a, b) => a?.day - b?.day)
                          .map((item, index) => {
                            return {
                              ...item,
                              no: index + 1,
                              day: Days[item?.day].label,

                              createdTime: moment(item.createdAt)
                                .local()
                                .format('h:mm:ss a'),
                              createdAt: moment(item.createdAt)
                                .local()
                                .format('dddd, MMMM Do YYYY'),
                              updatedAt: moment(item.updatedAt)
                                .local()
                                .format('dddd, MMMM Do YYYY'),
                              action: [() => deletePopup(item), false],
                            };
                          })}
                        advisorId={CONSTANTS.TABLE_ID.adminTransaction}
                      />
                    </CardBody>
                  </Colxx>
                </Row>
              </TabPane>
            </TabContent>
          </Card>
        </Colxx>
      </Row>
      <AlertPopup
        isOpen={isModelOpen}
        toggleModal={() => setIsModelOpen((previous) => !previous)}
        onPositive={deleteAvailabilityHandler}
        onNegative={() => setIsModelOpen((previous) => !previous)}
        positiveText="Agree"
        negativeText="cancel"
        warning="Aar you sure want to delete the Availability ?"
      />
    </Colxx>
  );
};

export default injectIntl(AdvisorTableBody);
