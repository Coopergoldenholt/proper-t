import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../app/screens/Home/WelcomeScreen";
import Login from "../app/screens/Home/Login";
import Register from "../app/screens/Home/Register";

const Stack = createStackNavigator();

const AdminStack = (props) => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Register" component={Register} />
		</Stack.Navigator>
	);
};

export default AdminStack;
