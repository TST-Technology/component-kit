import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import CONSTANTS from 'utils/CONSTANTS';
import Services from './service';

const apiCall = async (
  endPoint,
  type,
  payload = {},       
  errorMessage = { heading: '', message: '' }
) => {
  try {
    switch (type) {
      case 'post':
        return await Services.post(endPoint, payload);
      case 'delete':     
        return await Services.delete(endPoint);
      case 'patch':
        return await Services.patch(endPoint, payload);
      default:
        return await Services.get(endPoint);
    }
  } catch (error) {
    console.log(error);

    NotificationManager.warning(
      errorMessage.message !== ''
        ? errorMessage.message
        : 'Enter valid email id and password',
      errorMessage.heading !== '' ? errorMessage.heading : 'Login Error',
      3000,
      null,
      null,
      ''
    );
    return -1;
  }
};

// *********************** Dashboard ****************************

export const getAllCallsDetails = () => apiCall('/admins/calls', 'get');
export const getAllNPSsDetails = () => apiCall('/admins/promotors', 'get');

// *********************** Login ****************************
export const adminLogin = (payload) =>
  apiCall('/admins/login', 'post', payload);

export const getCurrentAdmin = () => apiCall('/admins/profile', 'get');

export const getAdmin = () => apiCall('/admins', 'get');

export const getUsers = () => apiCall('/admins/users', 'get');

export const getCategory = () => apiCall('/data/expertise', 'get');
export const addCategory = (payload) =>
  apiCall('/data/expertise', 'post', payload);
export const updateCategory = (id, payload) =>
  apiCall(`/data/expertise/${id}`, 'patch', payload);

export const getKycRequest = () => apiCall(`/kycs/admins`, 'get');

export const getSpecializations = (currentAdvisor) =>
  apiCall(`/data/specializations?expertise=${currentAdvisor}`, 'get');

export const addSpecializations = (payload) =>
  apiCall('/data/Specializations', 'post', payload);

export const deleteSpecializations = (id) =>
  apiCall(`/data/specializations/${id}`, 'delete');

export const getReport = () => apiCall('/admins/reports', 'get');

// *********************** User ****************************
export const getAllAdvisors = (category) =>
  apiCall(`/admins/advisors/?expertise=${category}`, 'get');

export const getUserAllDetails = async (userId) => {
  const endpoints = [
    `${CONSTANTS.BASE_URL}/admins/transactions/users?UserId=${userId}`,
    `${CONSTANTS.BASE_URL}/admins/users?UserId=${userId}`,
    `${CONSTANTS.BASE_URL}/admins/calls?userId=${userId}`,
    `${CONSTANTS.BASE_URL}/admins/history/login/users/${userId}`,
    `${CONSTANTS.BASE_URL}/chats/admins/records?UserId=${userId}`,
  ];

  try {
    return await axios
      .all(endpoints.map((endpoint) => Services.get(endpoint)))
      .then((data) => data);
  } catch (error) {
    return -1;
  }
};

export const updateUserAction = (id) =>
  apiCall(`/admins/users/${id}/block`, 'patch');

export const Transaction = (payload) =>
  apiCall('/tournamentUserStock', 'post', payload);

// *********************** Advisor ****************************
export const addAdvisor = (payload) =>
  apiCall('/advisors/singup', 'post', payload);

export const addNewAdvisor = (payload) =>
  apiCall('/admins/add/advisors', 'post', payload);

export const addKYC = (payload) => apiCall('/admins/add/kycs', 'post', payload);

export const getAdvisorAllDetails = async (advisorId) => {
  const endpoints = [
    `${CONSTANTS.BASE_URL}/admins/advisors/${advisorId}`,
    `${CONSTANTS.BASE_URL}/admins/transactions/advisors?advisorId=${advisorId}`,
    `${CONSTANTS.BASE_URL}/admins/calls?advisorId=${advisorId}`,
    `${CONSTANTS.BASE_URL}/chats/admins/records?AdvisorId=${advisorId}`,
    `${CONSTANTS.BASE_URL}/data/languages`,
  ];

  try {
    return await axios
      .all(endpoints.map((endpoint) => Services.get(endpoint)))
      .then((data) => data);
  } catch (error) {
    return -1;
  }
};

export const updateAdvisorAction = (id) =>
  apiCall(`/admins/advisors/${id}/block`, 'patch');

export const getAdvisorById = (id) => apiCall(`/admins/advisors/${id}`, 'get');

export const updateSpecialization = (payload) =>
  apiCall('/data/specializations', 'patch', payload);

export const addAdmin = (payload) => apiCall('/admins/', 'post', payload);

export const deleteAdmin = (id) => apiCall(`/admins/${id}`, 'delete');

export const addAvailability = (payload) =>
  apiCall('/availibilities/advisors', 'post', payload);

export const updateAdvisorDetails = (payload, ID) =>
  apiCall(`/admins/edit/advisors/${ID}`, 'patch', payload);

export const updateAdvisorPic = (payload, ID) =>
  apiCall(`/admins/edit/advisors/pic/${ID}`, 'patch', payload);

export const updateKYCAdvisorDetails = (payload, ID) =>
  apiCall(`/admins/kycs/advisors/${ID}`, 'patch', payload);

export const deleteKYCAdvisorVideo = (ID) =>
  apiCall(`/kycs/video/advisor/id/${ID}`, 'delete');

export const approveRejectKyc = (id, payload) =>
  apiCall(`/kycs/${id}/admins`, 'patch', payload);

export const getTaxCharges = (currentAdvisorTax) =>
  apiCall(`/admins/charges/${currentAdvisorTax}`, 'get');

export const GetCoustomFields = () => apiCall(`/custom/fields`, 'get');

