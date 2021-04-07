import React from 'react';
import { Button } from '@material-ui/core';
import { useFormContext } from './FormContext';

export default function FormResetBtn({ optionFn }: { optionFn?: () => void }) {
  const { reset, defaultValues } = useFormContext();
  return (
    <Button
      key="reset"
      onClick={() => {
        reset(defaultValues);
        optionFn && optionFn();
      }}
    >
      Cancel
    </Button>
  );
}
