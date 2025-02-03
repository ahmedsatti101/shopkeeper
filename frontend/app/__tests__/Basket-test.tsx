import { fireEvent, render, screen } from "@testing-library/react-native";

import Basket from "../basket";
import Dropdown from "../components/Dropdown";
import { TouchableOpacity } from "react-native";

jest.mock("expo-font");

describe("<Basket />", () => {
  beforeEach(() => {
    render(<Basket />);
  });

  test("Should render 'Basket Summary' text", () => {
    screen.getAllByText("Basket Summary");
  });

  test("Should render 'Total' text", () => {
    screen.getAllByText("Total");
  });

  test("Should render 'Total items' text", () => {
    screen.getAllByText("Total items");
  });
  test("Should render 'Checkout' text", () => {
    screen.getAllByText("Checkout");
  });
  test("Should render Checkout button on screen", () => {
    screen.getByLabelText("Form submit button");
  });
  test("Should render trash icon on basket screen", () => {
    screen.getByTestId("Remove item from basket icon");
  });
  test("Should render price for item in basket", () => {
    screen.getByTestId("basket-item-price");
  });
  test("Should render name of item in basket", () => {
    screen.getByTestId("basket-item-name");
  });
  test("Should render image of item in basket", () => {
    screen.getByTestId("basket-item-image");
  });
  test("Should render dropdown menu for quantity in basket screen", () => {
    screen.getByTestId("quantity-dropdownmenu");
  });
  test("Dropdown menu should open when clicked or pressed", async () => {
    const itemData = [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
    ];
    const mockOnPress = jest.fn();
    const { getByTestId, queryByText } = render(
      <Dropdown
        data={itemData}
        onChange={mockOnPress}
        placeholder="Select an option"
      />,
    );

    expect(queryByText("Option 1")).toBeNull();

    const dropdownButton = getByTestId("quantity-dropdownmenu").findByType(
      TouchableOpacity,
    );
    fireEvent.press(dropdownButton);

    expect(queryByText("2")).not.toBeNull();
  });
});
