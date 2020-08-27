import * as React from "react";
import { connect } from "react-redux";
import UserStack from "./UserStack";
import AdminStack from "./AdminStack";
import HomeStack from "./HomeStack";
import EmployeeStack from "./EmployeeStack";

const Stacks = (props) => {
	const StackDisplay = () => {
		switch (props.user.user.user) {
			case "Admin":
				return <AdminStack />;

			case "employee":
				return <EmployeeStack />;

			default:
				return <UserStack />;
		}
	};

	return props.user.user ? StackDisplay() : <HomeStack />;
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Stacks);
