import React, { useMemo, useEffect } from 'react';
import moment, { MomentBuiltinFormat } from 'moment';
import { Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import { useFormContext } from './FormContext';
import TipLabel from './components/TipLabel';

import { RegisterType, ExcludeKeys } from './types';

// const isISO = (input: any): input is ISOTimeFormat =>
//   moment(input, moment.ISO_8601, true).isValid()

type ISOTimeFormat = string | null; // todo, hard to limit the value only allow ISO-format
// YYYY-MM-DDTHH:mm
interface DateTimePickerProps
  extends Omit<React.HTMLProps<HTMLInputElement>, ExcludeKeys> {
  name: string;
  label: string;
  defaultValue?: ISOTimeFormat;
  tips?: string;
  disabled?: boolean | ((record: Object, actionType?: string) => boolean);
  autoFocus?: boolean;
  registerConfig?: RegisterType;
  affectFields?: string[];
  dependOnFields?: string[];
}

export default function FieldDateTimePicker({
  name,
  disabled,
  autoFocus = false,
  label,
  defaultValue,
  placeholder = 'Search',
  registerConfig,
  tips,
  affectFields,
  dependOnFields,
  ...otherProps // like step ...etc
}: DateTimePickerProps) {
  const {
    watch,
    errors,
    clearErrors,
    control,
    setValue,
    trigger,
  } = useFormContext();

  // *define Fields-value Array depend on special fields' value
  const dependOnFieldsArray = useMemo(
    () => (dependOnFields ? dependOnFields.map(f => watch()[f]) : undefined),
    [watch()],
  );

  // *compatible disabled data-type
  const DisabledMemo = useMemo(
    () => (disabled instanceof Function ? disabled(watch()) : disabled),
    [dependOnFieldsArray],
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
    [registerConfig, watch()],
  );

  // *set Label
  const required = RegisterConfigMemo.validate?.empty;
  const labelNode = useMemo(
    () =>
      tips ? (
        <TipLabel required={Boolean(required)} label={label} tips={tips} />
      ) : (
        (required ? '* ' : '') + label
      ),
    [required],
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
      defaultValue={defaultValue ?? ''}
      render={props => (
        <TextField
          label={labelNode}
          value={props.value}
          disabled={DisabledMemo}
          placeholder={placeholder}
          type="datetime-local"
          autoFocus={autoFocus}
          error={Boolean(errors[name])}
          helperText={
            <span style={{ position: 'absolute' }}>
              {errors[name] ? errors[name].message : ''}
            </span>
          }
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={e => {
            console.log(e.target.value);
            setValue(
              name,
              moment.utc(e.target.value).format('YYYY-MM-DDTHH:mm'),
            );
            if (affectFields && affectFields instanceof Array) {
              affectFields.forEach(f => {
                setValue(f, null);
              });
            }
            trigger(name);
          }}
        />
      )}
    ></Controller>
  );
}
// todo use @material-picker-beta
// or https://rsuitejs.com/components/date-range-picker/
