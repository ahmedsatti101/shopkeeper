import { render, screen } from "@testing-library/react-native";
import { userEvent } from "@testing-library/react-native";

import SignInForm from "../sign-in";

describe("<SignInForm />", () => {
    beforeEach(() => {
        render(<SignInForm />);
    });

    test("Should render 'Sign in' text", () => {
        screen.getAllByText("Sign in");
    });
    test("Should render 'Username' text", () => {
        screen.getByText("Username");
    });
    test("Should render text input for Username", () => {
        screen.getByLabelText("Username text input");
    });
    test("Should render 'Password' text", () => {
        screen.getByText("Password");
    });
    test("Should render text input for Password", () => {
        screen.getByLabelText("Password input");
    });
    test("Should render Submit button", () => {
        screen.getByLabelText("Form submit button");
    });
    test("Should render 'Need to create an account? Sign up' text", () => {
        screen.getByText("Need to create an account? Sign up");
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
    describe("Sign in Form modal", () => {
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
        test("Clicking on 'OK' when the modal is open, closes the modal", async () => {
          const submitbtn = screen.getByTestId("submit-button");
          const usernameField = screen.getByLabelText("Username text input");
          const passwordField = screen.getByLabelText("Password input");
          const user = userEvent.setup();

          await user.type(usernameField, "Ahmed1");
          await user.type(passwordField, "mypassword");
          await user.press(submitbtn);

          const modal = screen.getByTestId("form-modal");
          await user.press(screen.getByText("OK"));

          expect(modal).not.toBeOnTheScreen();
        });
  });
});
