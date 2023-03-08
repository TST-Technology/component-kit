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
      validation: "notEmpty",
      containerClassName: "text",
      errorMessage: "Please Enter Name",
    },
    {
      Label: "email",
      input: {
        id: "email",
        type: "text",
        required: false,
      },
      validation: "email",
      containerClassName: "text",
      errorMessage: "Please Enter Email",
    },
    {
      Label: "Country",
      input: {
        id: "country",
        type: "select",
        required: false,
      },
      options: [
        {
          id: 0,
          value: "1",
          label: "One",
        },
        {
          id: 1,
          value: "2",
          label: "Three",
        },
      ],
      containerClassName: "text",
      errorMessage: "Please Enter Email",
    },
    // {
    //   Label: "My Image",
    //   input: {
    //     id: "image",
    //     type: "file",
    //     required: false,
    //     multiple: true,
    //   },
    //   containerClassName: "text",
    // },
  ];
  return (
    <div className="formContainer">
      <FormView
        formInputList={CORPORATE_MODAL}
        defaultValue={{ country: "2", Name: "" }}
        onSubmit={(payload) => {
          console.log(payload);
        }}
      />
    </div>
  );
});
