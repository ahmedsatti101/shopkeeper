import { render, screen } from "@testing-library/react-native";

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
});
