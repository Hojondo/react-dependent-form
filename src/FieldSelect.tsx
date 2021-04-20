import React, { useEffect, useState, useMemo, useCallback } from "react";
import _ from "lodash";
import { TextField, MenuItem } from "@material-ui/core";
import { Controller } from "react-hook-form";

import { useFormContext } from "./FormContext";
import TipLabel from "./components/TipLabel";
import {
  OptionDataObj,
  OptionDataType,
  RegisterType,
  ExcludeKeys,
} from "./types";

type ValueFormat = string | number | boolean | readonly string[] | undefined;

interface SelectProps
  extends Omit<React.HTMLProps<HTMLSelectElement>, ExcludeKeys> {
  name: string;
  label: string;
  optionsData: OptionDataType;
  defaultValue?: ValueFormat;
  tips?: string;
  disabled?: boolean | ((record: Object, actionType?: string) => boolean);
  autoFocus?: boolean;
  registerConfig?: RegisterType;
  clearFieldsOnChange?: string[];
  dependOnFields?: string[];
}

const CreateCompatibleValueFC = (optionsObj: Array<OptionDataObj>) => (
  val: string | OptionDataObj | boolean
) => {
  return typeof val === "string" || typeof val === "boolean"
    ? val
    : val && optionsObj.find((o) => o.value === val.value)?.value;
};

export default function QueryFieldSelect({
  name,
  label,
  placeholder = "Select",
  tips,
  optionsData = [],
  defaultValue,
  disabled,
  autoFocus = false,
  registerConfig,
  clearFieldsOnChange,
  dependOnFields,
  ...otherProps
}: SelectProps) {
  // *custom type safety for select
  type KeyofOtherProps = keyof typeof otherProps;
  function isKeyofInputElement(prop: any): prop is KeyofOtherProps {
    return prop in HTMLSelectElement.prototype;
  }
  const {
    errors,
    trigger,
    setValue,
    control,
    watch,
    clearErrors,
  } = useFormContext();

  // *get options data depend on special fields' value
  const dependOnFieldsArray = useMemo(
    () =>
      dependOnFields
        ? JSON.stringify(dependOnFields.map((f) => watch()[f]))
        : null,
    [watch()]
  );

  // todo fix the warning in devtool when get async option after component-rendered
  const [optionsDataState, setOptionsDataState] = useState<
    Array<OptionDataObj>
  >([]);
  const compatibleValueFn = useCallback(
    CreateCompatibleValueFC(optionsDataState),
    [optionsDataState]
  );
  useEffect(() => {
    // !mark: use Promise to compatible whatever the (return of)optionData of parmas is an array or promise
    Promise.resolve(
      optionsData instanceof Function ? optionsData(watch()) : optionsData
    ).then((res) => {
      setOptionsDataState(res ?? []);
    });
    return () => {};
  }, [dependOnFieldsArray, optionsData, watch()]);

  // *compatible register config
  const RegisterConfigMemo = useMemo(() => {
    let configTemp = {
      ...(registerConfig instanceof Function
        ? registerConfig(watch())
        : registerConfig),
    };
    if (configTemp.required) {
      configTemp.required = false; // !mark: cause react-hook-form can't support value (boolean-false) validation, need to suppress native mandatory
      configTemp.validate = {
        ...configTemp.validate,
        empty: (data) =>
          optionsDataState?.some((o) =>
            _.isEqual(compatibleValueFn(data), o.value)
          ) || "Select cannot be empty!", // *force to change require message to unified format
      };
    }
    return configTemp;
  }, [registerConfig, watch(), optionsDataState]);

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
      defaultValue={defaultValue ?? ""}
      control={control}
      name={name}
      rules={rules}
      render={(props) => {
        return (
          <TextField
            value={compatibleValueFn(props.value) ?? ""}
            fullWidth
            select
            name={name}
            disabled={DisabledMemo}
            label={labelNode}
            autoFocus={autoFocus}
            variant="outlined"
            onChange={(e) => {
              setValue(name, e.target.value);
              if (clearFieldsOnChange && clearFieldsOnChange instanceof Array) {
                clearFieldsOnChange.forEach((f) => {
                  setValue(f, null);
                });
              }
              trigger(name);
            }}
            error={Boolean(errors[name])}
            helperText={
              <span style={{ position: "absolute" }}>
                {errors[name] ? errors[name].message : ""}
              </span>
            }
            InputLabelProps={{ shrink: true }} //!mark: aim to show a placeholder like text-input
            SelectProps={{
              displayEmpty: true,
              renderValue: (value) => {
                if (optionsDataState.map((o) => o.value).includes(value as any))
                  return optionsDataState.find((o) => o.value === value)?.label;
                else
                  return (
                    <span style={{ color: "rgba(0, 0, 0, 0.42)" }}>
                      {placeholder}
                    </span>
                  ); //!mark: aim to show a placeholder like text-input
              },
            }}
            inputProps={Object.keys(otherProps).reduce(
              (r, c) =>
                isKeyofInputElement(c) ? { ...r, [c]: otherProps[c] } : r,
              {}
            )}
          >
            {_.sortBy(optionsDataState, (o) => o.label).map((o) => (
              <MenuItem
                key={String(o.value)}
                // @ts-ignore [1]
                value={o.value}
                disabled={o.disabled}
              >
                {o.label}
              </MenuItem>
            ))}
          </TextField>
        );
      }}
    />
  );
}
