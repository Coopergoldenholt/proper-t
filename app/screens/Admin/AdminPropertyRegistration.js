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
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import { withNavigation } from "react-navigation";

const AdminPropertyRegistration = (props) => {
	const [name, setName] = useState("");
	const [company, setCompany] = useState(null);
	const [managedCompanies, setManagedCompanies] = useState();

	useEffect(() => {
		getManagedCompanies();
	}, []);

	const handleRegister = () => {
		company
			? axios
					// .post("http://64.227.51.108:4068/api/company/properties", {
					// 	name: name,
					// 	managedCompany: company,
					// 	companyId: props.user.user.companyId,
					// })
					.post("http://localhost:4068/api/company/properties", {
						name: name,
						managedCompany: company,
						companyId: props.user.user.companyId,
					})
					.then((res) =>
						Alert.alert(
							//title
							"Property Added",
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
					.catch((err) => Alert.alert("Property Could Not be Added"))
			: Alert.alert("Please Select A Company");
	};
	const getManagedCompanies = () => {
		axios
			// .get(
			// 	`http://64.227.51.108:4068/api/companies/${props.user.user.companyId}`
			// )
			.get(`http://localhost:4068/api/companies/${props.user.user.companyId}`)
			.then((res) => {
				setManagedCompanies(res.data);
			});
	};

	const PickerData = managedCompanies
		? managedCompanies.map((ele) => {
				return { label: ele.company_name, value: ele.id };
		  })
		: null;
	
	return (
		<View style={styles.background}>
			{/* {getManagedCompanies()} */}
			<TextInput
				placeholder="Property Name"
				style={styles.input}
				placeholderTextColor="black"
				onChangeText={(name) => setName(name)}
			/>

			{managedCompanies ? (
				<>
					<DropDownPicker
						items={PickerData}
						defaultNull
						placeholder="Select a Company"
						containerStyle={{ height: 40, width: 200, marginBottom: 10 }}
						onChangeItem={(item) => setCompany(item.value)}
					/>
				</>
			) : null}

			<TouchableOpacity style={styles.button} onPress={() => handleRegister()}>
				<Text>Register</Text>
			</TouchableOpacity>
		</View>
	);
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(
	withNavigation(AdminPropertyRegistration)
);

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
