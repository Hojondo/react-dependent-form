import React, { useState, useContext, useEffect, useMemo } from "react";
import { formContext } from "./FormContext";
import { Controller } from "react-hook-form";
import { FormControl, FormHelperText } from "@material-ui/core";
import StyledFormLabel from "./components/StyledFormLabel";
import TipLabel from "./components/TipLabel";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./css/react_dates_overrides.less";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import * as moment from "moment";

import { RegisterType, ExcludeKeys } from "./types";

// type DateFormat = `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
interface TimeRangeFormat {
  startDate?: moment.Moment;
  endDate?: moment.Moment;
}
// YYYY-MM-DDTHH:mm
interface DateTimeRangePickerProps
  extends Omit<React.HTMLProps<HTMLInputElement>, ExcludeKeys> {
  name: string;
  label: string;
  defaultValue?: TimeRangeFormat;
  tips?: string;
  disabled?: boolean | ((record: Object, actionType?: string) => boolean);
  autoFocus?: boolean;
  registerConfig?: RegisterType;
  clearFieldsOnChange?: string[];
  dependOnFields?: string[];
}

interface DateRangeProps {
  timeRangeObj: TimeRangeFormat;
  name: string;
  clearFieldsOnChange?: string[];
}

function ReactDateRangePicker({
  timeRangeObj,
  name,
  clearFieldsOnChange,
}: DateRangeProps) {
  const { setValue, trigger } = useContext(formContext);
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );

  const uploadNewDate = ({
    startDate,
    endDate,
  }: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => {
    setValue(name, {
      startDate: startDate
        ? moment.utc(startDate.format("YYYY-MM-DD"))
        : startDate,
      endDate: endDate
        ? moment
            .utc(endDate.format("YYYY-MM-DD"))
            .set({ hour: 23, minute: 59, second: 59 })
        : endDate,
    });
    if (clearFieldsOnChange && clearFieldsOnChange instanceof Array) {
      clearFieldsOnChange.forEach((f) => {
        setValue(f, null);
      });
    }
    trigger(name);
  };
  return (
    <DateRangePicker
      block
      // appendToBody
      // showClearDates
      // reopenPickerOnClearDates
      hideKeyboardShortcutsPanel
      noBorder
      numberOfMonths={2}
      startDate={timeRangeObj.startDate ?? null}
      startDateId={`${name}_start_date_id`}
      endDate={timeRangeObj.endDate ?? null}
      endDateId={`${name}_end_date_id`}
      onDatesChange={uploadNewDate}
      focusedInput={focusedInput}
      onFocusChange={(focusedInput: FocusedInputShape | null) =>
        setFocusedInput(focusedInput)
      }
      isOutsideRange={() => false}
      minimumNights={0}
    />
  );
}

export default function FieldDateRangePicker({
  name,
  disabled,
  label,
  defaultValue,
  registerConfig,
  tips,
  clearFieldsOnChange,
  dependOnFields,
  ...otherProps
}: DateTimeRangePickerProps) {
  const { watch, errors, clearErrors, setValue, trigger, control } = useContext(
    formContext
  );

  // *define Fields-value Array depend on special fields' value
  const dependOnFieldsArray = useMemo(
    () => (dependOnFields ? dependOnFields.map((f) => watch()[f]) : undefined),
    [watch()]
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
      defaultValue={defaultValue ?? {}}
      rules={rules}
      render={(props) => (
        <FormControl
          component="fieldset"
          error={Boolean(errors[name])}
          fullWidth
          disabled={DisabledMemo}
          style={{
            border: "1px solid rgba(0, 0, 0, 0.23)",
            boxSizing: "border-box",
            borderRadius: "4px",
            padding: "0 8px",
          }}
          // {...otherProps}
        >
          {/* @ts-ignore[1] */}
          <StyledFormLabel component="legend">{labelNode}</StyledFormLabel>
          <ReactDateRangePicker
            timeRangeObj={props.value}
            name={name}
            clearFieldsOnChange={clearFieldsOnChange}
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
// todo use @material-picker-beta
// or https://rsuitejs.com/components/date-range-picker/
