import { FormGroup, Label, FormFeedback, FormText } from "reactstrap";
import { useController } from "react-hook-form";
import classnames from "classnames";
import Flatpickr from "react-flatpickr";

import "@styles/react/libs/flatpickr/flatpickr.scss";

function DatepickerField({
  control,
  name,
  label,
  labelProps,
  formGroupProps,
  id,
  helpText = null,
  formTextProps,
  disabled,
  options = {
    dateFormat: "d-m-Y",
  },
  ...rest
}) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <FormGroup {...formGroupProps}>
      {label && (
        <Label for={id || name} {...labelProps}>
          {label}
        </Label>
      )}
      <Flatpickr
        id={id || name}
        {...field}
        className={classnames("form-control", {
          "is-invalid": invalid,
        })}
        options={options}
        onChange={(date) => {
          field.onChange(date[0]);
        }}
        {...rest}
      />
      {invalid && <FormFeedback>{error.message}</FormFeedback>}
      {helpText && <FormText {...formTextProps}>{helpText}</FormText>}
    </FormGroup>
  );
}

export default DatepickerField;
