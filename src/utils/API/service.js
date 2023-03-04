import axios from 'axios';
import CONSTANTS from 'utils/CONSTANTS';
import authStorage from './authStroge';

const Services = axios.create({
  baseURL: CONSTANTS.BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${authStorage.getAuthToken()}`,
  },
});

export default Services;
