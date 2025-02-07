import { createDrawerNavigator } from "@react-navigation/drawer";
import SignUpForm from "../sign-up";
import Home from "../home";
import SignInForm from "../sign-in";
import Basket from "../basket";

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      backBehavior="history"
      screenOptions={{
        drawerStyle: { backgroundColor: "#e0b688", width: 240 },
        drawerLabelStyle: {
          color: "black",
          fontSize: 20,
          fontFamily: "serif",
          fontWeight: "bold",
        },
        drawerActiveTintColor: "#c4574f40",
        headerTitle: "Shopkeeper",
        headerTitleStyle: {
          fontFamily: "serif",
          fontSize: 20,
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#b77d7d" },
        drawerType: "slide",
        swipeEdgeWidth: 85
      }}
    >
      <Drawer.Screen name="Home" component={() => <Home name="Apple" price="0.80" quantity={10}/>} />
      <Drawer.Screen name="Sign up" component={SignUpForm} />
      <Drawer.Screen name="Sign in" component={SignInForm} />
      <Drawer.Screen name="Basket" component={Basket} />
    </Drawer.Navigator>
  );
}
