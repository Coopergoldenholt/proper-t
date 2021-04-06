import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	SafeAreaView,
	RefreshControl,
	ActivityIndicator,
} from "react-native";
import ListDisplay from "../components/ListDisplay";
import { connect } from "react-redux";
import axios from "axios";

import { URL } from "../../config";

const wait = (timeout) => {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
};

const Dashboard = (props) => {
	const [postList, setPostList] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [page, setPage] = useState(0);
	const [refreshing, setRefreshing] = useState(false);
	const [firstTimeLoading, setFirstTimeLoading] = useState(true);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setPage(0);
		getProperties(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	// console.log(props.user);
	useEffect(() => {
		getProperties();
	}, []);

	const getProperties = async () => {
		setLoading(true);
		setFirstTimeLoading(false);
		// switch (props.user.user) {
		// 	case "Admin":
		await axios.get(`${URL}/api/company/forms?page=${page}`).then((res) => {
			setPostList(res.data);
			setLoading(false);
		});
		// }
	};

	const handleLoadMore = async () => {
		let pages = page + 15;

		await axios.get(`${URL}/api/company/forms?page=${pages}`).then((res) => {
			setPostList([...postList, ...res.data]);
			setPage(page + 15);
		});
	};

	const renderRow = ({ item }) => {
		return <ListDisplay item={item} />;
	};

	return isLoading && firstTimeLoading ? (
		<View style={styles.containerLoading}>
			<ActivityIndicator size="large" color="#c48273" />
		</View>
	) : (
		<SafeAreaView style={styles.safeContainer}>
			{postList[0] ? (
				<FlatList
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
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

const mapStateToProps = (state) => state.user;

export default connect(mapStateToProps)(Dashboard);

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
