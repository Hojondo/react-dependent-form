import React, { ReactElement, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { FormProvider } from "./FormContext";

type OnSubmitFC = (record: {}) => void;
interface FormProps extends React.HTMLProps<HTMLFormElement> {
  onSubmit: OnSubmitFC;
  defaultValues?: {};
  children?: JSX.Element | JSX.Element[];
}

// const defaultStyle: React.CSSProperties = {
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "flex-start",
// };
const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "50vw",
    padding: "6px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    "&>*:not(:last-child)": {
      marginBottom: "6px",
    },
    "&>*:last-child": {
      alignSelf: "center",
    },
  },
}));

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
    mode: "all",
    defaultValues,
  });
  const classes = useStyles();

  // !mark: support reset defaultValue in children component config, reference issue: https://react-hook-form.com/api/useform/reset - rule 2
  const Memo_defaultValueMapping: any = useMemo(
    () =>
      [].reduce.call(
        children,
        (r: any, Node: ReactElement) => {
          return Node?.props?.defaultValue
            ? { ...r, [Node.props.name]: Node?.props?.defaultValue }
            : r;
        },
        {}
      ),
    []
  );
  const handleReset = () => {
    reset({
      ...Object.fromEntries(Object.entries(watch()).map(([k, v]) => [k, null])),
      ...defaultValues,
      ...Memo_defaultValueMapping,
    });
  };
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
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={handleReset}
        className={classes.form}
        {...otherProps}
      >
        {children}
      </form>
    </FormProvider>
  );
}
// todo 封装render子组件, support children-config array in Form attributes in place of {children}
// todo 在form中，统一起来所有的dependonField 和 clearFieldsOnChange 关联关系，可以尝试useEffect