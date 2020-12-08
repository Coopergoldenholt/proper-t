import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import ProjectTable from "../components/Table";
import TextClick from "../components/TextClick";
import DeleteClick from "../components/DeleteButton";
import moment from "moment";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

const Projects = (props) => {
	const [projects, setProjects] = useState([]);
	console.log(projects);
	useEffect(() => {
		getProjects();
	}, []);

	const getProjects = () => {
		axios
			.get("http://localhost:4068/api/projects")

			.then((res) => setProjects(res.data));
	};

	const tableText = (text, id) => (
		<TextClick
			navigation={props.navigation}
			text={text}
			id={id}
			selection="project"
		/>
	);
	const deleteText = (id) => (
		<DeleteClick navigation={props.navigation} id={id} selection="project" />
	);
	const tableTextNoClick = (text, id) => (
		<TextClick navigation={props.navigation} text={text} id={id} />
	);

	const rowData = projects.map((ele) => {
		let completed = ele.completed ? "Completed" : "Incomplete";

		let date = moment(ele.date).format("MM/DD/YYYY");
		return props.user.user.user === "Admin"
			? [
					tableText(ele.name, ele.id),
					tableTextNoClick(date),
					// tableTextNoClick(completed),
					deleteText(ele.id),
			  ]
			: [
					tableText(ele.name, ele.project_id),
					tableTextNoClick(date),
					// tableTextNoClick(completed),
			  ];
	});

	let headerDate =
		props.user.user.user === "Admin"
			? ["Name", "Date", "Delete"]
			: ["Name", "Date"];

	return (
		<View>
			{props.user.user.user === "Admin" ? (
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => props.navigation.navigate("Create Project")}
					>
						<Text style={styles.buttonText}>Add a New Project</Text>
					</TouchableOpacity>
				</View>
			) : null}

			{projects ? (
				<View style={styles.userContainer}>
					<ProjectTable rowData={rowData} headerData={headerDate} />
				</View>
			) : null}
		</View>
	);
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withNavigation(Projects));

const styles = StyleSheet.create({
	background: {
		backgroundColor: "white",
		width: "100%",
		paddingTop: 20,
		alignItems: "center",
		justifyContent: "center",
		color: "black",
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
		marginBottom: 20,
	},
	buttonContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		marginLeft: 25,
		marginTop: 10,
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
		color: "black",
	},
	userContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		flexWrap: "wrap",
		padding: 10,
		// height: "70%",
	},
});
