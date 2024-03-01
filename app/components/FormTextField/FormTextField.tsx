import { ChangeEvent } from "react";

// eslint-disable-next-line import/named
import { TextField, TextFieldProps } from "@mui/material";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

type FormTextFieldProps<T extends FieldValues> = Pick<
  TextFieldProps,
  "helperText" | "label"
> &
  Omit<UseControllerProps<T>, "defaultValue" | "disabled" | "shouldUnregister">;

export function FormTextField<T extends FieldValues>({
  control,
  // https://mui.com/material-ui/react-text-field/#helper-text
  helperText = " ",
  label,
  name,
  rules,
}: FormTextFieldProps<T>) {
  const {
    field: { onChange, ref, value },
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({
    control,
    name,
    rules,
  });

  function handleOnChange({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) {
    onChange(value);
  }

  return (
    <TextField
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus
      disabled={isSubmitting}
      error={!!error}
      fullWidth
      helperText={error?.message ?? helperText}
      inputRef={ref}
      label={label}
      name={name}
      onChange={handleOnChange}
      required={!!rules?.required}
      value={value}
    />
  );
}
