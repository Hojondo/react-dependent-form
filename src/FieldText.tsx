import React, { useEffect, useMemo } from "react";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Controller } from "react-hook-form";

import { useFormContext } from "./FormContext";
import TipLabel from "./components/TipLabel";

import { RegisterType, ExcludeKeys } from "./types";

const StyledTexfield = withStyles({
  root: {
    "& .MuiInputLabel-root": {
      pointerEvents: "unset",
    },
  },
})(TextField);

interface InputProps
  extends Omit<React.HTMLProps<HTMLInputElement>, ExcludeKeys> {
  name: string;
  label: string;
  multiline?: boolean;
  rowsMax?: number;
  defaultValue?: string;
  tips?: string;
  disabled?: boolean | ((record: Object, actionType?: string) => boolean);
  autoFocus?: boolean;
  registerConfig?: RegisterType;
  clearFieldsOnChange?: string[];
  dependOnFields?: string[];
}

export default function LiteFieldText({
  name,
  multiline = false,
  rowsMax = 4,
  label,
  defaultValue,
  disabled = false,
  autoFocus = false,
  placeholder = "Input",
  registerConfig = {
    required: false,
  },
  tips = "",
  clearFieldsOnChange,
  dependOnFields,
  ...otherProps
}: InputProps) {
  // *custom type safety for text
  type KeyofOtherProps = keyof typeof otherProps;
  function isKeyofInputElement(prop: any): prop is KeyofOtherProps {
    return prop in HTMLInputElement.prototype;
  }

  const {
    watch,
    errors,
    setValue,
    trigger,
    control,
    clearErrors,
  } = useFormContext();

  // *compatible register config
  const RegisterConfigMemo = useMemo(
    () =>
      registerConfig instanceof Function
        ? registerConfig(watch())
        : registerConfig,
    [registerConfig, watch()]
  );
  const { required } = RegisterConfigMemo;

  // *force to change require message to 'Input cannot be empty!'
  if (required === true)
    registerConfig = { ...registerConfig, required: "Input cannot be empty!" };

  // *set Label
  let labelNode: string | JSX.Element = (required ? "* " : "") + label;
  if (tips)
    labelNode = (
      <TipLabel required={Boolean(required)} label={label} tips={tips} />
    );

  // *compatible disabled data-type
  const DisabledMemo = useMemo(
    () => (disabled instanceof Function ? disabled(watch()) : disabled),
    [watch()]
  );
  useEffect(() => {
    if (DisabledMemo) clearErrors(name);
    return () => {};
  }, [DisabledMemo]);
  const rules = useMemo(() => (DisabledMemo ? {} : registerConfig), [
    DisabledMemo,
    registerConfig,
  ]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue ? defaultValue : ""}
      render={(props) => (
        <StyledTexfield
          value={props.value ?? ""}
          multiline={multiline}
          rowsMax={rowsMax}
          fullWidth
          disabled={DisabledMemo}
          label={labelNode}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChange={(v) => {
            setValue(name, v.target.value);
            if (clearFieldsOnChange && clearFieldsOnChange instanceof Array) {
              clearFieldsOnChange.forEach((f) => {
                setValue(f, null);
              });
            }
            trigger(name);
            dependOnFields && clearErrors(dependOnFields); // *in case for situation like two fields can't be same
          }}
          error={Boolean(errors[name])}
          helperText={
            <span style={{ position: "absolute" }}>
              {errors[name] ? errors[name].message : ""}
            </span>
          }
          variant="outlined"
          inputProps={Object.keys(otherProps).reduce(
            (r, c) =>
              isKeyofInputElement(c) ? { ...r, [c]: otherProps[c] } : r,
            {}
          )}
          InputProps={{
            startAdornment: <span></span>,
          }}
        />
      )}
    />
  );
}
