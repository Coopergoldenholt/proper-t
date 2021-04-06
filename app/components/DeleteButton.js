import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Axios from "axios";
import { URL } from "../../config";

const DeleteButton = (props) => {
	const handleDelete = () => {
		switch (props.selection) {
			case "user":
				Alert.alert(
					//title
					`Delete User?`,
					//body
					"Are you sure you want to delete this user?",
					[
						{
							text: "Cancel",
							// onPress: () => props.navigation.popToTop(),
						},
						{
							text: "Yes",
							onPress: () =>
								Axios.put(`${URL}/api/user/delete/${props.id}`).then((res) =>
									Alert.alert(
										//title
										`User Deleted`,
										//body
										"You will be redirected to the Dashboard",
										[
											{
												text: "Yes",
												onPress: () => props.navigation.navigate("Dashboard"),
											},
										],
										{ cancelable: false }
									)
								),
						},
					],
					{ cancelable: false }
				);
				break;
			case "property":
				Alert.alert(
					//title
					`Delete Property?`,
					//body
					"If you delete this property it will also delete all forms attached to it.",
					[
						{
							text: "Cancel",
							// onPress: () => props.navigation.popToTop(),
						},
						{
							text: "Yes",
							onPress: () =>
								Axios.put(
									`${URL}/api/company/property/delete/${props.id}`
								).then((res) =>
									Alert.alert(
										//title
										`Property Deleted`,
										//body
										"You will be redirected to the Dashboard",
										[
											{
												text: "Yes",
												onPress: () => props.navigation.navigate("Dashboard"),
											},
										],
										{ cancelable: false }
									)
								),
						},
					],
					{ cancelable: false }
				);
				break;
			case "project":
				Alert.alert(
					//title
					`Delete Project?`,
					//body
					"If you delete this project you will delete all forms attached to it.",
					[
						{
							text: "Cancel",
							// onPress: () => props.navigation.popToTop(),
						},
						{
							text: "Yes",
							onPress: () =>
								Axios.put(`${URL}/api/project/delete/${props.id}`).then((res) =>
									Alert.alert(
										//title
										`Property Deleted`,
										//body
										"You will be redirected to the Dashboard",
										[
											{
												text: "Yes",
												onPress: () => props.navigation.navigate("Dashboard"),
											},
										],
										{ cancelable: false }
									)
								),
						},
					],
					{ cancelable: false }
				);
				break;
			default:
				null;
		}
	};
	return (
		<TouchableOpacity onPress={() => handleDelete()}>
			<View style={styles.button}>
				<Text style={styles.buttonText}>Delete</Text>
			</View>
		</TouchableOpacity>
	);
};

export default DeleteButton;

const styles = StyleSheet.create({
	background: {
		// height: 400,
		width: "100%",
		paddingTop: 20,
		alignItems: "center",
		justifyContent: "center",
	},

	button: {
		width: "75%",
		backgroundColor: "#bec6ba",
		borderRadius: 5,
		alignItems: "center",
		padding: 4,
		alignSelf: "center",
	},
	buttonText: { textAlign: "center", color: "black" },
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
	userContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		flexWrap: "wrap",
		// height: "70%",
	},
});
