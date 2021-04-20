import React, { useEffect, useMemo } from "react";
import { TextField, IconButton } from "@material-ui/core";
import { useFormContext } from "./FormContext";
import { Controller } from "react-hook-form";
import { Close as CloseIcon } from "@material-ui/icons";
import TipLabel from "./components/TipLabel";

import { RegisterType, ExcludeKeys } from "./types";

// string: `${number}${number}${number}${number}-${number}${number}-${number}${number}`
type ValueFormat = string | null;

interface DatePickerProps
  extends Omit<React.HTMLProps<HTMLInputElement>, ExcludeKeys> {
  name: string;
  label: string;
  defaultValue?: ValueFormat;
  tips?: string;
  disabled?: boolean | ((record: Object, actionType?: string) => boolean);
  autoFocus?: boolean;
  registerConfig?: RegisterType;
  clearFieldsOnChange?: string[];
  dependOnFields?: string[];
}

export default function FiledDatePicker({
  name,
  disabled,
  label,
  placeholder = "Search",
  defaultValue,
  registerConfig,
  tips,
  clearFieldsOnChange,
  dependOnFields,
  ...otherProps
}: DatePickerProps) {
  const {
    watch,
    errors,
    clearErrors,
    setValue,
    trigger,
    control,
  } = useFormContext();

  // *define Fields-value Array depend on special fields' value
  const dependOnFieldsArray = useMemo(
    () =>
      dependOnFields
        ? JSON.stringify(dependOnFields.map((f) => watch()[f]))
        : null,
    [watch()]
  );

  const uploadNewDate = (date: ValueFormat) => {
    setValue(name, date);
    trigger(name);
  };

  // *compatible disabled data-type
  const DisabledMemo = useMemo(
    () => (disabled instanceof Function ? disabled(watch()) : disabled),
    [dependOnFieldsArray]
  );
  useEffect(() => {
    if (DisabledMemo) clearErrors(name);
    return () => {};
  }, [DisabledMemo]);

  // *compatible register config
  const RegisterConfigMemo = useMemo(
    () => ({
      ...(registerConfig instanceof Function
        ? registerConfig(watch())
        : registerConfig),
    }),
    [registerConfig, watch()]
  );

  // *set Label
  const required = RegisterConfigMemo.validate?.empty;
  const labelNode = useMemo(
    () =>
      tips ? (
        <TipLabel required={Boolean(required)} label={label} tips={tips} />
      ) : (
        (required ? "* " : "") + label
      ),
    [required]
  );

  // *register config
  const rules = useMemo(() => (DisabledMemo ? {} : RegisterConfigMemo), [
    DisabledMemo,
    RegisterConfigMemo,
  ]);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue ?? ""}
      render={(props) => {
        return (
          <TextField
            fullWidth
            label={labelNode}
            placeholder={placeholder}
            type="date"
            variant="outlined"
            value={props.value ?? ""}
            error={Boolean(errors[name])}
            helperText={
              <span style={{ position: "absolute" }}>
                {errors[name] ? errors[name].message : ""}
              </span>
            }
            disabled={DisabledMemo}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              uploadNewDate(e.target.value as ValueFormat);
              if (clearFieldsOnChange && clearFieldsOnChange instanceof Array) {
                clearFieldsOnChange.forEach((f) => {
                  setValue(f, null);
                });
              }
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={(e) => {
                    uploadNewDate(null);
                  }}
                  disabled={DisabledMemo}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              ),
            }}
          />
        );
      }}
    />
  );
}
// todo use @material-picker-beta
// or https://rsuitejs.com/components/date-range-picker/
