import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LogoutButton from "../../components/LogoutButton";

function AdminDashboard({ navigation }) {
	return (
		<View style={styles.background}>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate("Form Request")}
				>
					<Text style={styles.buttonText}>Form</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate("Users")}
				>
					<Text style={styles.buttonText}>Users</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate("Properties")}
				>
					<Text style={styles.buttonText}>Properties</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate("Projects")}
				>
					<Text style={styles.buttonText}>Projects</Text>
				</TouchableOpacity>
			</View>
			<LogoutButton />
		</View>
	);
}

export default AdminDashboard;

const styles = StyleSheet.create({
	background: {
		// backgroundColor: "#CDCDCD",
		// height: 400,
		width: "100%",
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
	buttonText: {
		color: "white",
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
