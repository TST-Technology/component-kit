import React from 'react';
import { Button, Input } from 'reactstrap';
import SwitchExamples from 'containers/forms/SwitchExamples';
import { Link, NavLink } from 'react-router-dom';

const getAmountColor = {
  processed: 'red',
  success: 'green',
  processing: 'orange',
  reversed: 'black',
  failed: '#F0F8FF',
  queued: 'orange',
  captured: 'green',
  processedadd: 'green',
  successadd: 'green',
  processingadd: 'orange',
  reversedadd: 'black',
  failedadd: '#F0F8FF',
  queuedadd: 'orange',
  capturedadd: 'green',

  processedwallet: 'red',
  successwallet: 'red',
  processingwallet: 'orange',
  reversedwallet: 'black',
  failedwallet: '#F0F8FF',
  queuedwallet: 'orange',
  capturedwallet: 'red',

  'Advisor did not accept': 'black',
  'User did not accept': 'black',
  Success: 'red',

  'aAdvisor did not accept': ' ',
  'aUser did not accept': ' ',
  aSuccess: 'green',
};

const getSymbole = {
  processed: '-',
  success: '+',
  processing: '-',
  reversed: '-',
  failed: '-',
  queued: '-',
  captured: '+',

  processedadd: '+',
  successadd: '+',
  processingadd: '+',
  reversedadd: '+',
  failedadd: '+',
  queuedadd: '+',
  capturedadd: '+',

  processedwallet: '-',
  successwallet: '-',
  processingwallet: '-',
  reversedwallet: '-',
  failedwallet: '-',
  queuedwallet: '-',
  capturedwallet: '-',

  'Advisor did not accept': ' ',
  'User did not accept': ' ',
  Success: '-',

  'aAdvisor did not accept': ' ',
  'aUser did not accept': ' ',
  aSuccess: '+',
};

const getTextColor = {
  processed: 'green',
  success: 'green',
  processing: 'orange',
  reversed: 'black',
  failed: '#F0F8FF',
  queued: 'orange',
  captured: 'green',
  user_not_answered: 'red',
  advisor_not_answered: 'red',
  advisor_not_accepted: 'red',
  advisor_disconnected: 'red',
  user_disconnected: 'red',
  user_busy: 'orange',
  advisor_busy: 'orange',
};
const AddNewKycRender = ({ value }) => {
  return (
    <Button
      outline
      color="primary"
      onClick={() => value.onAddNewKyc(value.value)}
    >
      Add
    </Button>
  );
};
export const Days = [
  {
    id: 0,
    value: 0,
    label: 'Sunday',
  },
  {
    id: 1,
    value: 1,
    label: 'Monday',
  },
  {
    id: 2,
    value: 2,
    label: 'Tuesday',
  },
  {
    id: 3,
    value: 3,
    label: 'Wednesday',
  },
  {
    id: 4,
    value: 4,
    label: 'Thursday',
  },
  {
    id: 5,
    value: 5,
    label: 'Friday',
  },
  {
    id: 6,
    value: 6,
    label: 'Saturday',
  },
];

const textRanders = ({ value }) => <>{value}</>;
const checkBoxRander = ({ value }) => (
  <>
    <input type="checkbox" onChange={value[0]} checked={value[1]} />
  </>
);
const textAmountRanders = ({ value }) => <>{`₹${value}`}</>;
const TransactionTextRanders = ({ value }) => (
  <span style={{ color: getAmountColor[value[1]] }}>{`${
    getSymbole[value[1]]
  } ₹${value[0]}`}</span>
);
const colorTextRanders = ({ value }) => (
  <span style={{ color: getTextColor[value] }}>{value}</span>
);

const ImageRanders = ({ value }) => (
  <div>
    <img className="list-item-pic" src={value} alt={value} />
  </div>
);

const ImageiconRanders = ({ value }) => (
  <Link to={value[1]}>
    <i className={value[0]} />
  </Link>
);

const bannerRanders = ({ value }) => (
  <div>
    <img className="list-item-banner" src={value} alt={value} />
  </div>
);
const InputRanders = ({ value }) => (
  <div>
    <Input
      type="number"
      defaultValue={value[0]}
      onBlur={value[1]}
      className="form-control-size"
    />
  </div>
);

const ButtonRanders = ({ value }) => (
  <div>
    <Button outline onClick={value[0]} disabled={value[1]}>
      Delete
    </Button>
  </div>
);

const PlainButtonRanders = ({ value }) => (
  <div>
    <Button outline onClick={value[0]} disabled={value[1]}>
      {value[2]}
    </Button>
  </div>
);
const RecordingRanders = ({ value }) => {
  if (value) {
    return (
      <Link to={{ pathname: value.replaceAll("'", '') }} target="_blank">
        {' '}
        <Button outline>Recording</Button>
      </Link>
    );
  }

  return <></>;
};
const ClickableTextRanders = ({ value }) => (
  <NavLink to={`/app/directory/userinfo/${value[1]}`}>{value[0]}</NavLink>
);

const ClickableAdminRanders = ({ value }) => (
  <NavLink to={`/app/advisor/advisorinfo/${value[1]}`}>{value[0]}</NavLink>
);

const ClickableKycRanders = ({ value }) => (
  <NavLink to={`/app/kyc/advisorkycinfo/${value[1]}`}>{value[0]}</NavLink>
);

const ClickableCoporateRanders = ({ value }) => (
  <NavLink to={`/app/corporate/${value[1]}`}>
    {value[0]}
    {!value[2] && (
      <p style={{ color: 'red', fontSize: '10px' }}>
        Plan Expired Please recharge
      </p>
    )}
  </NavLink>
);

