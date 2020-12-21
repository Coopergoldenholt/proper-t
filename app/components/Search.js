import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";

const Search = () => {
	const [search, setSearch] = useState("");
	return (
		<TextInput
			placeholder="Search..."
			style={styles.input}
			placeholderTextColor="black"
			onChangeText={(search) => setSearch(setSearch)}
		/>
	);
};

export default Search;

const styles = StyleSheet.create({
	input: {
		width: 200,
		height: 44,
		padding: 10,
		borderWidth: 1,
		borderColor: "black",
		marginBottom: 10,
		color: "black",
	},
});
