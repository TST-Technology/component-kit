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
} from 'reactstrap';
import ViewTable from 'utils/ReactTableCards';
import CONSTANTS, { getTime } from 'utils/CONSTANTS';
import { Colxx } from 'components/common/CustomBootstrap';
import classnames from 'classnames';
import IntlMessages from 'helpers/IntlMessages';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import { getChatStatus } from 'utils/function';






const UserTableBody = ({ userTransaction, userCallRecord, userChatRecord,    loginHistory }) => {
  const [activeTab, setActiveTab] = useState('details');
  return (
    <Colxx xxs="12">
      <Row>
        <Colxx xxs="12" xl="12" className="col-left">
          <Card className="mb-4">
            <CardHeader>
              <Nav tabs className="card-header-tabs">
                {CONSTANTS.USERINFO.map((data) => (
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
              <TabPane tabId="details">
                <Row>
                  <Colxx sm="12">
                    <CardBody>
                      <ViewTable
                        headers={CONSTANTS.TABLE_HEADER.USERS_TRANSACTION}
                        items={userTransaction.map((transaction, index) => {

                          return {
                            ...transaction,
                            no: index + 1,
                            createdAt: moment(transaction.createdAt)
                              .local()
                              .format('Do MMMM, YYYY'),
                            createdTime: moment(transaction.createdAt)
                              .local()
                              .format('h:mm:ss a'),

                            transactionText: [transaction?.amount, transaction?.status + (transaction?.method === "wallet" ? "wallet" : "add")]
                          };
                        })}
                        advisorId={CONSTANTS.TABLE_ID.userTransaction}
                      />
                    </CardBody>
                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId="comments">
                <Row>
                  <Colxx sm="12">
                    <CardBody>
                      <ViewTable
                        headers={CONSTANTS.TABLE_HEADER.USER_CALL_RECORDS}
                        items={userCallRecord.map((record, index) => {
                          return {
                            ...record,
                            no: index + 1,
                            V_Get: (record.callCost - record.advisorCahrge),
                            transactionText: [record?.status]
                          };
                        })}
                        advisorId={CONSTANTS.TABLE_ID.callRecords}
                        filterParams="advisorMobile"
                      />
                    </CardBody>
                  </Colxx>
                </Row>
              </TabPane>

              <TabPane tabId="chatHistory">
                <Row>
                  <Colxx sm="12">
                    <CardBody>
                      <ViewTable
                        headers={CONSTANTS.TABLE_HEADER.USER_CHAT_HISTORY}
                        items={userChatRecord.map((chatData, index) => {
                          return {
                            ...chatData,
                            no: index + 1,
                            ...chatData?.Advisor,
                            status: getChatStatus(chatData),
                            duration : getTime(chatData?.duration*60),
                            userCost: [chatData?.userCost ? chatData?.userCost:`0`, getChatStatus(chatData)
                             ],
                            advisorCharge: chatData?.advisorCharge ? `₹${chatData?.advisorCharge}` :`₹0`,
                            chatIcon: [`simple-icon-eyeglass` ,`/app/chatinfo/${chatData.id}`] ,                                     
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


              <TabPane tabId="loginHistory">
                <Row>
                  <Colxx sm="12">
                    <CardBody>
                      <ViewTable
                        headers={CONSTANTS.TABLE_HEADER.LOGIN_HISTORY}
                        items={loginHistory.map((loginData, index) => {
                          return {
                            ...loginData,
                            no: index + 1,
                            createdAt: moment(loginData.createdAt)
                              .local()
                              .format('Do MMMM, YYYY'),
                            createdTime: moment(loginData.createdAt)
                              .local()
                              .format('h:mm:ss a'),
                          };
                        })}
                        advisorId={CONSTANTS.TABLE_ID.loginHistory}
                      />
                    </CardBody>
                  </Colxx>
                </Row>
              </TabPane>
            </TabContent>
          </Card>
        </Colxx>
      </Row>
    </Colxx>
  );
};

export default injectIntl(UserTableBody);
