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

export default function WelcomeScreen({ navigation }) {
	return (
		<ImageBackground
			source={require("../../assets/home-background.jpg")}
			style={styles.background}
		>
			{/* <TextInput placeholder="E-mail" style={styles.input} /> */}
			{/* <Image source={{"https://static.thenounproject.com/png/1081856-200.png"}} /> */}

			<Text style={styles.text}>Proper-T</Text>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate("Login")}
				>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate("Register")}
				>
					<Text style={styles.buttonText}>Register</Text>
				</TouchableOpacity>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	background: {
		backgroundColor: "white",
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
		justifyContent: "flex-end",
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
		color: "white",
		fontSize: 45,
		textAlign: "center",
	},
});
