import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserDashboard from "../app/screens/User/UserDashboard";
import Properties from "../app/screens/User/UserProperties";
import PropertyDisplay from "../app/screens/PropertyDisplay";
import Form from "../app/screens/RequestForm";
import Projects from "../app/screens/Projects";
import ProjectsDisplay from "../app/screens/ProjectDisplay";

const Stack = createStackNavigator();

const UserStack = (props) => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Dashboard" component={UserDashboard} />
				<Stack.Screen name="Properties" component={Properties} />
				<Stack.Screen name="Property" component={PropertyDisplay} />
				<Stack.Screen name="Form" component={Form} />
				<Stack.Screen name="Projects" component={Projects} />
				<Stack.Screen name="Project" component={ProjectsDisplay} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default UserStack;
