import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EmployeeDashboard from "../app/screens/Employee/EmployeeDashboard";
import Form from "../app/screens/RequestForm";
import Properties from "../app/screens/Employee/EmployeeProperties";
import Property from "../app/screens/PropertyDisplay";
import Projects from "../app/screens/Projects";
import ProjectsDisplay from "../app/screens/ProjectDisplay";

const Stack = createStackNavigator();

const UserStack = (props) => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Dashboard" component={EmployeeDashboard} />
				<Stack.Screen name="Form" component={Form} />
				<Stack.Screen name="Properties" component={Properties} />
				<Stack.Screen name="Property" component={Property} />
				<Stack.Screen name="Projects" component={Projects} />
				<Stack.Screen name="Project" component={ProjectsDisplay} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default UserStack;
