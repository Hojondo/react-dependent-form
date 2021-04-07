import React from 'react';
import { useForm } from 'react-hook-form';
import { FormProvider } from './FormContext';

type OnSubmitFC = (record: {}) => void;
interface FormProps {
  onSubmit: OnSubmitFC;
  defaultValues?: {};
  children?: JSX.Element | JSX.Element[];
}

export default function Form({
  onSubmit,
  children,
  defaultValues = {},
  ...otherProps
}: FormProps) {
  const {
    unregister,
    register,
    handleSubmit,
    watch,
    errors,
    reset,
    trigger,
    setValue,
    getValues,
    control,
    setError,
    clearErrors,
  } = useForm({
    mode: 'onSubmit',
    defaultValues,
  });
  const HOC_submit = (Fn: OnSubmitFC) => () => {
    Fn(watch());
  }; // !mark: change the fieldsVal to be watch(), tend to get real vals
  console.log(watch());
  return (
    <FormProvider
      //@ts-ignore[1]
      value={{
        unregister,
        register,
        errors,
        setValue,
        getValues,
        trigger,
        control,
        watch,
        reset,
        setError,
        clearErrors,
        defaultValues,
      }}
    >
      <form onSubmit={handleSubmit(HOC_submit(onSubmit))} {...otherProps}>
        {children}
      </form>
    </FormProvider>
  );
}
// todo 封装渲染render方法
// todo 统一起来所有的dependonField 和 affectField 关联关系，在form中，可以尝试useEffect
