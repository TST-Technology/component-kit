<p align="center">
  <a href="https://getbootstrap.com/">
    <img src="https://tsttechnology.in/assets/img/logo.png" alt="TST logo" width="200" height="165">
  </a>
</p>

<h3 align="center">TST Frontend ToolKit</h3>

<p align="center">
  Front-end library for faster and easier web development.
</p>

## Table of contents

- [Requirements](#Requirements)
- [Installation](#Installation)
- [How to use Form](#How-to-use-Form)

## Requirements

First, install the library below:

- Reactstrap: `yarn add reactstrap` or `npm i reactstrap`

## Installation

```bash
npm i tst-toolkit
```

or

```bash
yarn add tst-toolkit
```

## How to use Form

- [Example Code](#Example-Code)
- [Props](#Form-Props)
- [Example of default value props](#Example-of-default-value-props)
- [FormInputList props](#FormInputList-props)

## Example Code

```javascript
import * as React from "react";
import { FormView } from "tst-toolkit";

const FormComponent = () => {
  const ArrayOfInputFields = [
    {
      Label: "Name",
      input: {
        id: "name",
        type: "text",
        required: false,
      },
      validation: (value) => value !== "",
      containerClassName: "text",
      errorMessage: "Please Enter First Name",
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
      options:[
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
        ]
      containerClassName: "text",
    }
  ];
  return (
    <FormView
      formInputList={CORPORATE_MODAL}
      onSubmit={(payload) => {
        console.log(payload);
      }}
    />
  );
};
```

## Form Props

| Prop            | Type              | Default value | Description                                                                                                                                                                         |
| --------------- | ----------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `formInputList` | `Array of Object` | `[]`          | using formInputList we can add and remove input fields in from                                                                                                                      |
| `onSubmit`      | `Function`        | `(value)=>{}` | onSubmit function returns the value of form when form is submitted                                                                                                                  |
| `defaultValue`  | `object`          | `{}`          | using defaultValue we can preset value of input field. to prefill data use keyID is fieldID as a key and value as per you need and add this key value pair into defaultValue object |
| `isFormPayload` | `boolean`         | `false`       | if value is true will get response in fromData formate in onSubmit function's value parameter                                                                                       |
| `targetForm`    | `boolean`         | `false`       | if value is true will get response in event in onSubmit function's value parameter                                                                                                  |

## Example of default value props

```javascript
import * as React from "react";
import { FormView } from "tst-toolkit";

const FormComponent = () => {
  const ArrayOfInputFields = [
    {
      Label: "Name",
      input: {
        id: "name",
        type: "text",
        required: false,
      },
      validation: (value) => value !== "",
      containerClassName: "text",
      errorMessage: "Please Enter First Name",
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
      options:[
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
        ]
      containerClassName: "text",
    }
  ];
  return (
    <FormView
      formInputList={CORPORATE_MODAL}
      defaultValue={{ country: "2", name: "Daxesh Italiya" }}
      onSubmit={(payload) => {
        console.log(payload);
      }}
    />
  );
};
```

## FormInputList props

using FormInputList props we can customize below properties :

- Input container style : using `containerClassName`
- Input style : using `className` in `input` object
- Error Message : using `errorMessage`
- All input properties : using `input` object we can apply all properties of input like id, name, required etc.
- Input validation : suing `validation` method for notEmpty validation use `validation='notEmpty'` for notEmpty validation use `validation='email'` else rou can pass validation function which return boolean value like

```javascript
  {
    ...
    validation: (value) => value !== "",
    ...
  }

```
