import React, { createContext, useContext } from 'react';
import { UseFormMethods, FieldValues } from 'react-hook-form';

interface ContextFormat extends UseFormMethods<FieldValues> {
  defaultValues?: Object;
}

export const formContext = createContext<ContextFormat>(<ContextFormat>{});
export const FormProvider = formContext.Provider;
export const useFormContext = () => useContext(formContext);
