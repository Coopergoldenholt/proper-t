import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	Alert,
	TouchableOpacity,
	TextInput,
	Image,
} from "react-native";
import LogoutButton from "../../components/LogoutButton";

function UserDashboard({ navigation }) {
	return (
		<View style={styles.background}>
			<View style={styles.buttonContainer}>
				{/* <Search /> */}
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate("Form")}
				>
					<Text>Form</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate("Properties")}
				>
					<Text>Properties</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate("Projects")}
				>
					<Text>Projects</Text>
				</TouchableOpacity>
			</View>
			<LogoutButton />
		</View>
	);
}

export default UserDashboard;

const styles = StyleSheet.create({
	background: {
		// height: 400,
		width: "100%",
		color: "black",
		paddingTop: 20,
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	button: {
		marginTop: 10,
		paddingTop: 10,
		backgroundColor: "#c48273",
		borderRadius: 5,
		alignItems: "center",
		padding: 10,
	},
	buttonContainer: {
		height: "70%",
		display: "flex",
		justifyContent: "center",
		width: "50%",
	},
	input: {
		width: 200,
		height: 44,
		padding: 10,
		borderWidth: 1,
		borderColor: "black",
		marginBottom: 10,
	},
	text: {
		color: "black",
		fontSize: 40,
	},
});
