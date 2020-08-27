import React, { useEffect, useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Alert,
	ScrollView,
} from "react-native";
import axios from "axios";
import UserTable from "../../components/Table";
import DeleteButton from "../../components/DeleteButton";
import EditButton from "../../components/EditButton";
import TextClick from "../../components/TextClick";

const AdminUsers = ({ navigation }) => {
	const [users, setUsers] = useState([]);
	const [employees, setEmployees] = useState([]);
	useEffect(() => {
		axios
			.get("http://64.227.51.108:4068/api/company/users")
			// .get("http://localhost:4068/api/company/users")
			.then((res) => {
				setUsers(res.data);
			});
		axios
			.get("http://64.227.51.108:4068/api/company/employees")
			// .get("http://localhost:4068/api/company/employees")
			.then((res) => {
				setEmployees(res.data);
			});
	}, []);

	const deleteButton = (id) => (
		<DeleteButton navigation={navigation} selection="user" id={id} />
	);
	const editButton = (id) => <EditButton style={styles.tableText} id={id} />;

	const tableText = (text, id) => (
		<TextClick selection="user" text={text} id={id} />
	);

	const userRowData = users.map((ele, index) => {
		return [
			tableText(ele.name, ele.id),
			tableText(ele.email, ele.id),
			tableText(ele.managed_company_name, ele.id),
			deleteButton(ele.id),
		];
	});

	const userHeaderData = ["Name", "Email", "Company", "Delete"];

	const employeeRowData = employees.map((ele, index) => [
		tableText(ele.name, ele.id),
		tableText(ele.email, ele.id),
		deleteButton(ele.id),
	]);

	const employeeHeaderData = ["Name", "Email", "Delete"];

	return (
		<ScrollView style={styles.container}>
			<View style={styles.background}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate("Register")}
				>
					<Text style={styles.buttonText}>Register a New User</Text>
				</TouchableOpacity>
				<Text>Users</Text>
				<View style={styles.userContainer}>
					<UserTable rowData={userRowData} headerData={userHeaderData} />
				</View>
				<Text>Employees</Text>
				<View style={styles.userContainer}>
					<UserTable
						rowData={employeeRowData}
						headerData={employeeHeaderData}
					/>
				</View>
			</View>
		</ScrollView>
	);
};

export default AdminUsers;

const styles = StyleSheet.create({
	background: {
		backgroundColor: "white",
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

	button: {
		width: "40%",
		marginTop: 10,
		paddingTop: 10,
		backgroundColor: "#c48273",
		borderRadius: 5,
		alignItems: "center",
		padding: 10,
		alignSelf: "flex-start",
		marginLeft: 25,
		marginBottom: 20,
	},
	buttonText: { textAlign: "center", color: "white" },
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	input: {
		width: 200,
		height: 44,
		padding: 10,
		borderWidth: 1,
		borderColor: "black",
		marginBottom: 10,
	},
	tableText: {
		margin: 10,
		padding: 10,
	},
	text: {
		color: "white",
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