const ClickableCoporateLaunchRanders = ({ value }) => (
  <a
    href={`https://launch.widur.in${value[1]}`}
    target="_blank"
    rel="noreferrer"
  >
    <Button color="success" outline onClick={value[0]}>
      Launch Page
    </Button>
  </a>
);

const ActionRanders = ({ value }) => {
  return (
    <div>
      <Button color="success" outline onClick={value[0]}>
        Approve
      </Button>
      <Button
        style={{ marginTop: '5px', width: '90px' }}
        color="danger"
        outline
        onClick={value[1]}
      >
        Reject
      </Button>
    </div>
  );
};
// Test

const Switch = ({ value }) => (
  <SwitchExamples checked={value[0]} onChange={value[1]} />
);

export const CATEGORY = {
  list: [],
};
const CONSTANTS = {
  BASE_URL: process.env.REACT_APP_BASE_URL,
  // BASE_URL: 'https://stag-backend.widur.in/api/v1',
  // BASE_URL: 'http://192.168.1.12:5000/api/v1',

  TABLE_ID: {
    lawyer: 'table.react-lawyer',
    psychologist: 'table.react-psychologist',
    sexologist: 'table.react-sexologist',
    user: 'table.react-table-user',
    callRecords: 'table.react-table-call_records',
    calls: 'table.react-table-call_records',
    Calls: 'table.react-table-call_records',
    AverageNPS: 'table.react-table-nps',
    userTransaction: 'table.react-table-user_transaction',
    loginHistory: 'table.react-table-login_history',
    chatHistory: 'table.react-table-chat_history',
    userWallet: 'table.react-table-user_wallet',
    complain: 'table.react-table-complain',
    kyc: 'table.react-table-kyc',
    admin: 'table.react-table-admin',
    corporate: 'table.react-table-corporate',
    callSession: 'table.react-table-callSession',
    addplan: 'table.react-table-addPlan',
    add: 'modal.button',
    update: 'modal.update',
    addModal: 'advisor.add-new-modal-title',
    updateModal: 'advisor.update-modal-title',
    adminTransaction: 'table.react-table-advisor_transaction',
    adminInfo: 'table.react-table-advisor_info',
    poster: 'table.react-table-poster',
    couponUsage: 'table.react-table-couponUsage',
    noKyc: 'table.react-table-no-kyc',
  },

  ABOUT_US_DETAILS: {
    name: 'Name',
    mobile: 'Mobile Number',
    expertise: 'Category',
    about: 'About',
    charges: 'Charges',
    upiId: 'UpiId',
    ratings: 'Ratings',
    ratingsQuantity: 'Ratings',
    profileViews: 'Profile Views',
    type: 'Advisot Type',
    language: 'Languages',
    shortName: 'Name On User App',
    email: 'Email',
    GST: 'GST',
    bankAcc: 'Bank Account Number',
    IFSC: 'IFSC',
    branch: 'Branch',
    nameOnPassbook: 'Name On Passbook',
    FcmToken: 'Notification Token',
  },
  ADVISOR_TYPE: {
    1: 'Normal Advisor',
    2: 'Onboard Advisor',
  },

  ADVISOR_KYC_DETAILS: {
    specification: 'Category',
    practicingLocation: 'Practicing Location',
    practicingCourt: 'Practicing Court ',
    practicingStartDate: 'Practicing Start-Date',
    aadhar: 'Aadhaar Number',
    pan: 'Pan Number',
    registrationNo: 'Registration No',
    remark: 'Remark',
    AdvisorId: 'Advisor Id',
  },

  TABLE_HEADER: {
    ADMIN: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5 ',
        Cell: textRanders,
      },
      {
        Header: 'Name',
        accessor: 'title',
        cellClass: 'list-item-heading w-50',
        Cell: textRanders,
      },
      {
        Header: 'Email',
        accessor: 'email',
        cellClass: 'list-item-heading w-50',
        Cell: textRanders,
      },
      {
        Header: 'Role',
        accessor: 'role',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
    ],
    CORPORATE: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5 ',
        Cell: textRanders,
      },
      {
        Header: 'Image',
        accessor: 'image',
        cellClass: 'list-item-heading ',
        Cell: ImageRanders,
      },
      {
        Header: 'Name',
        accessor: 'name',
        cellClass: 'list-item-heading ',
        Cell: ClickableCoporateRanders,
      },
      {
        Header: 'Email',
        accessor: 'email',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Launching Page',
        accessor: 'launch',
        cellClass: 'list-item-heading ',
        Cell: ClickableCoporateLaunchRanders,
      },

      {
        Header: 'Actions',
        accessor: 'action',
        cellClass: 'list-item-heading ',
        Cell: Switch,
      },
    ],

    ADVISOR: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5 ',
        Cell: textRanders,
      },
      {
        Header: 'Pic',
        accessor: 'profile',
        cellClass: 'list-item-pic w-10',
        Cell: ImageRanders,
      },
      {
        Header: 'Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-50',
        Cell: ClickableAdminRanders,
      },
      {
        Header: 'Contact Numbers',
        accessor: 'mobile',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Charges',
        accessor: 'charges',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Visible to B2B User',
        accessor: 'isVisible',
        cellClass: 'list-item-heading w-10',
        Cell: Switch,
      },
      {
        Header: 'Actions',
        accessor: 'isBlocked',
        cellClass: 'list-item-heading w-10',
        Cell: Switch,
      },
    ],

    USER_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Contact Numbers',
        accessor: 'mobile',
        cellClass: 'list-item-heading w-40',
        Cell: ClickableTextRanders,
      },
      {
        Header: 'Wallet Balance',
        accessor: 'amount',
        cellClass: 'list-item-heading w-40',
        Cell: textRanders,
      },
      {
        Header: 'Last Open',
        accessor: 'lastOpen',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Actions',
        accessor: 'action',
        cellClass: 'list-item-heading w-40',
        Cell: Switch,
      },
    ],

    CATEGORY_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Pic',
        accessor: 'image',
        cellClass: 'list-item-pic w-10',
        Cell: ImageRanders,
      },
      {
        Header: 'Contact Numbers',
        accessor: 'expertise',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'list-item-heading ',
        Cell: PlainButtonRanders,
      },
    ],

    CALL_RECORDS: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'User Numbers',
        accessor: 'userMobile',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },

      {
        Header: 'Call Duration',
        accessor: 'callDuration',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Coupon Name',
        accessor: 'coupon_name',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Discount',
        accessor: 'discount',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Call Charges',
        accessor: 'callCost',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Call Status',
        accessor: 'status',
        cellClass: 'list-item-heading w-20',
        Cell: colorTextRanders,
      },
      {
        Header: 'Date',
        accessor: 'createdAt',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Recording',
        accessor: 'recordingURL',
        cellClass: 'list-item-heading w-20',
        Cell: RecordingRanders,
      },
    ],

    USER_CALL_RECORDS: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Advisor Number',
        accessor: 'advisorMobile',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Advisor Charges',
        accessor: 'advisorCahrge',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Call Duration',
        accessor: 'callDuration',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Call Charges',
        accessor: 'callCost',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Call Status',
        accessor: 'status',
        cellClass: 'list-item-heading w-10',
        Cell: colorTextRanders,
      },
      {
        Header: 'Tax(Perc)',
        accessor: 'taxPerc',
        cellClass: 'list-item-heading ',
        Cell: colorTextRanders,
      },
      {
        Header: 'Service Charge(Perc)',
        accessor: 'serviceChargePerc',
        cellClass: 'list-item-heading',
        Cell: colorTextRanders,
      },
      {
        Header: 'We get',
        accessor: 'V_Get',
        cellClass: 'list-item-heading w-10',
        Cell: colorTextRanders,
      },
      {
        Header: 'Date',
        accessor: 'createdAt',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Time',
        accessor: 'createdTime',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Recording',
        accessor: 'recordingURL',
        cellClass: 'list-item-heading w-20',
        Cell: RecordingRanders,
      },
    ],

    USER_CHAT_HISTORY: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Advisor Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Advisor Charges',
        accessor: 'advisorCharge',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Chat Duration',
        accessor: 'duration',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Chat Charges',
        accessor: 'userCost',
        cellClass: 'list-item-heading ',
        Cell: TransactionTextRanders,
      },
      {
        Header: 'Chat Status',
        accessor: 'status',
        cellClass: 'list-item-heading w-10',
        Cell: colorTextRanders,
      },
      {
        Header: 'Date',
        accessor: 'createdAt',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Time',
        accessor: 'createdTime',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'ChatView',
        accessor: 'chatIcon',
        cellClass: 'list-item-heading ',
        Cell: ImageiconRanders,
      },
    ],
    ADVISOR_CHAT_HISTORY: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'User Number',
        accessor: 'mobile',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Advisor Charges',
        accessor: 'advisorCharge',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Chat Duration',
        accessor: 'duration',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Chat Charges',
        accessor: 'userCost',
        cellClass: 'list-item-heading ',
        Cell: TransactionTextRanders,
      },
      {
        Header: 'Chat Status',
        accessor: 'status',
        cellClass: 'list-item-heading w-10',
        Cell: colorTextRanders,
      },
      {
        Header: 'Date',
        accessor: 'createdAt',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Time',
        accessor: 'createdTime',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'ChatView',
        accessor: 'chatIcon',
        cellClass: 'list-item-heading ',
        Cell: ImageiconRanders,
      },
    ],
    CORPORATE_USERS_LIST: [
      {
        Header: 'Select All',
        accessor: 'select',
        cellClass: 'list-item-heading w-10',
        Cell: checkBoxRander,
      },
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'User Number',
        accessor: 'mobile',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'User Number',
        accessor: 'action',
        cellClass: 'list-item-heading ',
        Cell: ButtonRanders,
      },
    ],
    DASHBOARD_CALL_RECORDS: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'USER Number',
        accessor: 'userMobile',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Advisor name',
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Advisor Number',
        accessor: 'advisorMobile',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Advisor Charges',
        accessor: 'advisorCahrge',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Call Duration',
        accessor: 'callDuration',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Call Charges',
        accessor: 'callCost',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Call Status',
        accessor: 'status',
        cellClass: 'list-item-heading w-10',
        Cell: colorTextRanders,
      },
      {
        Header: 'Tax(Perc)',
        accessor: 'taxPerc',
        cellClass: 'list-item-heading ',
        Cell: colorTextRanders,
      },
      {
        Header: 'Service Charge(Perc)',
        accessor: 'serviceChargePerc',
        cellClass: 'list-item-heading',
        Cell: colorTextRanders,
      },
      {
        Header: 'We get',
        accessor: 'V_Get',
        cellClass: 'list-item-heading w-10',
        Cell: colorTextRanders,
      },
      {
        Header: 'Date',
        accessor: 'createdAt',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Time',
        accessor: 'createdTime',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Recording',
        accessor: 'recordingURL',
        cellClass: 'list-item-heading w-20',
        Cell: RecordingRanders,
      },
    ],
    DASHBOARD_NPS_RECORDS: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'USER Number',
        accessor: 'mobile',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Rating',
        accessor: 'rating',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Date',
        accessor: 'createdAt',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Time',
        accessor: 'createdTime',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
    ],
    USER_WALLET: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Name',
        accessor: 'title',
        cellClass: 'list-item-heading w-60',
        Cell: textRanders,
      },
      {
        Header: 'Amount',
        accessor: 'stock',
        cellClass: 'list-item-heading w-40',
        Cell: textRanders,
      },
      {
        Header: 'UPI ID',
        accessor: 'upi_id',
        cellClass: 'list-item-heading w-40',
        Cell: textRanders,
      },
      {
        Header: 'Date',
        accessor: 'createDate',
        cellClass: 'list-item-heading w-40',
        Cell: textRanders,
      },
    ],

    USERS_TRANSACTION: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Transaction Id',
        accessor: 'id',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Amount',
        accessor: 'transactionText',
        cellClass: 'list-item-heading w-10',
        Cell: TransactionTextRanders,
      },
      {
        Header: 'Status',
        accessor: 'status',
        cellClass: 'list-item-heading w-10',
        Cell: colorTextRanders,
      },
      {
        Header: 'Method',
        accessor: 'method',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Date',
        accessor: 'createdAt',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Time',
        accessor: 'createdTime',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
    ],

    ADVISORS_TRANSACTION: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Advisor Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-60',
        Cell: textRanders,
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Date',
        accessor: 'createdAt',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Transaction Request',
        accessor: 'status',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
    ],

    ADMIN_TRANSACTION: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Transaction ID',
        accessor: 'id',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Amount',
        accessor: 'transactionText',
        cellClass: 'list-item-heading w-10',
        Cell: TransactionTextRanders,
      },
      {
        Header: 'Created Date',
        accessor: 'createdAt',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Created Time',
        accessor: 'createdTime',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Payout Status',
        accessor: 'status',
        cellClass: 'list-item-heading w-10',
        Cell: colorTextRanders,
      },
    ],

    FEEDBACKS: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Advisor Name',
        accessor: 'advisor_name',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Advisor Numbers',
        accessor: 'advisor_number',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Category',
        accessor: 'advisor_category',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'User Numbers',
        accessor: 'user_number',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Date',
        accessor: 'createdAt',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Time',
        accessor: 'time',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
    ],

    KYC: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-60',
        Cell: ClickableKycRanders,
      },
      {
        Header: 'Contact Number',
        accessor: 'mobile',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Category',
        accessor: 'expertise',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Charges',
        accessor: 'charges',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'UPI ID',
        accessor: 'upiId',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Actions',
        accessor: 'action',
        cellClass: 'list-item-heading w-20',
        Cell: ActionRanders,
      },
    ],

    NO_KYC: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-60',
        Cell: ClickableKycRanders,
      },
      {
        Header: 'Contact Number',
        accessor: 'mobile',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Category',
        accessor: 'expertise',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Charges',
        accessor: 'charges',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'UPI ID',
        accessor: 'upiId',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Action',
        accessor: 'actionItem',
        cellClass: 'list-item-heading w-20',
        Cell: AddNewKycRender,
      },
    ],

    EXPERTISE: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Name',
        accessor: 'specialization',
        cellClass: 'list-item-heading w-60',
        Cell: textRanders,
      },
      {
        Header: 'Count',
        accessor: 'search',
        cellClass: 'list-item-heading w-40 form-control-size',
        Cell: InputRanders,
      },
      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'list-item-heading w-40',
        Cell: ButtonRanders,
      },
    ],

    BANNER: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5 ',
        Cell: textRanders,
      },
      {
        Header: 'Image',
        accessor: 'image',
        cellClass: 'list-item-heading w-50',
        Cell: bannerRanders,
      },

      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'list-item-heading w-40',
        Cell: ButtonRanders,
      },
    ],
    ADVISOR_AVAILABILITY: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading',
        Cell: textRanders,
      },
      {
        Header: 'Day',
        accessor: 'day',
        cellClass: 'list-item-heading',
        Cell: textRanders,
      },
      {
        Header: 'Start Time',
        accessor: 'startTime',
        cellClass: 'list-item-heading',
        Cell: textRanders,
      },
      {
        Header: 'End Time',
        accessor: 'endTime',
        cellClass: 'list-item-heading',
        Cell: textRanders,
      },
      {
        Header: 'Create Date',
        accessor: 'createdAt',
        cellClass: 'list-item-heading',
        Cell: textRanders,
      },
      {
        Header: 'Update Date',
        accessor: 'updatedAt',
        cellClass: 'list-item-heading',
        Cell: textRanders,
      },
      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'list-item-heading',
        Cell: ButtonRanders,
      },
    ],

    COUPON_USER: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5 ',
        Cell: textRanders,
      },
      {
        Header: 'Mobile Number',
        accessor: 'mobileClick',
        cellClass: 'list-item-heading w-50',
        Cell: ClickableTextRanders,
      },
      {
        Header: 'Date',
        accessor: 'createdAt',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Time',
        accessor: 'createdTime',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
    ],

    LOGIN_HISTORY: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5 ',
        Cell: textRanders,
      },
      {
        Header: 'Date',
        accessor: 'createdAt',
        cellClass: 'list-item-heading w-50',
        Cell: textRanders,
      },
      {
        Header: 'Time',
        accessor: 'createdTime',
        cellClass: 'list-item-heading w-50',
        Cell: textRanders,
      },
    ],

    CALL_SESSION: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5 ',
        Cell: textRanders,
      },
      {
        Header: 'Discount',
        accessor: 'discount',
        cellClass: 'list-item-heading w-50',
        Cell: textRanders,
      },
      {
        Header: 'Duration',
        accessor: 'duration',
        cellClass: 'list-item-heading w-50',
        Cell: textRanders,
      },
      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'list-item-heading w-40',
        Cell: ButtonRanders,
      },
    ],

    DASHBOARD_ADVISOR: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5 ',
        Cell: textRanders,
      },
      {
        Header: 'Pic',
        accessor: 'profile',
        cellClass: 'list-item-pic w-10',
        Cell: ImageRanders,
      },
      {
        Header: 'Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-50',
        Cell: ClickableAdminRanders,
      },
      {
        Header: 'Contact Numbers',
        accessor: 'mobile',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Charges',
        accessor: 'charges',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Actions',
        accessor: 'isBlocked',
        cellClass: 'list-item-heading w-10',
        Cell: Switch,
      },
    ],

    PLANS: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5 ',
        Cell: textRanders,
      },
      {
        Header: 'Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Duration',
        accessor: 'duration',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Category',
        accessor: 'category',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Actions',
        accessor: 'action',
        cellClass: 'list-item-heading ',
        Cell: ButtonRanders,
      },
    ],

    SIGNATORIES: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5 ',
        Cell: textRanders,
      },
      {
        Header: 'Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Email',
        accessor: 'email',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Mobile Number',
        accessor: 'mobile',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Actions',
        accessor: 'action',
        cellClass: 'list-item-heading ',
        Cell: ButtonRanders,
      },
    ],

    PLANHISTORY: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5 ',
        Cell: textRanders,
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        cellClass: 'list-item-heading ',
        Cell: textAmountRanders,
      },
      {
        Header: 'Duration',
        accessor: 'duration',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Category',
        accessor: 'category',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Stat Date',
        accessor: 'createdAt',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
      {
        Header: 'Expiry Date',
        accessor: 'expiryDate',
        cellClass: 'list-item-heading ',
        Cell: textRanders,
      },
    ],
  },

  RESPONSE_STATUS: {
    success: true,
  },

  CALL_AMOUNT: [
    {
      no: 0,
      label: 'taxHorizontal',
      tagId: 'forms.tax',
      type: 'text',
      name: 'taxPerc',
      messages: 'forms.tax.placeholder',
      apiKey: 'taxPerc',
    },
    {
      no: 1,
      label: 'systemChargesHorizontal',
      tagId: 'forms.system-charges',
      type: 'text',
      name: 'serviceChargePerc',
      placeholder: '',
      messages: 'forms.system-charges.placeholder',
      apiKey: 'serviceChargePerc',
    },
    {
      no: 2,
      label: 'averageCallMinutes',
      tagId: 'forms.average-call-minutes',
      type: 'text',
      name: 'avgDuration',
      placeholder: '',
      messages: 'forms.average-call-minutes.placeholder',
      apiKey: 'avgDuration',
    },
  ],

  CUSTOMIZE_FEILD: [
    {
      no: 0,
      label: 'In House Advisor Share',
      tagId: 'forms.inHouseAdvisorShare',
      type: 'text',
      name: 'inHouseAdvisorShare',
      messages: 'In House Advisor Share (in %)',
      apiKey: 'inHouseAdvisorShare',
    },
    {
      no: 1,
      label: 'averageCallMinutes',
      tagId: 'forms.average-bonusAmount',
      type: 'number',
      name: 'bonusAmount',
      placeholder: '',
      messages: 'Account opening balance (in ₹)',
      apiKey: 'bonusAmount',
    },
  ],

  RIGHT_SIDEBAR_FIELD: {
    LAWYER_EXPERTISE: [
      {
        no: 0,
        Label: 'modal.first',
        name: 'specialization',
        type: 'text',
        id: 'specialization',
        required: true,
      },
    ],
    CORPORATE_MODAL: [
      {
        no: 0,
        Label: 'modal.corporate-image',
        name: 'image',
        type: 'text',
        id: 'image',
        required: true,
      },
      {
        no: 1,
        Label: 'modal.corporate-name',
        name: 'name',
        type: 'text',
        id: 'name',
        required: true,
      },
      {
        no: 2,
        Label: 'modal.corporate.email',
        name: 'email',
        type: 'email',
        id: 'email',
        required: true,
      },
      {
        no: 3,
        Label: 'modal.corporate-isblocked',
        name: 'action',
        type: 'text',
        id: 'action',
        required: true,
      },
    ],
    AVAILABILITY_MODAL: [
      {
        no: 0,
        Label: 'modal.advisor-startTime',
        name: 'startTime',
        type: 'time',
        id: 'startTime',
        required: true,
      },
      {
        no: 1,
        Label: 'modal.advisor-endTime',
        name: 'endTime',
        type: 'time',
        id: 'endTime',
        required: true,
      },
      {
        no: 2,
        Label: 'modal.select-day',
        name: 'day',
        type: 'select',
        option: Days,
        id: 'day',
        required: true,
      },
      {
        no: 3,
        id: 'saveForAllDays',
        Label: 'modal.saveForAllDays',
        name: 'saveForAllDays',
        type: 'checkbox',
        required: false,
      },
    ],
    CORPORATE_BANK_DETAILS: [
      {
        no: 0,
        Label: 'modal.advisor-account-name',
        name: 'bankAcc',
        type: 'number',
        id: 'bankAcc',
        required: true,
      },
      {
        no: 1,
        Label: 'modal.advisor-IFSC',
        name: 'IFSC',
        type: 'text',
        id: 'IFSC',
        required: true,
      },
      {
        no: 1,
        Label: 'modal.advisor-passbook-name',
        name: 'nameOnPassbook',
        type: 'text',
        id: 'nameOnPassbook',
        required: true,
      },
      {
        no: 2,
        Label: 'modal.admin-branch',
        name: 'branch',
        type: 'text',
        id: 'branch',
        required: true,
      },
      {
        no: 3,
        Label: 'modal.advisor-mobile',
        name: 'mobile',
        type: 'mobile',
        id: 'mobile',
        required: true,
      },
    ],
    CORPORATE_ADD_USER: [
      {
        no: 3,
        Label: 'modal.advisor-mobile',
        name: 'mobile',
        type: 'number',
        id: 'mobile',
        required: true,
      },
    ],
    ADMIN_MODAL: [
      {
        no: 0,
        Label: 'modal.admin-name',
        name: 'fname',
        type: 'text',
        id: 'fname',
        required: true,
      },
      {
        no: 1,
        Label: 'modal.admin-lname',
        name: 'lname',
        type: 'text',
        id: 'lname',
        required: true,
      },
      {
        no: 2,
        Label: 'modal.admin-email',
        name: 'admin-email',
        type: 'email',
        id: 'admin_email',
        required: true,
      },
      {
        no: 3,
        Label: 'modal.admin-password',
        name: 'admin_password',
        type: 'password',
        id: 'admin-password',
        placeholder: 'password',
        required: true,
      },
      {
        no: 4,
        Label: 'modal.admin-role',
        name: 'role',
        type: 'select',
        option: [
          {
            id: 0,
            value: 'Admin',
            label: 'Admin',
          },
          {
            id: 1,
            value: 'Agent',
            label: 'Agent',
          },
        ],
        id: 'role',
        required: true,
      },
    ],
    NEW_DVISOR_MODAL: [
      {
        no: -1,
        Label: 'modal.advisor-ProfilePic',
        name: 'profile',
        type: 'file',
        id: 'profile',
        accept: '.png,.jpg,jpeg',
        required: true,
      },
      {
        no: 0,
        Label: 'modal.advisor-name',
        name: 'name',
        type: 'text',
        id: 'name',
        required: true,
      },
      {
        no: 1,
        Label: 'modal.advisor-mobile',
        name: 'mobile',
        type: 'number',
        id: 'mobile',
        required: true,
      },
      {
        no: 2,
        Label: 'modal.advisor-about',
        name: 'about',
        type: 'text',
        id: 'about',
        required: true,
      },
      {
        no: 3,
        Label: 'survey.category',
        name: 'expertise',
        type: 'select',
        id: 'expertise',
        required: true,
      },

      {
        no: 4,
        Label: 'modal.advisor-upiId',
        name: 'upiId',
        type: 'text',
        id: 'upiId',
        required: true,
      },

      {
        no: 5,
        Label: 'modal.advisor-charges',
        name: 'charges',
        type: 'number',
        id: 'charges',
        required: true,
      },

      {
        no: 6,
        Label: 'survey.type',
        name: 'type',
        type: 'select',
        option: [
          {
            id: 0,
            value: 1,
            label: 'Normal Advisor',
          },
          {
            id: 2,
            value: 2,
            label: 'Onboard Advisor',
          },
        ],
        id: 'type',
        required: true,
      },

      {
        no: 7,
        Label: 'modal.advisor-license',
        name: 'license',
        type: 'file',
        id: 'license',
        accept: '.png,.jpg,jpeg,.pdf',
        required: true,
      },
      {
        no: 8,
        Label: 'modal.advisor-practicingCourt',
        name: 'practicingCourt',
        type: 'text',
        id: 'practicingCourt',
        required: false,
      },
      {
        no: 9,
        Label: 'modal.advisor-specification',
        name: 'specification',
        type: 'text',
        id: 'specification',
        required: true,
      },
      {
        no: 10,
        Label: 'modal.advisor-practicingLocation',
        name: 'practicingLocation',
        type: 'text',
        id: 'practicingLocation',
        required: true,
      },
      {
        no: 11,
        Label: 'modal.advisor-practicingStartDate',
        name: 'practicingStartDate',
        type: 'date',
        id: 'practicingStartDate',
        required: true,
      },

      {
        no: 12,
        Label: 'modal.advisor-aadhar',
        name: 'aadhar',
        type: 'number',
        id: 'aadhar',
        required: true,
      },

      {
        no: 13,
        Label: 'modal.advisor-registrationNo',
        name: 'registrationNo',
        type: 'text',
        id: 'registrationNo',
        required: true,
      },

      {
        no: 14,
        Label: 'modal.advisor-pan',
        name: 'pan',
        type: 'text',
        id: 'pan',
        required: true,
      },

      {
        no: 15,
        Label: 'Aadhar File',
        name: 'aadharFile',
        type: 'file',
        id: 'aadharFile',
        accept: '.png,.jpg,jpeg,.pdf',
        required: true,
      },
      {
        no: 16,
        Label: 'modal.advisor-panFile',
        name: 'panFile',
        type: 'file',
        id: 'panFile',
        accept: '.png,.jpg,jpeg,.pdf',
        required: true,
      },
    ],
    ADVISOR_MODAL: [
      {
        no: 0,
        Label: 'modal.advisor-name',
        name: 'name',
        type: 'text',
        id: 'name',
        required: true,
      },
      {
        no: 1,
        Label: 'modal.advisor-mobile',
        name: 'mobile',
        type: 'number',
        id: 'mobile',
        required: true,
      },
      {
        no: 2,
        Label: 'modal.advisor-about',
        name: 'about',
        type: 'text',
        id: 'about',
        required: true,
      },
      {
        no: 3,
        Label: 'survey.category',
        name: 'expertise',
        type: 'select',
        id: 'expertise',
        required: true,
      },

      {
        no: 4,
        Label: 'modal.advisor-upiId',
        name: 'upiId',
        type: 'text',
        id: 'upiId',
        required: false,
      },

      {
        no: 5,
        Label: 'modal.advisor-charges',
        name: 'charges',
        type: 'number',
        id: 'charges',
        required: true,
      },

      {
        no: 3,
        Label: 'survey.type',
        name: 'type',
        type: 'select',
        option: [
          {
            id: 0,
            value: 1,
            label: 'Normal Advisor',
          },
          {
            id: 2,
            value: 2,
            label: 'Onboard Advisor',
          },
        ],
        id: 'type',
        required: true,
      },
    ],

    CATEGORY_MODAL: [
      {
        no: 0,
        Label: 'modal.category-image',
        name: 'image',
        type: 'file',
        id: 'image',
        required: true,
      },
      {
        no: 1,
        Label: 'modal.category-name',
        name: 'expertise',
        type: 'text',
        id: 'expertise',
        required: true,
      },
    ],
    Edit_CATEGORY_MODAL: [
      {
        no: 0,
        Label: 'modal.category-image',
        name: 'image',
        type: 'file',
        id: 'image',
        required: false,
      },
      {
        no: 1,
        Label: 'modal.category-name',
        name: 'expertise',
        type: 'text',
        id: 'expertise',
        required: true,
      },
    ],
    CORPORATE: [
      {
        no: 0,
        Label: 'modal.advisor-name',
        name: 'name',
        type: 'text',
        id: 'name',
        required: true,
      },
      {
        no: 1,
        Label: 'modal.advisor-shortName',
        name: 'shortName',
        type: 'text',
        id: 'shortName',
        required: true,
      },
      {
        no: 2,
        Label: 'modal.admin-email',
        name: 'email',
        type: 'email',
        id: 'email',
        required: true,
      },
      {
        no: 3,
        Label: 'modal.admin-password',
        name: 'password',
        type: 'password',
        id: 'password',
        required: true,
      },
      {
        no: 4,
        Label: 'modal.advisor-mobile',
        name: 'mobile',
        type: 'number',
        id: 'mobile',
        required: true,
      },
      {
        no: 5,
        Label: 'modal.advisor-gst',
        name: 'GST',
        type: 'number',
        id: 'GST',
        required: true,
      },
      {
        no: 5,
        Label: 'modal.advisor-PlanID',
        name: 'B2BPlanId',
        type: 'select',
        id: 'B2BPlanId',
        required: true,
      },
    ],
    ADD_PLAN: [
      {
        no: 5,
        Label: 'modal.advisor-PlanID',
        name: 'B2BPlanId',
        type: 'select',
        id: 'B2BPlanId',
        required: true,
      },
    ],
    ADVISOR_KVC_MODAL: [
      {
        no: 1,
        Label: 'modal.advisor-practicing-location',
        name: 'practicingLocation',
        type: 'text',
        id: 'practicingLocation',
        required: true,
      },
      {
        no: 2,
        Label: 'modal.advisor-practicing-court',
        name: 'practicingCourt',
        type: 'text',
        id: 'practicingCourt',
        required: true,
      },
      {
        no: 3,
        Label: 'modal.advisor-practicing-start-Date',
        name: 'practicingStartDate',
        type: 'date',
        id: 'practicingStartDate',
        required: true,
      },
      {
        no: 4,
        Label: 'modal.advisor-aadhaar-number',
        name: 'aadhar',
        type: 'text',
        id: 'aadhar',
        required: true,
      },
      {
        no: 5,
        Label: 'modal.advisor-pan-number',
        name: 'pan',
        type: 'text',
        id: 'pan',
        required: true,
      },
      {
        no: 6,
        Label: 'modal.advisor-remark',
        name: 'remark',
        type: 'text',
        id: 'remark',
        required: true,
      },
      {
        no: 7,
        Label: 'modal.advisor-aadharCard',
        name: 'aadharFile',
        type: 'file',
        id: 'aadharFile',
        accept: '.png,.jpg,jpeg,.pdf',
      },
      {
        no: 8,
        Label: 'modal.advisor-panCard',
        name: 'panFile',
        type: 'file',
        id: 'panFile',
        accept: '.png,.jpg,jpeg,.pdf',
      },
      {
        no: 9,
        Label: 'modal.advisor-video',
        name: 'video',
        type: 'file',
        id: 'video',
        accept: 'video/mp4,video/x-m4v,video/*',
      },
    ],
    KYC_MODAL: [
      {
        no: 0,
        Label: 'modal.kyc-charges',
        name: 'remark',
        type: 'text',
        id: 'remark',
        required: true,
      },
    ],
    CALL_AMOUNT_MODAL: [
      {
        no: 0,
        Label: 'forms.tax.placeholder',
        name: 'taxPerc',
        id: 'taxPerc',
        type: 'text',
        required: true,
      },
      {
        no: 1,
        Label: 'forms.system-charges',
        name: 'serviceChargePerc',
        id: 'serviceChargePerc',
        type: 'text',
        required: true,
      },
    ],
    CALL_SESSION: [
      {
        no: 1,
        Label: 'modal.call-duration',
        name: 'duration',
        type: 'number',
        id: 'duration',
        required: true,
      },
      {
        no: 2,
        Label: 'modal.call-discount',
        name: 'discount',
        type: 'number',
        id: 'discount',
        required: true,
      },
    ],
    CREATE_PLAN: [
      {
        no: 1,
        Label: 'modal.b2b-plan-name',
        name: 'name',
        type: 'text',
        id: 'name',
        required: true,
      },
      {
        no: 2,
        Label: 'modal.b2b-plan-amount',
        name: 'amount',
        type: 'number',
        id: 'amount',
        required: true,
      },

      {
        no: 3,
        Label: 'modal.b2b-plan-duration',
        name: 'duration',
        type: 'number',
        id: 'duration',
        required: true,
      },
      {
        no: 4,
        Label: 'menu.lawyer',
        type: 'dynemicCheckboxList',
        id: 'category',
        value: 'Lawyer',
        required: false,
      },
    ],
    ADD_SIGNATORIES: [
      {
        no: 1,
        Label: 'table.react-signatories-name',
        name: 'name',
        type: 'text',
        id: 'name',
        required: true,
      },
      {
        no: 2,
        Label: 'table.react-signatories-email',
        name: 'email',
        type: 'email',
        id: 'email',
        required: true,
      },
      {
        no: 3,
        Label: 'table.react-signatories-Mobile',
        name: 'mobile',
        type: 'number',
        id: 'mobile',
        required: true,
      },
    ],
  },

  USERINFO: [
    {
      no: 0,
      Label: 'table.react-table-user_transaction',
      name: 'transaction',
      id: 'transaction',
      tabId: 'details',
    },
    {
      no: 1,
      Label: 'table.react-table-call_records',
      name: 'callrecord',
      id: 'callrecord',
      tabId: 'comments',
    },
    {
      no: 2,
      Label: 'table.react-table-chat_history',
      name: 'chatHistory',
      id: 'chatHistory',
      tabId: 'chatHistory',
    },
    {
      no: 3,
      Label: 'table.react-table-login_records',
      name: 'loginHistory',
      id: 'loginHistory',
      tabId: 'loginHistory',
    },
  ],

  ADVISOR_INFO: [
    {
      no: 0,
      Label: 'table.react-table-advisor_info',
      name: 'AdvisorInfo',
      id: 'AdvisorInfo',
      tabId: 'AdvisorInfo',
    },
    {
      no: 1,
      Label: 'table.react-table-advisor_kyc',
      name: 'kycs',
      id: 'kycs',
      tabId: 'kyc',
    },

    {
      no: 2,
      Label: 'table.react-table-advisor_transaction',
      name: 'transaction',
      id: 'transaction',
      tabId: 'transactions',
    },
    {
      no: 3,
      Label: 'table.react-table-advisor_callhistory',
      name: 'callrecord',
      id: 'callrecord',
      tabId: 'callhistory',
    },
    {
      no: 4,
      Label: 'table.react-table-advisor_chathistory',
      name: 'chatHistory',
      id: 'chatHistory',
      tabId: 'chatHistory',
    },
    {
      no: 5,
      Label: 'table.react-table-advisor_availability',
      name: 'availability',
      id: 'availability',
      tabId: 'availability',
    },
  ],

  CORPORATE_INFO: [
    {
      no: 0,
      Label: 'table.react-table-corporate_user',
      name: 'User',
      id: 'User',
      tabId: 'User',
    },
    {
      no: 1,
      Label: 'table.react-table-corporate_info',
      name: 'CorporateInfo',
      id: 'CorporateInfo',
      tabId: 'CorporateInfo',
    },
    {
      no: 2,
      Label: 'table.react-table-corporate_account',
      name: 'CorporateAccount',
      id: 'CorporateAccount',
      tabId: 'CorporateAccount',
    },
    {
      no: 3,
      Label: 'table.react-table-corporate_Signatories',
      name: 'Signatories',
      id: 'Signatories',
      tabId: 'Signatories',
    },
    {
      no: 3,
      Label: 'table.react-table-corporate_Plan',
      name: 'Plan',
      id: 'Plan',
      tabId: 'Plan',
    },
  ],

  ADVISOR_API_TYPE: {
    lawyer: 'Lawyer',
    psychologist: 'Psychiatrist',
    sexologist: 'Sexologist',
  },
};

