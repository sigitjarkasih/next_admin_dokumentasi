import { ErrorMessage, Field } from "formik";
import React from "react";

function Textarea(props) {
  const { label, name, width, rows, cols, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field as="textarea" id={name} name={name} {...rest} rows={rows} cols={cols} />
      {/* <ErrorMessage name={name} component={TextError} /> */}
    </div>
  );
}

export default Textarea;
