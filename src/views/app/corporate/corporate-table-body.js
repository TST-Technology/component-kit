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
} from 'reactstrap';
import CONSTANTS from 'utils/CONSTANTS';
import { Colxx } from 'components/common/CustomBootstrap';
import classnames from 'classnames';
import IntlMessages from 'helpers/IntlMessages';
import { injectIntl } from 'react-intl';
import '../advisor/main.css';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';
import ViewTable from 'utils/ReactTableCards';
import moment from 'moment';
import Papa from 'papaparse';
import { parsePhoneNumber } from 'libphonenumber-js';
import AlertPopup from 'components/alert-popup';

const isEditButtonVisible = {
  CorporateInfo: true,
  CorporateAccount: true,
};

const CorporateTableBody = ({
  corporateData,
  updateCorporateDetailsProfile,
  corporateUser,
  AddUser,
  AddBulkUser,
  RemoveUser,
  signatories,
  RemoveSignatoris,
  AddSignatoris,
  plans,
  planInfo,
  AddPlans,
  RemoveBlukUser,
}) => {
  const [activeTab, setActiveTab] = useState('User');
  const [modalOpen, setModalOpen] = useState(false);
  const [signatorymodalOpen, setSignatoryModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [isAddUsermodalOpen, setIsAddUsermodalOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const getFormKey = () => {
    if (isAddUsermodalOpen) return 'CORPORATE_ADD_USER';
    switch (activeTab) {
      case 'CorporateAccount':
        return 'CORPORATE_BANK_DETAILS';
      case 'Plan':
        return 'ADD_PLAN';
      default:
        return 'CORPORATE';
    }
  };

  const getFormData = {
    CorporateInfo: {
      ...corporateData,
      B2BPlanId: planInfo.map((plan, index) => {
        return { id: index, value: plan.name };
      }),
    },
    Plan: {
      B2BPlanId: planInfo.map((plan, index) => {
        return { id: index, value: plan.name };
      }),
    },
  };

  const addUsertoCsv = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const userArr = [];
        Object.values(results.data).map((mobileNumber) => {
          const [userMobileNumber] = Object.values(mobileNumber);
          console.log('userMobileNumber', userMobileNumber);
          userArr.push(userMobileNumber);
          return 0;
        });

        AddBulkUser(userArr);
      },
    });
  };

  return (
    <Colxx xxs="12">
      <AddNewModalWithOutButton
        modalOpen={modalOpen}
        toggleModal={() => setModalOpen((previous) => !previous)}
        sidebarMenu={getFormKey()}
        modalTitle={CONSTANTS.TABLE_ID.addModal}
        onSubmit={(e) => {
          e.preventDefault();
          if (isAddUsermodalOpen) {
            AddUser(e.target);
          } else if (activeTab === 'Plan') {
            AddPlans(e.target);
          } else {
            updateCorporateDetailsProfile(
              CONSTANTS.RIGHT_SIDEBAR_FIELD[getFormKey()],
              e.target
            );
          }
        }}
        titleId="Edit Advisor Details"
        formData={getFormData[activeTab]}
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
                {CONSTANTS.CORPORATE_INFO.map((data) => (
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
              <TabPane tabId="CorporateInfo">
                <Row>
                  <Colxx sm="12">
                    <CardBody>
                      {Object.keys(corporateData)
                        .filter(
                          (id) =>
                            id === 'name' ||
                            id === 'shortName' ||
                            id === 'email' ||
                            id === 'mobile' ||
                            id === 'GST'
                        )
                        .map((id) => (
                          <p className="mb-3" key={id}>
                            {CONSTANTS.ABOUT_US_DETAILS[id]} :{' '}
                            <span>{corporateData[id]}</span>
                          </p>
                        ))}
                    </CardBody>
                  </Colxx>
                </Row>
              </TabPane>

              <TabPane tabId="CorporateAccount">
                <Row>
                  <Colxx sm="12">
                    <CardBody>
                      {Object.keys(corporateData)
                        .filter(
                          (id) =>
                            id === 'bankAcc' ||
                            id === 'IFSC' ||
                            id === 'branch' ||
                            id === 'nameOnPassbook' ||
                            id === 'mobile'
                        )
                        .map((id) => (
                          <p className="mb-3" key={id}>
                            {CONSTANTS.ABOUT_US_DETAILS[id]} :{' '}
                            <span
                              style={{
                                color: corporateData[id] ? 'black' : 'red',
                              }}
                            >
                              {corporateData[id]
                                ? corporateData[id]
                                : 'Not provided'}
                            </span>
                          </p>
                        ))}
                    </CardBody>
                  </Colxx>
                </Row>
              </TabPane>

              <TabPane tabId="User">
                <Row>
                  <Colxx sm="12">
                    <CardBody>
                      <div
                        style={{
                          gap: '10px',
                          display: 'inline-flex',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}
                      >
                        <div
                          style={{
                            gap: '10px',
                            display: 'inline-flex',
                          }}
                        >
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
                              setIsAddUsermodalOpen(true);
                              setModalOpen((previous) => !previous);
                              return 0;
                            }}
                          >
                            <IntlMessages id="table.react-button-user" />
                          </Button>

                          {corporateUser.length > 0 && (
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
                                if (selectedUser.length <= 0) {
                                  setSelectedUser(
                                    corporateUser.map((userData) => userData.id)
                                  );
                                } else {
                                  setSelectedUser([]);
                                }

                                return 0;
                              }}
                            >
                              {selectedUser.length <= 0 && (
                                <IntlMessages id="table.react-button-select-all" />
                              )}
                              {selectedUser.length > 0 && (
                                <IntlMessages id="table.react-button-remove-select-all" />
                              )}
                            </Button>
                          )}
                          {selectedUser.length > 0 && (
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
                                setIsModelOpen(true);
                                return 0;
                              }}
                            >
                              <IntlMessages id="table.react-button-delete-select-all" />
                            </Button>
                          )}
                        </div>

                        <label htmlFor="userCsv">
                          <input
                            style={{
                              position: 'absolute',
                              marginLeft: '10px',
                              width: '171px',
                              height: '37px',
                              opacity: '0',
                            }}
                            type="file"
                            accept=".csv"
                            id="userCsv"
                            onChange={(e) => addUsertoCsv(e?.target?.files[0])}
                          />
                          <Button
                            outline
                            type="cancel"
                            color="primary"
                            style={{
                              marginLeft: 'auto',
                              marginBottom: '14px',
                              right: '15px',
                              top: '-50px',
                              zIndex: '100',
                            }}
                            className="top-right-button"
                          >
                            <IntlMessages id="table.react-button-bulk-user" />
                          </Button>
                        </label>
                      </div>

                      <ViewTable
                        headers={CONSTANTS.TABLE_HEADER.CORPORATE_USERS_LIST}
                        items={corporateUser.map((userData, index) => {
                          return {
                            ...userData,
                            no: index + 1,
                            select: [
                              (e) => {
                                if (e.target.checked) {
                                  setSelectedUser((previous) => [
                                    ...previous,
                                    userData.id,
                                  ]);
                                } else {
                                  setSelectedUser((previous) =>
                                    previous.filter(
                                      (item) => userData.id !== item
                                    )
                                  );
                                }
                              },
                              selectedUser.includes(userData.id),
                            ],
                            mobile: parsePhoneNumber(
                              `+${userData.mobile}`
                            ).formatInternational(),
                            action: [() => RemoveUser(userData.id), false],
                            createdAt: moment(userData?.createdAt)
                              .local()
                              .format('Do MMMM, YYYY'),
                            createdTime: moment(userData?.createdAt)
                              .local()
                              .format('h:mm:ss a'),
                          };
                        })}
                        advisorId="table.react-table-user"
                        filterParams="mobile"
                      />
                    </CardBody>
                  </Colxx>
                </Row>
              </TabPane>

              <TabPane tabId="Signatories">
                <Row>
                  <Colxx sm="12">
                    <CardBody>
                      <AddNewModalWithOutButton
                        modalOpen={signatorymodalOpen}
                        toggleModal={() =>
                          setSignatoryModalOpen((previous) => !previous)
                        }
                        sidebarMenu="ADD_SIGNATORIES"
                        modalTitle="table.react-signatories-form-title"
                        onSubmit={(e) => {
                          e.preventDefault();
                          AddSignatoris(e.target);
                        }}
                        titleId="Edit Advisor Details"
                        formData={{}}
                      />
                      <Button
                        outline
                        color="primary"
                        style={{
                          marginLeft: 'auto',
                          marginBottom: '14px',
                        }}
                        className="top-right-button"
                        onClick={() =>
                          setSignatoryModalOpen((previous) => !previous)
                        }
                      >
                        <IntlMessages id="table.react-button-signatories" />
                      </Button>
                      <ViewTable
                        headers={CONSTANTS.TABLE_HEADER.SIGNATORIES}
                        items={signatories.map((userData, index) => {
                          return {
                            ...userData,
                            no: index + 1,
                            action: [
                              () => RemoveSignatoris(userData.id),
                              false,
                            ],
                            createdAt: moment(userData?.createdAt)
                              .local()
                              .format('Do MMMM, YYYY'),
                            createdTime: moment(userData?.createdAt)
                              .local()
                              .format('h:mm:ss a'),
                          };
                        })}
                        advisorId="table.react-table-user"
                        filterParams="mobile"
                      />
                    </CardBody>
                  </Colxx>
                </Row>
              </TabPane>

              <TabPane tabId="Plan">
                <Row>
                  <Colxx sm="12">
                    <CardBody>
                      <div style={{ gap: '10px', display: 'inline-flex' }}>
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
                            setIsAddUsermodalOpen(false);
                            setModalOpen((previous) => !previous);
                            return 0;
                          }}
                        >
                          <IntlMessages id="table.react-button-plan" />
                        </Button>
                      </div>
                      <ViewTable
                        headers={CONSTANTS.TABLE_HEADER.PLANHISTORY}
                        items={plans.map((planData, index) => {
                          return {
                            ...planData,
                            no: index + 1,
                            amount: planData?.amount ? planData?.amount : 0,
                            action: [
                              () => RemoveSignatoris(planData?.id),
                              false,
                            ],
                            duration: planData?.duration
                              ? `${planData?.duration} Days`
                              : `0 Days`,
                            category: planData?.category
                              ? planData?.category.replaceAll(',', ' | ')
                              : '',
                            createdAt: moment(planData?.createdAt)
                              .local()
                              .format('Do MMMM, YYYY'),
                            expiryDate: moment(planData?.expiryDate)
                              .local()
                              .format('Do MMMM, YYYY'),
                            createdTime: moment(planData?.createdAt)
                              .local()
                              .format('h:mm:ss a'),
                          };
                        })}
                        advisorId="table.react-table-user"
                        filterParams="mobile"
                      />
                    </CardBody>
                  </Colxx>
                </Row>
              </TabPane>
            </TabContent>
          </Card>
        </Colxx>
        <AlertPopup
          isOpen={isModelOpen}
          toggleModal={() => setIsModelOpen((previous) => !previous)}
          onPositive={() => RemoveBlukUser(selectedUser)}
          onNegative={() => setIsModelOpen((previous) => !previous)}
          positiveText="Agree"
          negativeText="cancel"
          warning={`Aar you sure want to remove the selected ${selectedUser.length} users ?`}
        />
      </Row>
    </Colxx>
  );
};

export default injectIntl(CorporateTableBody);
