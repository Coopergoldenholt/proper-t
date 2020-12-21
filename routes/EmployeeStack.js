import * as React from "react";
import PropertyDisplay from "../app/screens/PropertyDisplay";
import { createStackNavigator } from "@react-navigation/stack";
import RequestForm from "../app/screens/RequestForm";
import Dashboard from "../app/screens/Dashboard";
import EmployeeProperties from "../app/screens/Employee/EmployeeProperties";

const Stack = createStackNavigator();

export const EmployeeHomeStack = (props) => {
	return (
		// <NavigationContainer>
		<Stack.Navigator>
			<Stack.Screen name="Dashboard" component={Dashboard} />
		</Stack.Navigator>
		// </NavigationContainer>
	);
};

export const EmployeePropertiesStack = (props) => {
	return (
		// <NavigationContainer>
		<Stack.Navigator>
			{/* <Stack.Screen name="Register" component={AdminRegister} /> */}
			<Stack.Screen name="Properties" component={EmployeeProperties} />

			<Stack.Screen name="Property" component={PropertyDisplay} />
		</Stack.Navigator>
		// </NavigationContainer>
	);
};
export const EmployeeFormsStack = (props) => {
	return (
		// <NavigationContainer>
		<Stack.Navigator>
			<Stack.Screen name="Form Request" component={RequestForm} />
		</Stack.Navigator>
		// </NavigationContainer>
	);
};
