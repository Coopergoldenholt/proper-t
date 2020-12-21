import * as React from "react";
import { connect } from "react-redux";
// import UserStack from "./UserStack";
import {
	AdminHomeStack,
	AdminUserStack,
	AdminPropertiesStack,
	AdminFormsStack,
} from "./AdminStack";
import AdminUsersStack from "./UsersStack";
import WelcomeStack from "./HomeStack";
import {
	EmployeeHomeStack,
	EmployeePropertiesStack,
	EmployeeFormsStack,
} from "./EmployeeStack";
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
							<Tab.Screen name="Home" component={AdminHomeStack} />
							<Tab.Screen name="Forms" component={AdminFormsStack} />
							<Tab.Screen name="Properties" component={AdminPropertiesStack} />
							<Tab.Screen name="Users" component={AdminUserStack} />
						</Tab.Navigator>
					</NavigationContainer>
				);

			case "employee":
				return (
					<NavigationContainer>
						<Tab.Navigator>
							<Tab.Screen name="Home" component={EmployeeHomeStack} />
							<Tab.Screen name="Forms" component={EmployeeFormsStack} />
							<Tab.Screen
								name="Properties"
								component={EmployeePropertiesStack}
							/>
						</Tab.Navigator>
					</NavigationContainer>
				);

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
