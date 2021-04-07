import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { withStyles } from '@material-ui/core/styles';
import { Controller } from 'react-hook-form';
import _ from 'lodash';

import { useFormContext } from './FormContext';
import TipLabel from './components/TipLabel';

import {
  OptionDataObj,
  OptionDataType,
  RegisterType,
  ExcludeKeys,
} from './types';

const StyledTextField = withStyles({
  root: {
    '& .MuiInputLabel-outlined': {
      pointerEvents: 'unset',
    },
  },
})(TextField);

type ValueFormat = string | number | boolean | readonly string[] | undefined;
interface SelectProps
  extends Omit<React.HTMLProps<HTMLInputElement>, ExcludeKeys> {
  name: string;
  label: string;
  optionsData: OptionDataType;
  multiple?: boolean;
  defaultValue?: ValueFormat;
  tips?: string;
  disabled?: boolean | ((record: Object, actionType?: string) => boolean);
  autoFocus?: boolean; //todo
  registerConfig?: RegisterType;
  affectFields?: string[];
  dependOnFields?: string[];
}

// const CreateCompatibleValueFC = (optionsObj: Array<OptionDataObj>) => (
//   val: string | OptionDataObj | boolean,
// ) => {
//   return typeof val === 'string' || typeof val === 'boolean'
//     ? val
//     : val && optionsObj.find(o => o.value === val.value)?.value;
// };

export default function FieldAutoInput({
  name,
  label,
  multiple = false,
  optionsData,
  defaultValue,
  disabled,
  placeholder = 'Input',
  tips,
  registerConfig = { required: false },
  affectFields,
  dependOnFields,
  ...otherProps
}: SelectProps) {
  const {
    watch,
    errors,
    setValue,
    trigger,
    control,
    clearErrors,
  } = useFormContext();

  // *get options data depend on special fields' value
  const dependOnFieldsArray = useMemo(
    () => (dependOnFields ? dependOnFields.map(f => watch()[f]) : null),
    [watch()],
  );

  const [optionsDataState, setOptionsDataState] = useState<
    Array<OptionDataObj>
  >([]);
  // const compatibleValueFn = useCallback(
  //   CreateCompatibleValueFC(optionsDataState),
  //   [optionsDataState],
  // );
  useEffect(() => {
    // !mark: use Promise to compatible whatever the (return of)optionData of parmas is an array or promise
    Promise.resolve(
      optionsData instanceof Function ? optionsData(watch()) : optionsData,
    ).then(res => {
      setOptionsDataState(res);
    });
    return () => {};
  }, [dependOnFieldsArray]);

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
        empty: data =>
          _.some(optionsDataState, o => _.isEqual(data, o.value)) ||
          'Input cannot be empty!', // *force to change require message to unified format
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
        (required ? '* ' : '') + label
      ),
    [required],
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
      defaultValue={defaultValue ?? (multiple ? [] : null)}
      render={props => {
        return (
          <Autocomplete
            multiple={multiple}
            value={props.value}
            disabled={DisabledMemo}
            options={_.sortBy(optionsDataState, o => o.label).map(o => o.value)}
            filterSelectedOptions
            onChange={(e, v, reason) => {
              console.log(v, reason);

              setValue(name, v);
              if (affectFields && affectFields instanceof Array) {
                affectFields.forEach(f => {
                  setValue(f, null);
                });
              }
              trigger(name);
              dependOnFields && clearErrors(dependOnFields); // *in case for situation like two fields can't be same
            }}
            renderInput={params => {
              return (
                <StyledTextField
                  {...params}
                  variant="outlined"
                  label={labelNode}
                  placeholder={placeholder}
                  error={Boolean(errors[name])}
                  helperText={
                    <span style={{ position: 'absolute' }}>
                      {errors[name] ? errors[name].message : ''}
                    </span>
                  }
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <span></span>
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
                />
              );
            }}
            getOptionLabel={x => {
              // todo
              // !mark: there is a bug in Material-UI@v4 https://github.com/mui-org/material-ui/issues/19173#issuecomment-786109015;
              // !mark: so if the async options later than component-mounted, just to use the value-string
              return (
                optionsDataState.find(o => o.value === x)?.label ?? String(x)
              );
            }}
            getOptionSelected={(option, value) => {
              return _.isEqual(value, option);
            }}
          />
        );
      }}
    />
  );
}
