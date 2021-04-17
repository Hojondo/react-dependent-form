# A form component of react

## Features
- Text Field
- AutoInput Field
- Multiple AutoInput Field
- Select Field
- Radio Field
- Checkbox
- DatePicker
- DateRangePicker
- DateTimePicker
- ~~Cascader Select Field~~ *!todo*

## Install
`npm install react-dependent-form`

## Demo
[codesandbox.io](https://codesandbox.io/s/react-dependent-form-demo-bkjn4)
![Screen Shot.png](https://i.loli.net/2021/04/17/GqL3xm2M9pcVgRy.png)
## How to use
```js
import React, { useState } from "react";
import {
  Form,
  FieldText,
  FieldAutoInput,
  FieldSelect,
  FieldDatePicker,
  FieldDateTimePicker,
  FieldDateRangePicker,
  FieldRadio,
  FieldCheckbox,
  FormResetBtn,
  FormSubmitBtn,
} from "react-dependent-form";

const mockOption = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
];
function App() {
  const [formValues, setformValues] = useState({});
  return (
    <div className="App">
      <Form
        onSubmit={(vals) => {
          setformValues(vals);
        }}
      >
        <FieldText name="input" label="Field Text" tips="tips" />
        <FieldAutoInput
          name="autoInput"
          label="AutoInput"
          optionsData={mockOption}
          tips="sss"
        />
        <FieldAutoInput
          multiple={true}
          name="mul-autoInput"
          label="Multiple AutoInput"
          optionsData={mockOption}
          tips="sss"
        />
        <FieldSelect name="select" label="Select" optionsData={mockOption} />
        <FieldDatePicker
          name="date"
          label="Field Date Picker"
          tips="It is a tip"
          defaultValue="2021-04-21"
        />
        <FieldDateTimePicker
          name="datetime"
          label="Field Date Time Picker"
          tips="It is a tip"
        />
        <FieldDateRangePicker
          name="date-range"
          label="Field Date Range Picker"
          tips="It is a tip"
        />
        <FieldRadio name="radio" label="Radio" optionsData={mockOption} />
        <FieldCheckbox name="checkbox" label="Check This" defaultValue={true} />
        <div>
          <FormSubmitBtn>custom-submit-content</FormSubmitBtn>
          <FormResetBtn
            resetCallBack={() => {
              console.log("trigger reset callback");
            }}
          />
        </div>
      </Form>
      <div style={{ marginTop: "5rem" }}>
        <h3>Submit Results: </h3>
        <pre>{JSON.stringify(formValues).replaceAll(",", "\n")}</pre>
      </div>
    </div>
  );
}

export default App;
```

## Reference
> - React
> - Material-ui
> - Typescript
> - Jest & enzyme
> - Rollup
> - React-hook-form
> - React-dates