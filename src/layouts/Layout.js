import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import MainRoutes from "./MainRoutes";
import Body from "../components/general/Body";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <Fragment>
      <ToastContainer />
      <Body>
        <MainRoutes />
      </Body>
    </Fragment>
  );
};

export default React.memo(Layout);
