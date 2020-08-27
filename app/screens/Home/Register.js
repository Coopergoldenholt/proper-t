import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Alert,
	TouchableOpacity,
	TextInput,
	Picker,
	ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { saveSession } from "../../../ducks/reducers/userReducer";

function Register(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");

	const handleRegister = () => {
		if (!email) {
			Alert.alert("Please Enter An Email");
		} else if (!password) {
			Alert.alert("Please Enter A Password");
		} else if (confirmPassword !== password) {
			Alert.alert("Passwords do not Match");
		} else if (!name) {
			Alert.alert("Please Enter Your Name");
		} else {
			axios
				.post("http://64.227.51.108:4068/api/signup", {
					email: email,
					password: password,
					name: name,
				})
				// .post("http://localhost:4068/api/signup", {
				// 	email: email,
				// 	password: password,
				// 	name: name,
				// })
				.then((res) =>
					props.saveSession(
						res.data.companyId,
						res.data.email,
						res.data.id,
						res.data.loggedIn,
						res.data.user
					)
				)
				.catch((err) => Alert.alert(err.response.data));
		}
	};

	return (
		<ImageBackground
			source={require("../../assets/home-background.jpg")}
			style={styles.background}
		>
			<TextInput
				placeholder="Name"
				style={styles.input}
				placeholderTextColor="black"
				onChangeText={(name) => setName(name)}
			/>
			<TextInput
				placeholder="E-mail"
				style={styles.input}
				placeholderTextColor="black"
				onChangeText={(email) => setEmail(email)}
			/>
			<TextInput
				placeholder="Password"
				style={styles.input}
				placeholderTextColor="black"
				onChangeText={(password) => setPassword(password)}
				secureTextEntry={true}
			/>
			<TextInput
				placeholder="Confirm Password"
				style={styles.input}
				placeholderTextColor="black"
				onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
				secureTextEntry={true}
			/>

			{/* <Image source={{"https://static.thenounproject.com/png/1081856-200.png"}} /> */}

			<TouchableOpacity style={styles.button} onPress={() => handleRegister()}>
				<Text style={styles.buttonText}>Register</Text>
			</TouchableOpacity>
		</ImageBackground>
	);
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { saveSession })(Register);

const styles = StyleSheet.create({
	background: {
		// backgroundColor: "#5a4b49",
		// height: 400,
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
	},
	text: {
		color: "white",
		fontSize: 40,
	},
});
