import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AdminDashboard from "../app/screens/Admin/AdminDashboard";
import AdminUsers from "../app/screens/Admin/AdminUsers";
import AdminRegister from "../app/screens/Admin/AdminRegister";
import AdminPoperties from "../app/screens/Admin/AdminProperties";
import AdminPropertyRegistraition from "../app/screens/Admin/AdminPropertyRegistration";
import RequestForm from "../app/screens/RequestForm";
import PropertyDisplay from "../app/screens/PropertyDisplay";
import CompanyRegistration from "../app/screens/Admin/CompanyRegistration";
import Projects from "../app/screens/Projects";
import ProjectDisplay from "../app/screens/ProjectDisplay";
import AddNewProject from "../app/screens/Admin/AddNewProject";

const Stack = createStackNavigator();

const UserStack = (props) => {
	return (
		// <NavigationContainer>
		<Stack.Navigator>
			<Stack.Screen name="Users" component={AdminUsers} />
			<Stack.Screen name="Register" component={AdminRegister} />
			<Stack.Screen name="Properties" component={AdminPoperties} />
			<Stack.Screen name="Projects" component={Projects} />
			<Stack.Screen
				name="Property Registration"
				component={AdminPropertyRegistraition}
			/>
			<Stack.Screen
				name="Company Registration"
				component={CompanyRegistration}
			/>
			<Stack.Screen name="Form Request" component={RequestForm} />
			<Stack.Screen name="Property" component={PropertyDisplay} />
			<Stack.Screen name="Project" component={ProjectDisplay} />
			<Stack.Screen name="Create Project" component={AddNewProject} />
		</Stack.Navigator>
		// </NavigationContainer>
	);
};

export default UserStack;
