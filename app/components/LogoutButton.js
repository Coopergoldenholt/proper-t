import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { destroySession } from "../../ducks/reducers/userReducer";
import { URL } from "../../config";

const LogoutButton = (props) => {
	const handleLogout = () => {
		axios.post(`${URL}/api/user/logout`);
		props.destroySession();
	};
	return (
		<TouchableOpacity onPress={() => handleLogout()}>
			<Text>Logout</Text>
		</TouchableOpacity>
	);
};

export default connect(null, { destroySession })(LogoutButton);
