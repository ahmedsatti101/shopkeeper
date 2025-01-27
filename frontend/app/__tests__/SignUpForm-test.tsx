import { render, screen } from "@testing-library/react-native";

import SignUpForm from "../sign-up/index";

describe("<SignUpForm />", () => {
  beforeEach(() => {
    render(<SignUpForm />);
  });

  test("Should render 'Sign up' text", () => {
    screen.getAllByText("Sign up");
  });
  test("Should render 'Username' text", () => {
    screen.getByText("Username");
  });
  test("Should render text input for Username", () => {
    screen.getByLabelText("Username text input");
  });
  test("Should render username requirements text", () => {
    screen.getByText(
      "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.",
    );
  });
  test("Should render 'Password' text", () => {
    screen.getByText("Password");
  });
  test("Should render text input for Password", () => {
    screen.getByLabelText("Password input");
  });
  test("Should render password requirements text", () => {
    screen.getByTestId("password-requirements");
  });
  test("Should render Submit button", () => {
    screen.getByLabelText("Form submit button");
  });
  test("Should render 'Already a customer? Sign in' text", () => {
    screen.getByText("Already a customer? Sign in");
  });
});
