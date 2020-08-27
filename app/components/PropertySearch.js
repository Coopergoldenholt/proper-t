import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const PropertySearch = (props) => {
	return (
		<TouchableOpacity
			style={styles.button}
			onPress={() => props.handleSelectedProperty(props.propertyName, props.id)}
		>
			<Text>{props.propertyName}</Text>
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
