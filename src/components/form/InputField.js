import classNames from "classnames";
import { useController } from "react-hook-form";
import {
  FormFeedback,
  FormGroup,
  FormText,
  InputGroup,
  Label,
  Input as ReactstrapInput,
} from "reactstrap";

function InputField({
  control,
  name,
  label,
  labelProps,
  formGroupProps,
  id,
  helpText = null,
  formTextProps,
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
    <ReactstrapInput id={id || name} invalid={invalid} {...field} {...rest} />
  );

  return (
    <FormGroup {...formGroupProps}>
      {label && (
        <Label for={id || name} {...labelProps}>
          {label}
        </Label>
      )}
      {inputGroup ? (
        <>
          <InputGroup
            className={classNames({
              "is-invalid": invalid,
            })}
          >
            {before}
            {InputComponent}
            {after}
          </InputGroup>
        </>
      ) : (
        InputComponent
      )}
      {invalid && <FormFeedback>{error.message}</FormFeedback>}
      {helpText && <FormText {...formTextProps}>{helpText}</FormText>}
    </FormGroup>
  );
}

export default InputField;
