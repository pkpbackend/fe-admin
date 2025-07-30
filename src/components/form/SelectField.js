import { FormGroup, Label, FormFeedback, FormText } from "reactstrap";
import { useController } from "react-hook-form";
import classnames from "classnames";
import Select from "react-select";

function SelectField({
  control,
  name,
  label,
  labelProps,
  formGroupProps,
  id,
  helpText = null,
  formTextProps,
  className,
  disabled,
  options,
  labelInValue = false,
  isMulti = false,
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
      <Select
        inputId={id || name}
        className={classnames(
          "react-select",
          {
            "is-invalid": invalid,
          },
          className
        )}
        menuPortalTarget={document.body}
        classNamePrefix="select"
        isMulti={isMulti}
        onChange={(val) => {
          if (labelInValue || isMulti) {
            field.onChange(val);
          } else {
            field.onChange(val?.value);
          }
        }}
        isDisabled={disabled}
        options={options}
        value={
          labelInValue || isMulti
            ? field.value
            : options.find((c) => c.value === field.value) || ""
        }
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        {...rest}
      />
      {invalid && <FormFeedback>{error.message}</FormFeedback>}
      {helpText && <FormText {...formTextProps}>{helpText}</FormText>}
    </FormGroup>
  );
}

export default SelectField;
