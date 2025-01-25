import { render } from "@testing-library/react-native";

import Index from "../app/index";

describe("<HomeScreen />", () => {
  test("Text renders correctly on HomeScreen", () => {
    const { getByText } = render(<Index />);

    getByText("Hello!!!");
  });
});
