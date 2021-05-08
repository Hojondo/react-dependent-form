import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Chip } from "@material-ui/core";
import { Cascader } from "shineout";
import "./css/so-cascader-overrides.less";

import { useFormContext } from "./FormContext";
import { Controller } from "react-hook-form";
import { FormControl, FormHelperText } from "@material-ui/core";
import TipLabel from "./components/TipLabel";
import StyledFormLabel from "./components/StyledFormLabel";

import { RegisterType, ExcludeKeys } from "./types";

type validValue = string | boolean | number | bigint;

interface OptionDataObj {
  value: validValue;
  label: string;
  children?: OptionDataObj[];
}

type OptionDataType =
  | Array<OptionDataObj>
  | ((record: Object) => Promise<Array<OptionDataObj>>);

interface MultipleSelectProps
  extends Omit<React.HTMLProps<HTMLInputElement>, ExcludeKeys> {
  name: string;
  label: string;
  defaultValue?: validValue[];
  optionsData: OptionDataType;
  tips?: string;
  disabled?: boolean | ((record: Object, actionType?: string) => boolean);
  autoFocus?: boolean;
  registerConfig?: RegisterType;
  clearFieldsOnChange?: string[];
  dependOnFields?: string[];
}

export default function FieldMultiCascaderSelect({
  name,
  label,
  tips,
  placeholder = "Select",
  disabled,
  optionsData,
  defaultValue,
  registerConfig,
  clearFieldsOnChange,
  dependOnFields,
  ...otherProps
}: MultipleSelectProps) {
  const {
    watch,
    errors,
    clearErrors,
    setValue,
    trigger,
    control,
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

  useEffect(() => {
    // !mark: use Promise to compatible whatever the (return of)optionData of parmas is an array or promise
    Promise.resolve(
      optionsData instanceof Function ? optionsData(watch()) : optionsData
    ).then((res) => {
      setOptionsDataState(res);
    });
    return () => {};
  }, [dependOnFieldsArray, optionsData, watch()]); // todo replace watch() with more accurate array list

  // *compatible register config
  const RegisterConfigMemo = useMemo(() => {
    let configTemp = {
      ...(registerConfig instanceof Function
        ? registerConfig(watch())
        : registerConfig),
    };
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

  const flattenNestArray = (nestedArray: OptionDataObj[]) =>
    nestedArray.reduce(
      (r: OptionDataObj[], c) => [...r, c, ...(c.children ?? [])], // in case for option item without children
      []
    ); // 2 level-mode nested array
  // todo: support recursion

  const uploadNewData = (valueArray: validValue[], selected?: boolean) => {
    setValue(
      name,
      flattenNestArray(optionsDataState)
        .filter((i) => valueArray.includes(i.value))
        .map((i) => i.value)
    );
    if (clearFieldsOnChange && clearFieldsOnChange instanceof Array) {
      clearFieldsOnChange.forEach((f) => {
        setValue(f, null);
      });
    }
    trigger(name);
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue ?? []}
      rules={rules}
      render={(props) => {
        return (
          <FormControl
            component="fieldset"
            error={Boolean(errors[name])}
            style={{ width: "100%" }}
          >
            {/* @ts-ignore[1] */}
            <StyledFormLabel component="legend">{labelNode}</StyledFormLabel>
            {optionsDataState.length ? (
              <Cascader
                placeholder={placeholder}
                data={optionsDataState}
                keygen="value"
                mode={2}
                expandTrigger="hover"
                // @ts-ignore[1]
                disabled={DisabledMemo ?? false}
                clearable={false}
                value={props.value}
                onChange={uploadNewData}
                renderItem={({ label }) => label}
                renderResult={({ label }) => {
                  return (
                    <Chip
                      key={label}
                      label={label}
                      style={{ cursor: "pointer" }}
                    />
                  );
                }}
                className="so-cascader-overrides"
                absolute={true}
              />
            ) : null}
            <FormHelperText>
              <span style={{ position: "absolute" }}>
                {errors[name] ? errors[name].message : ""}
              </span>
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
}
// todo use https://rsuitejs.com/components/multi-cascader/