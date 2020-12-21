import React from "react";
import { Text, StyleSheet } from "react-native";

const TextClick = (props) => {
	const handleClick = () => {
		switch (props.selection) {
			case "project":
				props.navigation.navigate("Project", {
					id: props.id,
					name: props.text,
				});
				break;
			case "user":
				props.navigation.navigate("Property", { id: props.id });
				break;
			default:
				null;
		}
	};

	return (
		<>
			<Text style={styles.tableText} onPress={() => handleClick()}>
				{props.text}
			</Text>
		</>
	);
};
export default TextClick;

const styles = StyleSheet.create({
	background: {
		// height: 400,
		width: "100%",
		paddingTop: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	btn: {
		width: "50%",
		height: 18,
		marginLeft: 15,
		backgroundColor: "#c8e1ff",
		borderRadius: 2,
		justifyContent: "center",
	},
	btnText: { textAlign: "center" },
	button: {
		width: "20%",
		marginTop: 10,
		paddingTop: 10,
		backgroundColor: "#d6b512",
		borderRadius: 5,
		alignItems: "center",
		padding: 10,
		alignSelf: "flex-end",
		marginRight: 50,
	},
	input: {
		width: 200,
		height: 44,
		padding: 10,
		borderWidth: 1,
		borderColor: "black",
		marginBottom: 10,
		color: "black",
	},
	tableText: {
		margin: 5,
		padding: 5,
	},
	text: {
		color: "black",
		fontSize: 40,
	},
	userContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		flexWrap: "wrap",
		padding: 10,
		// height: "70%",
	},
});
