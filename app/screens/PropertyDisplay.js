import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	FlatList,
	View,
	Text,
	Image,
	ActivityIndicator,
	SafeAreaView,
} from "react-native";
import moment from "moment";
import axios from "axios";

const PropertyDisplay = (props) => {
	const [postList, setPostList] = useState([]);
	const [page, setPage] = useState(0);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		getProperty();
	}, []);

	const getProperty = async () => {
		setLoading(true);
		await axios
			.get(
				`http://64.227.51.108:4068/api/company/property/${props.route.params.id}?page=${page}`
			)
			// .get(
			// 	`http://localhost:4068/api/company/property/${props.route.params.id}?page=${page}`
			// )
			.then((res) => {
				setPostList(res.data);
				setLoading(false);
			});
	};

	const handleLoadMore = async () => {
		setPage(page + 15);
		await axios
			.get(
				`http://64.227.51.108:4068/api/company/property/${props.route.params.id}?page=${page}`
				// `http://localhost:4068/api/company/property/${props.route.params.id}?page=${page}`
			)
			.then((res) => {
				setPostList(res.data);
			});
	};

	const renderRow = ({ item }) => {
		let date = moment(item.date).format("MM/DD/YYYY");
		return (
			<View style={styles.item}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.itemText}>{item.name}</Text>
				<Text style={styles.itemText}>{date}</Text>
				<Text style={styles.summary}>{item.summary}</Text>
				{/* <Text style={styles.itemText}>{item.type_of_form}</Text> */}
				{/* <Text style={styles.itemText}>
					{item.completed ? "Comleted" : "Incomplete"}
				</Text> */}

				<View style={styles.imageContainer}>
					{item.image_one ? (
						<Image source={{ uri: item.image_one }} style={styles.itemImage} />
					) : null}
					{item.image_two ? (
						<Image source={{ uri: item.image_two }} style={styles.itemImage} />
					) : null}
					{item.image_three ? (
						<Image
							source={{ uri: item.image_three }}
							style={styles.itemImage}
						/>
					) : null}
					{item.image_four ? (
						<Image source={{ uri: item.image_four }} style={styles.itemImage} />
					) : null}
				</View>
			</View>
		);
	};

	return isLoading ? (
		<View style={styles.containerLoading}>
			<ActivityIndicator size="large" color="#c48273" />
		</View>
	) : (
		<SafeAreaView style={styles.safeContainer}>
			{postList[0] ? (
				<FlatList
					style={styles.container}
					data={postList}
					renderItem={renderRow}
					keyExtractor={(item, index) => index.toString()}
					onEndReached={() => handleLoadMore()}
				/>
			) : (
				<View style={styles.noPostsContainer}>
					<Text style={styles.noPosts}>No Posts to display</Text>
				</View>
			)}
		</SafeAreaView>
	);
};

export default PropertyDisplay;

const styles = StyleSheet.create({
	safeContainer: {
		height: "100%",
	},
	container: {
		marginTop: 10,
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
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
		marginBottom: 10,
	},
	itemImage: {
		width: 180,
		height: 200,
		// resizeMode: "cover",
		margin: 2,
	},
	itemText: {
		paddingTop: 3,
		paddingLeft: 10,
		fontSize: 12,
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
	},
});
