import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	ActivityIndicator,
	ImageBackground,
	Alert,
	TouchableOpacity,
	TextInput,
} from "react-native";
import axios from "axios";
import { connect } from "react-redux";
import { saveSession } from "../../../ducks/reducers/userReducer";

function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const handleLogin = async () => {
		if (!email) {
			Alert.alert("Please Fill In Your Email");
		} else if (!password) {
			Alert.alert("Please Fill In Your Password");
		} else {
			setLoading(true);
			axios
				// .post("http://64.227.51.108:4068/api/login", {
				// 	email: email,
				// 	password: password,
				// })
				.post("http://localhost:4068/api/login", {
					email: email,
					password: password,
				})
				.then((res) => {
					setLoading(false);
					props.saveSession(
						res.data.companyId,
						res.data.email,
						res.data.id,
						res.data.loggedIn,
						res.data.user
					);
				})
				.catch((err) => {
					Alert.alert("Email or Password are incorrect");
					setLoading(false);
				});
		}
	};

	return (
		<ImageBackground
			source={require("../../assets/home-background.jpg")}
			style={styles.background}
		>
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

			<TouchableOpacity
				style={styles.button}
				onPress={loading ? null : () => handleLogin()}
			>
				<Text style={styles.buttonText}>Login</Text>
			</TouchableOpacity>
			{loading ? <ActivityIndicator size="large" color="#c48273" /> : null}
		</ImageBackground>
	);
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps, { saveSession })(Login);

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
