import { useController } from "react-hook-form";
import {
  FormFeedback,
  FormGroup,
  FormText,
  Label,
  Input as ReactstrapInput,
} from "reactstrap";

function InputUploadField({
  control,
  name,
  label,
  labelProps,
  formGroupProps,
  id,
  helpText = null,
  formTextProps,
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
      <ReactstrapInput
        id={id || name}
        invalid={invalid}
        onChange={(e) => {
          field.onChange(e.target.files[0]);
        }}
        {...rest}
        type="file"
      />
      {invalid && <FormFeedback>{error.message}</FormFeedback>}
      {helpText && <FormText {...formTextProps}>{helpText}</FormText>}
    </FormGroup>
  );
}

export default InputUploadField;
