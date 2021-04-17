import React from "react";
import { Button } from "@material-ui/core";

interface ResetProps {
  children?: JSX.Element;
}

export default function FormSubmitBtn({ children }: ResetProps) {
  return (
    <Button type="submit" variant="text">
      {children ? children : "Submit"}
    </Button>
  );
}
