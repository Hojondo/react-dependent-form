import React from "react";
import { Button } from "@material-ui/core";

interface ResetProps {
  children?: JSX.Element;
  resetCallBack?: () => void;
}

export default function FormResetBtn({ resetCallBack, children }: ResetProps) {
  return (
    <Button
      type="reset"
      onClick={() => {
        resetCallBack && resetCallBack();
      }}
      variant="text"
    >
      {children ? children : "Reset"}
    </Button>
  );
}