export const getImages = (ImageUrl) =>
  fetch(`https://api.allorigins.win/raw?url=${ImageUrl}`);

export const setTaxCharges = (taxId, payload) =>
  apiCall(`/admins/charges/${taxId}`, 'patch', payload);

export const setCustomizeFieldCharges = (payload) =>
  apiCall(`/custom/fields`, 'patch', payload);

export const getAdvisorTransaction = () =>
  apiCall('/admins/transactions/advisors', 'get');

export const deleteAvailability = (id) =>
  apiCall(`/availibilities/advisors/${id}`, 'delete');

export const getAllUsers = async () => {
  try {
    const data = await Services.get('/users');
    return data;
  } catch (error) {
    console.log(error, 'error');
    return 0;
  }
};

// ************* Coupon **********************
export const getCoupon = () => apiCall(`/coupons`, 'get');
export const deleteCoupon = (couponId) =>
  apiCall(`/coupons/${couponId}`, 'delete');

export const addCoupon = (body) => apiCall(`/coupons`, 'post', body);
export const getCouponDetails = (Id) =>
  apiCall(`/coupons/subscibed/users/${Id}`, 'get');

// ************* B2B Plans **********************
export const addPlan = (body) => apiCall(`/B2B-plans`, 'post', body);

export const getPlans = () => apiCall('/B2B-plans', 'get');

export const deletePlans = (id) => apiCall(`/B2B-plans/id/${id}`, 'delete');

// ************* poster **********************
export const getPoster = () => apiCall(`/posters`, 'get');
export const addPoster = (body) => apiCall(`/posters`, 'post', body);
export const deletePoster = (posterId) =>
  apiCall(`/posters/${posterId}`, 'delete', {
    heading: 'Poster Delete Error',
    message: 'Something went wrong, Please try again',
  });

// *********************** Analytics ****************************

// export const getAnalytics = (date) => apiCall(`/admins/analytics/dates?startDate=${date.startDate}&endDate=${date.endDate}`, 'get');

export const getAnalytics = async (perams) => {
  const endpoints = [
    `${CONSTANTS.BASE_URL}/admins/analytics/dates${perams}`,
    `${CONSTANTS.BASE_URL}/admins/analytics/dates/shares${perams}`,
  ];

  try {
    return await axios
      .all(endpoints.map((endpoint) => Services.get(endpoint)))
      .then((data) => data);
  } catch (error) {
    return -1;
  }
};

// *********************** Text-Charge ****************************
export const userCategoryImg = () => apiCall(`/users/category/imgs`, 'get');

export const updateTextandCharges = (id, body) => {
  return apiCall(`/admins/charges/${id}`, 'patch', body);
};

// *********************** Call Session ****************************

export const getCallSession = (AdvisorType) =>
  apiCall(`/call-sessions?expertise=${AdvisorType}`, 'get');

export const addCallSession = (body) => apiCall(`/call-sessions`, 'post', body);

export const deleteCallSession = (id) =>
  apiCall(`/call-sessions/${id}`, 'delete');

// *********************** Advisors ****************************

export const getAdvisors = () =>
  apiCall(`/admins/advisors/?expertise=Lawyer`, 'get');

// *********************** Dashboard ****************************

export const getDashboardAnalytics = () => apiCall(`/admins/analytics`);

// *********************** Chat ****************************
export const getChatViewDetails = (Id) =>
  apiCall(`chats/history/chat/records/${Id}`, 'get');

export default adminLogin;

// *********************** Corporate(Organization) ****************************
export const addCorporate = (payload) =>
  apiCall(`/admins/organizations`, 'post', payload);

export const updateCorporate = (payload, id) =>
  apiCall(`/admins/organizations/${id}`, 'patch', payload);

export const removeCorporateUser = (id) =>
  apiCall(`/admins/organizations/users/${id}`, 'delete');

export const addUserCorporate = (payload) =>
  apiCall(`/admins/organizations/users`, 'post', payload, {
    heading: 'User not Added',
    message: `User with ${payload.mobile} number is already associated different Organisation`,
  });

export const addSignatories = (payload) =>
  apiCall(`/signatories/`, 'post', payload);

export const addNewPlan = (query) =>
  apiCall(`/organizations/subscribe/B2B/plans/${query}`, 'post');

export const removeSignatories = (id) =>
  apiCall(`/signatories/id/${id}`, 'delete');

export const getCorporate = async () => {
  const endpoints = [
    `${CONSTANTS.BASE_URL}/organizations`,
    `${CONSTANTS.BASE_URL}/B2B-plans`,
  ];

  try {
    return await axios
      .all(endpoints.map((endpoint) => Services.get(endpoint)))
      .then((data) => data);
  } catch (error) {
    return -1;
  }
};

export const getCorporateAllDetails = async (corporateId) => {
  const endpoints = [
    `${CONSTANTS.BASE_URL}/organizations/id/${corporateId}`,
    `${CONSTANTS.BASE_URL}/admins/users/organizations/${corporateId}`,
    `${CONSTANTS.BASE_URL}/signatories/organizations/${corporateId}`,
    `${CONSTANTS.BASE_URL}/organizations/plans/history/organizations/${corporateId}`,
    `${CONSTANTS.BASE_URL}/B2B-plans`,
  ];

  try {
    return await axios
      .all(endpoints.map((endpoint) => Services.get(endpoint)))
      .then((data) => data);
  } catch (error) {
    return -1;
  }
};

export const updateCorporateAction = (id) =>
  apiCall(`/admins/organizations/block/unblock/${id}`, 'patch');

export const getNoKycList = () => apiCall(`/advisors/no/kyc`, 'get');
