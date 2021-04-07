import React from 'react';
import { Tooltip } from '@material-ui/core';
import { ErrorOutline as ErrorOutlineIcon } from '@material-ui/icons';

export default function TipLabel({
  required,
  label,
  tips,
}: {
  required: boolean;
  label: string;
  tips: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>{(required ? '* ' : '') + label}</div>
      <Tooltip
        title={
          <pre style={{ marginBottom: 0, whiteSpace: 'break-spaces' }}>
            {tips}
          </pre>
        }
      >
        <ErrorOutlineIcon
          style={{ fontSize: 'inherit', marginLeft: '.25rem' }}
        />
      </Tooltip>
    </div>
  );
}
