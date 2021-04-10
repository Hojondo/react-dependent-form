import React from "react";
import { Form, FieldText } from "../index";
import { shallow, ShallowWrapper } from "enzyme";

let wrapper: ShallowWrapper;
beforeEach(() => {
  wrapper = shallow(
    <Form
      onSubmit={() => {
        console.log("submit");
      }}
    >
      <FieldText name="test" label="test label" />
    </Form>
  );
});

describe("<FieldText /> rendering", () => {
  it("should render one <h1>", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
