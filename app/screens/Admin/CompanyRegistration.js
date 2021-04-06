import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Alert,
	TouchableOpacity,
	TextInput,
	Picker,
} from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import axios from "axios";

import { URL } from "../../../config";

const CompanyRegistration = (props) => {
	const [companyName, setCompanyName] = useState("");

	const handleRegister = () => {
		axios

			.post(`${URL}/api/company/managing-company`, {
				companyName: companyName,
			})
			.then((res) =>
				Alert.alert(
					//title
					"Company Added",
					//body
					"You will be sent back to the Dashboard",
					[
						{
							text: "Sounds Good",
							onPress: () => props.navigation.popToTop(),
						},
					],
					{ cancelable: false }
					//clicking out side of alert will not cancel
				)
			)
			.catch((err) => Alert.alert("Company Could Not be Added"));
	};

	return (
		<View style={styles.background}>
			<TextInput
				placeholder="Company Name"
				style={styles.input}
				placeholderTextColor="black"
				onChangeText={(name) => setCompanyName(name)}
			/>

			<TouchableOpacity style={styles.button} onPress={() => handleRegister()}>
				<Text style={styles.buttonText}>Create Company</Text>
			</TouchableOpacity>
		</View>
	);
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withNavigation(CompanyRegistration));

const styles = StyleSheet.create({
	background: {
		width: "100%",
		paddingTop: 20,
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	button: {
		width: "50%",
		marginTop: 10,
		paddingTop: 10,
		backgroundColor: "#c48273",
		borderRadius: 5,
		alignItems: "center",
		padding: 10,
		color: "white",
	},
	buttonText: {
		color: "white",
	},
	input: {
		width: 200,
		height: 44,
		padding: 10,
		borderWidth: 1,
		borderColor: "white",
		marginBottom: 10,
		borderRadius: 5,
		backgroundColor: "white",
		color: "black",
	},
	text: {
		color: "white",
		fontSize: 40,
	},
});
