import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const EditButton = (props) => {
	return (
		<TouchableOpacity onPress={() => Alert.alert(`This is user ${props.id}`)}>
			<View style={styles.button}>
				<Text style={styles.buttonText}>Edit</Text>
			</View>
		</TouchableOpacity>
	);
};

export default EditButton;

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
	buttonText: { textAlign: "center" },
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
