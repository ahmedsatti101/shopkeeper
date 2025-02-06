import { render, screen } from "@testing-library/react-native";

import Home from "../home";

jest.mock("expo-font");

describe("<Home />", () => {
  beforeEach(() => {
    render(<Home />);
  });
  test("Should render basket icon", () => {
      screen.getByTestId("basket-icon");
  });
});
