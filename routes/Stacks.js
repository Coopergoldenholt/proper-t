import * as React from "react";
import { connect } from "react-redux";
// import UserStack from "./UserStack";
import {
	HomeStack,
	UserStack,
	PropertiesStack,
	FormsStack,
} from "./AdminStack";
import AdminUsersStack from "./UsersStack";
import WelcomeStack from "./HomeStack";
import EmployeeStack from "./EmployeeStack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const Stacks = (props) => {
	const StackDisplay = () => {
		switch (props.user.user.user) {
			case "Admin":
				return (
					<NavigationContainer>
						<Tab.Navigator>
							<Tab.Screen name="Home" component={HomeStack} />
							<Tab.Screen name="Forms" component={FormsStack} />
							<Tab.Screen name="Properties" component={PropertiesStack} />
							<Tab.Screen name="Users" component={UserStack} />
						</Tab.Navigator>
					</NavigationContainer>
				);

			case "employee":
				return <EmployeeStack />;

			default:
				return <UserStack />;
		}
	};

	return props.user.user ? (
		StackDisplay()
	) : (
		<NavigationContainer>
			<WelcomeStack />
		</NavigationContainer>
	);
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Stacks);
