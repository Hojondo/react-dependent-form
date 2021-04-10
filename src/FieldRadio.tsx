import React, { useState, useEffect, useMemo, useCallback } from 'react';
import _ from 'lodash';
import {
  Grid,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@material-ui/core';
import { Controller } from 'react-hook-form';

import { useFormContext } from './FormContext';
import TipLabel from './components/TipLabel';

import {
  OptionDataObj,
  OptionDataType,
  RegisterType,
  ExcludeKeys,
} from './types';

type ValueFormat = string | number | boolean | readonly string[] | undefined;
interface RadioProps
  extends Omit<React.HTMLProps<HTMLInputElement>, ExcludeKeys> {
  name: string;
  label: string;
  optionsData: OptionDataType;
  defaultValue?: ValueFormat;
  tips?: string;
  disabled?: boolean | ((record: Object, actionType?: string) => boolean);
  autoFocus?: boolean; //todo
  registerConfig?: RegisterType;
  clearFieldsOnChange?: string[];
  dependOnFields?: string[];
}

const CreateCompatibleValueFC = (optionsObj: Array<OptionDataObj>) => (
  val: string | OptionDataObj | boolean,
) => {
  return typeof val === 'string' || typeof val === 'boolean'
    ? val
    : val && optionsObj.find(o => o.value === val.value)?.value;
};

export default function FieldRadio({
  name,
  label,
  optionsData = [],
  defaultValue,
  tips,
  disabled = false,
  autoFocus = false,
  registerConfig,
  clearFieldsOnChange,
  dependOnFields,
  ...otherProps
}: RadioProps) {
  // *custom type safety for select
  type KeyofOtherProps = keyof typeof otherProps;
  function isKeyofInputElement(prop: any): prop is KeyofOtherProps {
    return prop in HTMLInputElement.prototype;
  }

  const {
    watch,
    errors,
    trigger,
    setValue,
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
  const compatibleValueFn = useCallback(
    CreateCompatibleValueFC(optionsDataState),
    [optionsDataState],
  );
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
          _.some(optionsDataState, o =>
            _.isEqual(compatibleValueFn(data), o.value),
          ) || 'Radio cannot be empty!', // *force to change require message to unified format
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
      defaultValue={defaultValue ?? ''} // !mark: in case that the default value is boolean false
      control={control}
      rules={rules}
      render={props => {
        return (
          <FormControl
            component="fieldset"
            error={Boolean(errors[name])}
            style={{ width: '100%' }}
          >
            <FormLabel component="legend">{labelNode}</FormLabel>
            <Grid container justify="space-between">
              {optionsDataState.map(o => (
                <FormControlLabel
                  key={String(o.value)}
                  control={
                    <Radio
                      color="primary"
                      checked={_.isEqual(
                        compatibleValueFn(props.value),
                        o.value,
                      )}
                      value={compatibleValueFn(props.value) ?? ''}
                      name={name}
                      autoFocus={autoFocus}
                      /** start: support cancel radio checked */
                      onClick={() => {
                        if (_.isEqual(compatibleValueFn(props.value), o.value))
                          setValue(name, '');
                        else setValue(name, o.value);
                        if (clearFieldsOnChange && clearFieldsOnChange instanceof Array) {
                          clearFieldsOnChange.forEach(f => {
                            setValue(f, null);
                          });
                        }
                        trigger(name);
                      }}
                      inputProps={Object.keys(otherProps).reduce(
                        (r, c) =>
                          isKeyofInputElement(c)
                            ? { ...r, [c]: otherProps[c] }
                            : r,
                        {},
                      )}
                      /** end: support cancel radio checked */
                      // onChange={() => {
                      //   setValue(name, o.value);
                      //   if (clearFieldsOnChange && clearFieldsOnChange instanceof Array) {
                      //     clearFieldsOnChange.forEach(f => {
                      //       setValue(f, null);
                      //     });
                      //   }
                      //   trigger(name);
                      // }}
                    />
                  }
                  label={o.label}
                  disabled={DisabledMemo || o.disabled}
                />
              ))}
            </Grid>
            <FormHelperText>
              <span style={{ position: 'absolute' }}>
                {errors[name] ? errors[name].message : ''}
              </span>
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
}
