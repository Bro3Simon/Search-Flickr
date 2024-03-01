import { act, render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useForm } from "react-hook-form";

import { FormTextField } from "app/components/FormTextField";
import { REQUIRED_ERROR_MESSAGE, REQUIRED_RULE } from "app/utilities";

describe("test FormTextField", () => {
  const textFieldName = "myTextField";

  function getUseFormResults() {
    return renderHook(() =>
      useForm({
        defaultValues: {
          myDefaultTextField: "default text",
          myNumberField: 0,
          myTextField: "",
        },
      }),
    ).result.current;
  }

  test("renders a textbox", () => {
    render(
      <FormTextField
        control={getUseFormResults().control}
        name={textFieldName}
      />,
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("renders a textbox with the correct name", () => {
    render(
      <FormTextField
        control={getUseFormResults().control}
        name={textFieldName}
      />,
    );

    expect(screen.getByRole("textbox")).toHaveAttribute("name", textFieldName);
  });

  test("renders a textbox with the correct label", () => {
    const textFieldLabel = "Search Criteria";

    render(
      <FormTextField
        control={getUseFormResults().control}
        label={textFieldLabel}
        name={textFieldName}
      />,
    );

    expect(screen.getByLabelText(textFieldLabel)).toBeInTheDocument();
  });

  test("renders a textbox of type text by default", () => {
    render(
      <FormTextField
        control={getUseFormResults().control}
        name={textFieldName}
      />,
    );

    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
  });

  test("renders a textbox that is not disabled", () => {
    render(
      <FormTextField
        control={getUseFormResults().control}
        name={textFieldName}
      />,
    );

    expect(screen.getByRole("textbox")).not.toBeDisabled();
  });

  test("renders a textbox that is not required", () => {
    render(
      <FormTextField
        control={getUseFormResults().control}
        name={textFieldName}
      />,
    );

    expect(screen.getByRole("textbox")).not.toBeRequired();
  });

  test("renders a required textbox", () => {
    render(
      <FormTextField
        control={getUseFormResults().control}
        name={textFieldName}
        rules={REQUIRED_RULE}
      />,
    );

    expect(screen.getByRole("textbox")).toBeRequired();
  });

  test("renders the correct error message for a required field that is empty", async () => {
    const { control, trigger } = getUseFormResults();

    render(
      <FormTextField
        control={control}
        name={textFieldName}
        rules={REQUIRED_RULE}
      />,
    );

    expect(screen.queryByText(REQUIRED_ERROR_MESSAGE)).not.toBeInTheDocument();
    await act(() => trigger(textFieldName));
    expect(screen.getByText(REQUIRED_ERROR_MESSAGE)).toBeInTheDocument();
  });

  test("renders a textbox with the correct default value", async () => {
    render(
      <FormTextField
        control={getUseFormResults().control}
        name="myDefaultTextField"
      />,
    );

    expect(screen.getByRole("textbox")).toHaveValue("default text");
  });

  test("the default value is reflected in RHF", async () => {
    const { control, getValues } = getUseFormResults();
    const textFieldName = "myDefaultTextField";

    render(<FormTextField control={control} name={textFieldName} />);

    expect(getValues(textFieldName)).toEqual("default text");
  });

  test("changing the value of the textbox is reflected in RHF", async () => {
    const { control, getValues } = getUseFormResults();
    const user = userEvent.setup();
    const value = "testing";

    render(<FormTextField control={control} name={textFieldName} />);

    await user.type(screen.getByRole("textbox"), value);
    expect(getValues(textFieldName)).toEqual(value);
  });
});
