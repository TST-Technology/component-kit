import React from "react";
import { Form, Input, Label } from "reactstrap";

const FormView = ({
  formInputList,
  onSubmit,
  defaultValue,
  isFormPayload,
  targetForm,
}) => {
  const getInputFormate = (data) => {
    switch (data.input.type) {
      default:
        return (
          <>
            {data.Label && <Label>{data.Label}</Label>}
            <Input
              {...data.input}
              defaultValue={
                data.input.type !== "file" && defaultValue[data.input.name]
                  ? defaultValue[data.input.name]
                  : ""
              }
            />
          </>
        );
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

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
  };
  return (
    <Form onSubmit={onSubmitHandler}>
      {formInputList.map((data) => (
        <div key={data.input.id} className={data.containerClassName}>
          {getInputFormate(data)}
        </div>
      ))}

      <Input type="submit" />
    </Form>
  );
};

FormView.defaultProps = {
  isLabelVisible: true,
  formInputList: [],
  onSubmit: (payload) => {
    console.log(payload);
  },
  defaultValue: {},
  isFormPayload: false,
  targetForm: false,
};

export default FormView;
