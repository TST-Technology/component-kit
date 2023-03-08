import React from "react";
import { storiesOf } from "@storybook/react";

import FormView from "../components/Form/Form";
import "./style/form.css";

const stories = storiesOf("Form", module);

stories.add("formView", () => {
  const CORPORATE_MODAL = [
    {
      Label: "Name",
      input: {
        id: "name",
        type: "text",
        required: false,
      },
      containerClassName: "text",
    },
    {
      Label: "My Image",
      input: {
        id: "image",
        type: "file",
        required: false,
        multiple: true,
      },
      containerClassName: "text",
    },
  ];
  return (
    <div className="formContainer">
      <FormView formInputList={CORPORATE_MODAL} />
    </div>
  );
});
