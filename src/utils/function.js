import { parsePhoneNumber } from 'libphonenumber-js';
import moment from 'moment';
import { getTime } from './CONSTANTS';

function commasapratedNumber(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}

export const AnalyticscallRecordsParsers = (callls) => {
  return callls.map((callItem, index) => {
    return {
      ...callItem,
      no: index + 1,
      ...callItem?.Advisor,
      createdAt: moment(callItem?.createdAt).local().format('Do MMMM, YYYY'),
      createdTime: moment(callItem?.createdAt).local().format('h:mm:ss a'),
      V_Get: `₹${
        callItem?.callCost -
        callItem?.advisorCahrge +
        Math.round(callItem?.taxPerc / 100)
      }`,
      callDuration: callItem?.callDuration
        ? getTime(callItem?.callDuration)
        : '0 s',
      advisorCahrge: `₹${callItem?.advisorCahrge}`,
      callCost: `₹${callItem?.callCost}`,
      taxPerc: `${callItem?.taxPerc ? callItem?.taxPerc : 0}%`,
      serviceChargePerc: `${
        callItem?.serviceChargePerc ? callItem?.serviceChargePerc : 0
      }%`,
    };
  });
};

export const AnalyticsNPSRecordsParsers = (callls) => {
  return callls.map((npsItem, index) => {
    return {
      ...npsItem,
      no: index + 1,
      ...npsItem?.User,
      mobile: npsItem?.User
        ? parsePhoneNumber(
            `+${npsItem?.User?.mobile.toString()}`
          ).formatInternational()
        : '',
      createdAt: moment(npsItem?.createdAt).local().format('Do MMMM, YYYY'),
      createdTime: moment(npsItem?.createdAt).local().format('h:mm:ss a'),
    };
  });
};

export const getPrivesDate = (numofDay) => {
  return moment().subtract(numofDay, 'd').format('YYYY-MM-DD').toString();
};

export const getKey = {
  monthly: 'directory.this-year',
  weekly: 'directory.last-week',
};

export const getChatStatus = (chatData) => {
  if (chatData.advisorAcceptTime == null) {
    return 'Advisor did not accept';
  }
  if (chatData.userAcceptTime == null) {
    return 'User did not accept';
  }
  return 'Success';
};

export const createFormPayload = (Keys, data) => {
  const payload = new FormData();
  Keys.map((key) => {
    payload.append(key.name, data[key.name].value);
    return 0;
  });

  return payload;
};

export const getAdvisorAmount = (Amount, duration, tax, discount) => {
  let result = Amount * duration;

  if (tax) result -= (Amount * duration * tax) / 100;
  if (discount) result -= discount;

  return result.toFixed(2);
};

export const getProfit = (TotalCharge, advisorCharge) => {
  let result = TotalCharge;

  if (advisorCharge) result -= advisorCharge;

  return result.toFixed(2);
};

export default commasapratedNumber;
