import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import moment from "moment";

const ListDisplay = (props) => {
	const item = props.item;

	let date = moment(item.date).format("MMMM Do YYYY, h:mm a");
	return (
		<View style={styles.item}>
			<Text style={styles.title}>{item.property_name}</Text>
			<Text style={styles.itemText}>{item.type_of_work}</Text>
			<Text style={styles.itemText}>{item.name}</Text>
			<Text style={styles.itemText}>{date}</Text>

			<Text style={styles.beforeAfterText}>Before:</Text>

			<View style={styles.imageContainer}>
				{item.image_one ? (
					<Image source={{ uri: item.image_one }} style={styles.itemImage} />
				) : null}
				{item.image_two ? (
					<Image source={{ uri: item.image_two }} style={styles.itemImage} />
				) : null}
				{item.image_three ? (
					<Image source={{ uri: item.image_three }} style={styles.itemImage} />
				) : null}
				{item.image_four ? (
					<Image source={{ uri: item.image_four }} style={styles.itemImage} />
				) : null}
			</View>
			<Text style={styles.beforeAfterText}>After:</Text>
			<View style={styles.imageContainer}>
				<Image source={{ uri: item.image_five }} style={styles.itemImage} />

				<Image source={{ uri: item.image_six }} style={styles.itemImage} />

				<Image source={{ uri: item.image_seven }} style={styles.itemImage} />

				<Image source={{ uri: item.image_eight }} style={styles.itemImage} />
			</View>
		</View>
	);
};

export default ListDisplay;

const styles = StyleSheet.create({
	safeContainer: {
		height: "100%",
	},
	container: {
		// marginTop: 10,
	},
	containerLoading: {
		flex: 1,
		justifyContent: "center",
	},
	horizontal: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 10,
	},
	item: {
		// borderBottomColor: "#ccc",
		// borderTopColor: "#ccc",
		// borderTopWidth: 0.5,
		// borderBottomWidth: 1,
		marginBottom: 10,
		backgroundColor: "white",
		marginBottom: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 2,
		elevation: 1,
	},
	itemImage: {
		width: 180,
		height: 200,
		// resizeMode: "cover",
		margin: 2,
		marginLeft: 10,
	},
	itemText: {
		paddingTop: 3,
		paddingLeft: 10,
		fontSize: 18,
	},
	beforeAfterText: {
		paddingTop: 3,
		paddingLeft: 10,
		fontSize: 18,
		marginBottom: 10,
	},
	imageContainer: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		flexWrap: "wrap",
		justifyContent: "center",
		marginBottom: 10,
	},
	imageText: {
		fontSize: 16,
		padding: 5,
	},
	noPosts: {
		justifyContent: "center",
		fontSize: 25,
	},
	noPostsContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	summary: {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 10,
	},
	title: {
		paddingTop: 5,
		paddingLeft: 12,
		fontSize: 25,
		fontWeight: "bold",
	},
});
