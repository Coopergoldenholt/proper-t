import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const PropertySearch = (props) => {
	return (
		<TouchableOpacity
			key={props.indx}
			style={styles.button}
			onPress={() => props.handleSelectedUser(props.name, props.id)}
		>
			<Text>{props.name}</Text>
		</TouchableOpacity>
	);
};

export default PropertySearch;

const styles = StyleSheet.create({
	button: {
		borderColor: "black",
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		width: 200,
		padding: 10,
		borderRadius: 2,
	},
});
