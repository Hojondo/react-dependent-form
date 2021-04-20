import React, { ReactNode, useEffect, useMemo } from "react";
import {
  Grid,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  Checkbox,
} from "@material-ui/core";
import { Controller } from "react-hook-form";
import { useFormContext } from "./FormContext";
import { RegisterType, ExcludeKeys } from "./types";

type ValueFormat = boolean;
interface CheckboxProps
  extends Omit<React.HTMLProps<HTMLInputElement>, ExcludeKeys> {
  name: string;
  label: string;
  defaultValue?: ValueFormat;
  disabled?: boolean | ((record: Object, actionType?: string) => boolean);
  autoFocus?: boolean;
  registerConfig?: RegisterType;
  clearFieldsOnChange?: string[];
  dependOnFields?: string[];
}

export default function FieldCheckbox({
  name,
  label,
  defaultValue,
  disabled = false,
  autoFocus = false,
  registerConfig,
  clearFieldsOnChange,
  dependOnFields,
  ...otherProps
}: CheckboxProps) {
  // *custom type safety for select
  type KeyofOtherProps = keyof typeof otherProps;
  function isKeyofInputElement(prop: any): prop is KeyofOtherProps {
    return prop in HTMLInputElement.prototype;
  }
  const { watch, errors, setValue, control, clearErrors } = useFormContext();
  // *get options data depend on special fields' value
  const dependOnFieldsArray = useMemo(
    () =>
      dependOnFields
        ? JSON.stringify(dependOnFields.map((f) => watch()[f]))
        : null,
    [watch()]
  );

  // *compatible register config
  const RegisterConfigMemo = useMemo(
    () =>
      registerConfig instanceof Function
        ? registerConfig(watch())
        : registerConfig,
    [registerConfig, watch()]
  );

  // *compatible disabled data-type
  const DisabledMemo = useMemo(
    () => (disabled instanceof Function ? disabled(watch()) : disabled),
    [dependOnFieldsArray]
  );
  useEffect(() => {
    if (DisabledMemo) clearErrors(name);
    return () => {};
  }, [DisabledMemo]);

  // *register config
  const rules = useMemo(() => (DisabledMemo ? {} : RegisterConfigMemo), [
    DisabledMemo,
    RegisterConfigMemo,
  ]);
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue ?? false}
      render={(props) => (
        <FormControl
          component="fieldset"
          error={Boolean(errors[name])}
          //   style={{ width: "100%" }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={props.value ? true : false}
                onChange={(event) => {
                  setValue(name, event.target.checked);
                }}
                color="primary"
                autoFocus={autoFocus}
                // size="small"
              />
            }
            label={label}
            disabled={DisabledMemo}
            {...Object.keys(otherProps).reduce(
              (r, c) =>
                isKeyofInputElement(c) ? { ...r, [c]: otherProps[c] } : r,
              {}
            )}
          />
          <FormHelperText>
            <span style={{ position: "absolute" }}>
              {errors[name] ? errors[name].message : ""}
            </span>
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
