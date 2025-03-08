import { render, screen } from "@testing-library/react-native";
import { renderRouter } from "expo-router/testing-library";
import { userEvent } from "@testing-library/react-native";

import SignUpForm from "../sign-up/index";
import { server } from "./mocks/server";

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe("<SignUpForm />", () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
   });

  beforeEach(() => {
    render(<SignUpForm />);
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
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
    screen.getByTestId("password-requirements");
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
  test("Should render form error messages for submitting empty form", async () => {
    const user = userEvent.setup();
    const button = screen.getByTestId("submit-button");

    await user.press(button);

    const userErrMsg = screen.getByText("Username is required");
    const passwordErrMsg = screen.getByText("Password is required");

    expect(userErrMsg).toBeOnTheScreen();
    expect(passwordErrMsg).toBeOnTheScreen();
  });
  test("Password input value should match specified validation", async () => {
    const user = userEvent.setup();
    const passwordField = screen.getByLabelText("Password input");
    const button = screen.getByTestId("submit-button");

    await user.type(passwordField, "Testpss");
    await user.press(button);

    expect(
      screen.getByText("Password must be at least 8 characters"),
    ).toBeOnTheScreen();
  });
  describe("Field labels", () => {
    test("Should render form label for Username field", () => {
      const label = screen.getByRole("text", { name: "Username" });
      expect(label).toBeOnTheScreen();
    });
    test("Should render form label for Password field", () => {
      const label = screen.getByRole("text", { name: "Password" });
      expect(label).toBeOnTheScreen();
    });
  });
  describe("Sign up Form modal", () => {
    test("Modal should appear on screen when submit button is pressed", async () => {
      const submitbtn = screen.getByTestId("submit-button");
      const usernameField = screen.getByLabelText("Username text input");
      const passwordField = screen.getByLabelText("Password input");
      const user = userEvent.setup();

      await user.type(usernameField, "Ahmed1");
      await user.type(passwordField, "mypassword");
      await user.press(submitbtn);

      const modal = screen.getByTestId("form-modal");

      expect(modal).toBeOnTheScreen();
    });
    test("Clicking on 'Sign in' when the modal is open, redirects to the sign in form", async () => {
      renderRouter(
        {
          "sign-up": () => <SignUpForm />,
        },
        {
          initialUrl: "/sign-up",
        },
      );
      const submitbtn = screen.getByTestId("submit-button");
      const usernameField = screen.getByLabelText("Username text input");
      const passwordField = screen.getByLabelText("Password input");
      const user = userEvent.setup();

      await user.type(usernameField, "Ahmed1");
      await user.type(passwordField, "mypassword");
      await user.press(submitbtn);
      await user.press(screen.getByText("Sign in"))

      expect(screen).toHavePathname("/sign-in");
    });
  });
});
