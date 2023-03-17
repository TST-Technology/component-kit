import React, { useState } from "react";
import { Form, Input, Label } from "reactstrap";

const inputListSample = [
  {
    Label: "Name",
    input: {
      id: "name",
      type: "text",
      required: false,
    },
    validation: "notEmpty",
    containerClassName: "text",
    errorMessage: "Please Enter Email",
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

const Validation = {
  notEmpty: (value) => value !== "",
  email: (value) => value !== "" && value.includes("@") && value.includes("."),
};

const FormView = ({
  formInputList,
  onSubmit,
  defaultValue,
  isFormPayload,
  targetForm,
  options,
}) => {
  const [isValid, setIsValid] = useState({});
  const getInputFormate = (data, validation) => {
    switch (data.input.type) {
      case "select":
        return (
          <>
            {data.Label && <Label>{data.Label}</Label>}
            <Input
              {...data.input}
              className={isValid[data.input.id] ? "error" : ""}
              defaultValue={
                defaultValue[data.input.id] ? defaultValue[data.input.id] : ""
              }
            >
              {data.options
                ? data.options.length > 0 &&
                  data.options.map((item) => (
                    <option key={`role_${item.id}`} value={item.value}>
                      {item.label}
                    </option>
                  ))
                : options[data.input.id] &&
                  options[data.input.id].length > 0 &&
                  options[data.input.id].map((item) => (
                    <option key={`role_${item.id}`} value={item.value}>
                      {item.label}
                    </option>
                  ))}
            </Input>
          </>
        );

      default:
        return (
          <>
            {data.Label && <Label>{data.Label}</Label>}
            <Input
              {...data.input}
              className={isValid[data.input.id] ? "error" : ""}
              defaultValue={
                data.input.type !== "file" && defaultValue[data.input.id]
                  ? defaultValue[data.input.id]
                  : ""
              }
              onChange={(e) => {
                if (validation) {
                  setIsValid((previous) => {
                    return {
                      ...previous,
                      [data.input.id]: !validation(e.target.value),
                    };
                  });
                }
              }}
            />
            {isValid[data.input.id] && data?.errorMessage && (
              <p className="ErrorMessage">{data?.errorMessage}</p>
            )}
          </>
        );
    }
  };

  const checkIsValid = (validation, value) => {
    return Validation[validation]
      ? !Validation[validation](value)
      : !validation(value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Validation
    const isValidForm = formInputList
      .filter((data) => data?.validation && data?.input?.type !== "file")
      .map((data) => {
        setIsValid((previous) => {
          return {
            ...previous,
            [data.input.id]: checkIsValid(
              data?.validation,
              e.target[data.input.id].value
            ),
          };
        });
        return checkIsValid(data?.validation, e.target[data.input.id].value);
      });
    console.log(isValidForm);
    if (!isValidForm.includes(true)) {
      // if Need Data without any operation
      if (targetForm) {
        onSubmit(e.target);
        return;
      }
      const isFileInput = formInputList.filter(
        (input) => input?.input?.type == "file"
      );

      // if Json Data needed
      if (isFileInput.length > 0) {
        isFormPayload = true;
      }

      const payload = isFormPayload ? new FormData() : {};

      formInputList.map((data) => {
        switch (data.input.type) {
          case "file":
            Object.values(e.target[data.input.id].files).map((uploadFile) => {
              payload.append(data.input.id, uploadFile);
            });
            break;
          default:
            isFormPayload
              ? payload.append(data.input.id, e.target[data.input.id].value)
              : (payload[data.input.id] = e.target[data.input.id].value);
        }
      });
      onSubmit(payload);
      return;
    }
  };
  return (
    <Form onSubmit={onSubmitHandler}>
      {formInputList.map((data) => (
        <div key={data.input.id} className={data.containerClassName}>
          {getInputFormate(
            data,
            data?.validation
              ? Validation[data?.validation]
                ? Validation[data?.validation]
                : data?.validation
              : null
          )}
        </div>
      ))}
      <Input type="submit" />
    </Form>
  );
};

FormView.defaultProps = {
  formInputList: inputListSample, // list of input Fields
  onSubmit: () => {}, // on Submit event
  defaultValue: {}, // set key=ID and value=prefilled value
  isFormPayload: false, // set true if you want to get form data on submit
  targetForm: false, //  set true if you want to get e.target on submit
  options: {
    country: [
      {
        id: 0,
        value: "1",
        label: "One",
      },
      {
        id: 1,
        value: "2",
        label: "two",
      },
    ],
  },
};

export default FormView;
