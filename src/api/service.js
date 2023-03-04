import axios from "axios";

export const Services = axios.create({
  baseURL: "https://api.fitbit.com",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic MjM4UlJXOjc1NmI4ZWRhMjA4MTY5NjAxNzYyZWI4MWRkNzA5YTNh",
  },
});
