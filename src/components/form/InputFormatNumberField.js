import Cleave from "cleave.js/react";
import { useController } from "react-hook-form";
import {
  FormFeedback,
  FormGroup,
  FormText,
  Label,
  InputGroup,
} from "reactstrap";
import classnames from "classnames";
import classNames from "classnames";

function InputFormatNumberField({
  control,
  name,
  label,
  labelProps,
  formGroupProps,
  id,
  helpText = null,
  formTextProps,
  options = {
    numeral: true,
    numeralThousandsGroupStyle: "thousand",
  },
  inputGroup = false,
  after = null,
  before = null,
  ...rest
}) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  const InputComponent = (
    <Cleave
      id="jumlahUnit"
      className={classnames("form-control", {
        "is-invalid": invalid,
      })}
      options={options}
      value={field.value}
      onChange={(e) => {
        field.onChange(e.target.rawValue);
      }}
      {...rest}
    />
  );

  return (
    <FormGroup {...formGroupProps}>
      {label && (
        <Label for={id || name} {...labelProps}>
          {label}
        </Label>
      )}
      {inputGroup ? (
        <InputGroup
          className={classNames({
            "is-invalid": invalid,
          })}
        >
          {before}
          {InputComponent}
          {after}
        </InputGroup>
      ) : (
        InputComponent
      )}
      {invalid && <FormFeedback>{error.message}</FormFeedback>}
      {helpText && <FormText {...formTextProps}>{helpText}</FormText>}
    </FormGroup>
  );
}

export default InputFormatNumberField;
