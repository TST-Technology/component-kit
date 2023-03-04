import { useState, useCallback } from "react";
import { Services } from "../services/service";
import { notify } from "../utils/funcs";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    async (url, responseHandler, payload, successMessage) => {
      setIsLoading(true);
      try {
        let response;
        switch (url.type) {
          case "POST":
            response = await Services.post(url.endpoint, payload);
            break;

          case "PUT":
            response = await Services.put(url.endpoint, payload);

            break;
          case "DELETE":
            response = await Services.delete(url.endpoint);
            break;

          case "PATCH":
            response = await Services.patch(url.endpoint, payload);
            break;

          default:
            response = await Services.get(url.endpoint);
            break;
        }

        const data = await response.data;
        if (successMessage) {
          notify.success(successMessage);
        }
        if (responseHandler) responseHandler(data);
      } catch (err) {
        console.log(err?.response?.data?.message);
        if (err?.response?.data?.message) {
          notify.error(err?.response?.data?.message);
        } else {
          notify.error("Something Wents Wrong Please Try again");
        }
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    sendRequest,
  };
};

export default useHttp;