export const chartColor = {
  0: '#028A2F',
  1: '#E3242B',
};

export const chartColor10 = {
  0: '#028A2F1A',
  1: '#E3242B1A',
};

export const YEAR = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const CURRANT_USER = {
  user: {},
};

export const TIME_DIFFERENT = (date1, date2) => {
  const years = date1.diff(date2, 'year');
  date2.add(years, 'years');

  const months = date1.diff(date2, 'months');
  date2.add(months, 'months');

  const days = date1.diff(date2, 'days');
  date2.add(days, 'days');

  const hours = date1.diff(date2, 'hours');
  date2.add(hours, 'hours');

  const minutes = date1.diff(date2, 'minutes');
  date2.add(minutes, 'minutes');

  const seconds = date1.diff(date2, 'seconds');

  if (years > 0) {
    return `${years} Year`;
  }

  if (months > 0) {
    return `${months} Months`;
  }

  if (days > 0) {
    return `${days} Days`;
  }

  if (hours > 0) {
    return `${hours} Hours`;
  }

  if (minutes > 0) {
    return `${minutes} Minutes`;
  }

  return `${seconds} Seconds`;
};

export const getTime = (time) => {
  if (+time / (365 * 24 * 60 * 60) > 1) {
    return `${(+time / (365 * 24 * 60 * 60)).toFixed(2)} Y`;
  }
  if (+time / (7 * 24 * 60 * 60) > 1) {
    return `${(+time / (7 * 24 * 60 * 60)).toFixed(2)} W`;
  }
  if (+time / (24 * 60 * 60) > 1) {
    return `${(+time / (24 * 60 * 60)).toFixed(2)} D`;
  }
  if (+time / (60 * 60) > 1) {
    return `${(+time / (60 * 60)).toFixed(2)} H`;
  }
  if (+time / 60 > 1) {
    return `${(+time / 60).toFixed(2)} M`;
  }
  return `${(+time).toFixed(0)} s`;
};

export const getTimeInMinute = (time) => {
  return Math.ceil(+time / 60);
};

export default CONSTANTS;
