import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { destroySession } from "../../ducks/reducers/userReducer";

const LogoutButton = (props) => {
	const handleLogout = () => {
		axios.post("http://localhost:4068/api/user/logout");
		props.destroySession();
	};
	return (
		<TouchableOpacity onPress={() => handleLogout()}>
			<Text>Logout</Text>
		</TouchableOpacity>
	);
};

export default connect(null, { destroySession })(LogoutButton);
