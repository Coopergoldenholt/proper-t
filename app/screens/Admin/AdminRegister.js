import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Alert,
	TouchableOpacity,
	TextInput,
} from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";

function AdminRegister(props) {
	const [email, setEmail] = useState("");

	const [typeOfUser, setTypeOfUser] = useState("Admin");
	const [company, setCompany] = useState(null);
	const [managedCompanies, setManagedCompanies] = useState();

	useEffect(() => {
		getManagedCompanies();
	}, []);

	const handleRegister = () => {
		axios

			.post("http://localhost:4068/api/register", {
				email: email,

				typeOfUser: typeOfUser,
				managedCompany: company,
				companyId: props.user.user.companyId,
			})
			.then((res) =>
				Alert.alert(
					//title
					`User Added`,
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
			.catch((err) => {
				Alert.alert(err.response.data);
			});
	};
	const getManagedCompanies = () => {
		axios

			.get(`http://localhost:4068/api/companies/${props.user.user.companyId}`)
			.then((res) => {
				setManagedCompanies(res.data);
			});
	};
	const userPickerData = [
		{ label: "Admin", value: "admin" },
		{ label: "Employee", value: "employee" },
		{ label: "User", value: "user" },
	];

	const companyPickerData = managedCompanies
		? managedCompanies.map((ele) => {
				return { label: ele.company_name, value: ele.id };
		  })
		: null;
	return (
		<View style={styles.background}>
			{/* {getManagedCompanies()} */}
			<TextInput
				placeholder="E-mail"
				style={styles.input}
				placeholderTextColor="black"
				onChangeText={(email) => setEmail(email)}
			/>
			{/* <TextInput
				placeholder="Password"
				style={styles.input}
				placeholderTextColor="black"
				onChangeText={(password) => setPassword(password)}
			/> */}
			<Text>Select Type Of User:</Text>

			<DropDownPicker
				items={userPickerData}
				defaultNull
				placeholder="Select a Type of User"
				containerStyle={{ height: 40, width: 200, marginBottom: 10 }}
				onChangeItem={(item) => setTypeOfUser(item.value)}
				dropDownStyle={{ zIndex: 100 }}
			/>
			{/* <Picker
				selectedValue={typeOfUser}
				style={{ width: 200 }}
				// itemStyle={{ height: 44 }}
				onValueChange={(itemValue) => setTypeOfUser(itemValue)}
			>
				<Picker.Item label="Admin" value="admin" />
				<Picker.Item label="Employee" value="employee" />
				<Picker.Item label="User" value="user" />
			</Picker> */}
			{typeOfUser === "user" ? (
				managedCompanies ? (
					<>
						<Text>Select What Company:</Text>
						<DropDownPicker
							items={companyPickerData}
							defaultNull
							placeholder="Select a Company"
							containerStyle={{
								height: 40,
								width: 200,
								marginBottom: 10,
								zIndex: 1,
							}}
							onChangeItem={(item) => setCompany(item.value)}
						/>
					</>
				) : null
			) : null}

			{/* <Image source={{"https://static.thenounproject.com/png/1081856-200.png"}} /> */}

			<TouchableOpacity style={styles.button} onPress={() => handleRegister()}>
				<Text>Register</Text>
			</TouchableOpacity>
		</View>
	);
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withNavigation(AdminRegister));

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
		width: "50%",
		marginTop: 10,
		paddingTop: 10,
		backgroundColor: "#c48273",
		borderRadius: 5,
		alignItems: "center",
		padding: 10,
		color: "white",
	},
	input: {
		width: 200,
		height: 44,
		padding: 10,
		borderWidth: 0.5,
		borderColor: "black",
		marginBottom: 10,
		borderRadius: 5,
		backgroundColor: "white",
	},
	text: {
		color: "white",
		fontSize: 40,
	},
});
