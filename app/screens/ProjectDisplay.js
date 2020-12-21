import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	SafeAreaView,
	FlatList,
	Image,
} from "react-native";
import axios from "axios";
import moment from "moment";
import UserDisplay from "../components/ProjectUsersDisplay";

const ProjectDisplay = (props) => {
	const [users, setUsers] = useState([]);
	const [projects, setProjects] = useState([]);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		getProject();
	}, []);

	const getProject = () => {
		setLoading(true);
		axios
			.get(
				`http://142.93.92.22:4135/api/project/users/${props.route.params.id}`
			)

			.then((res) => setUsers(res.data));
		axios
			.get(
				`http://142.93.92.22:4135/api/project/forms/${props.route.params.id}`
			)

			// .get(
			// 	`http://localhost:4068/api/company/property/${props.route.params.id}?page=${page}`
			// )
			.then((res) => {
				setProjects(res.data);
				setLoading(false);
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
			<UserDisplay users={users} projectId={props.route.params.id} />
			{projects[0] ? (
				<FlatList
					style={styles.container}
					data={projects}
					renderItem={renderRow}
					keyExtractor={(item, index) => index.toString()}
					// onEndReached={() => handleLoadMore()}
				/>
			) : (
				<View style={styles.noPostsContainer}>
					<Text style={styles.noPosts}>No Posts to display</Text>
				</View>
			)}
		</SafeAreaView>
	);
};

export default ProjectDisplay;

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
