import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

const MainRoutes = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/signin" element={<></>} />
      </Routes>
    </Fragment>
  );
};

export default MainRoutes;
