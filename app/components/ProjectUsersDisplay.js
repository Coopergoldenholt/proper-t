import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	TouchableOpacity,
	TextInput,
	Alert,
} from "react-native";
import { connect } from "react-redux";
import Axios from "axios";
import UserSearch from "./UserSearch";

const ProjectUsersDisplay = (props) => {
	const [users, setUsers] = useState([]);
	const [userSearch, setUserSearch] = useState("");
	const [userSelected, setUserSelected] = useState(false);
	const [userId, setUserId] = useState();
	const [userInputClick, setUserInputClick] = useState(false);

	const userDisplay = props.users.map((ele, index) => {
		return (
			<View key={index}>
				<View style={styles.circle}>
					<Text>{ele.name}</Text>
				</View>
			</View>
		);
	});

	const hanldeAddUserPress = () => {
		Axios.get("http://localhost:4068/api/company/users").then((res) =>
			setUsers(res.data)
		);
	};

	const userSearchDisplay = () => {
		let firstFilter = users.filter((ele) => ele.name);
		console.log(firstFilter);
		let filteredUsers = firstFilter.filter((ele) => {
			return ele.name.toLowerCase().includes(userSearch.toLowerCase());
		});
		console.log(filteredUsers);
		filteredUsers.length > 5
			? (filteredUsers = filteredUsers.splice(0, 5))
			: null;

		return filteredUsers.map((ele, indx) => (
			<UserSearch
				handleSelectedUser={handleSelectedUser}
				key={indx}
				id={ele.id}
				name={ele.name}
			/>
		));
	};

	const handleUserSearch = (user) => {
		setUserSelected(false);
		setUserSearch(user);
	};
	const handleSelectedUser = (name, id) => {
		setUserSearch(name);
		setUserSelected(true);
		setUserId(id);
	};

	const handleAddPress = () => {
		userId
			? // Axios.post("http://localhost:4068/api/project/user", {
			  // 		userId: userId,
			  // 		projectId: props.projectId,
			  //   })
			  Axios.post("http://64.227.51.108:4068/api/project/user", {
					userId: userId,
					projectId: props.projectId,
			  })
					.then((res) => Alert.alert("User has been added to the project"))
					.catch((err) => Alert.alert(err.response.data))
			: Alert.alert("Please Select a User from the Dropdown");
	};

	return (
		<View>
			<ScrollView style={styles.container} horizontal={true}>
				{userDisplay}
				{props.user.user.user === "Admin" ? (
					<TouchableOpacity
						onPress={() => hanldeAddUserPress()}
						style={styles.circle}
					>
						<Image
							style={styles.image}
							source={require("../assets/plus-icon.png")}
						/>
					</TouchableOpacity>
				) : null}
			</ScrollView>

			{users[0] ? (
				<View style={styles.searchContainer}>
					<View style={styles.searchSection}>
						<TextInput
							style={styles.propertyInput}
							placeholder="Search For a User"
							onFocus={() => setUserInputClick(true)}
							onChangeText={(user) => handleUserSearch(user)}
							value={userSearch}
						/>
						<TouchableOpacity
							style={styles.searchIcon}
							onPress={() => handleAddPress()}
						>
							<Image
								style={styles.searchIcon}
								source={require("../assets/plus-icon.png")}
							/>
						</TouchableOpacity>
					</View>
					{userSearchDisplay()}
				</View>
			) : null}
		</View>
	);
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(ProjectUsersDisplay);

const styles = StyleSheet.create({
	container: {},
	circle: {
		margin: 10,
		borderRadius: 40,
		width: 80,
		height: 80,
		borderWidth: 2,
		borderColor: "black",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontWeight: "500",
	},
	image: {
		height: "75%",
		width: "75%",
	},

	propertyInput: {
		width: 200,
		height: 44,
		padding: 10,

		borderWidth: 1,
		borderColor: "black",

		borderRadius: 5,
		backgroundColor: "white",
	},
	searchContainer: {
		alignItems: "center",
	},
	searchSection: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	searchIcon: {
		padding: 10,
		height: 10,
		width: 10,
		position: "absolute",
		right: 10,
	},
});
