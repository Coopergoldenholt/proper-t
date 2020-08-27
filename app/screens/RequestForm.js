import React, { useEffect, useState } from "react";
import {
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Text,
	Image,
	Alert,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import DropDownPicker from "react-native-dropdown-picker";
import PropertySearch from "../components/PropertySearch";

const RequestForm = (props) => {
	const [summary, setSummary] = useState("");
	const [title, setTitle] = useState("");
	const [imageOne, setImageOne] = useState(null);
	const [imageTwo, setImageTwo] = useState(null);
	const [imageThree, setImageThree] = useState(null);
	const [imageFour, setImageFour] = useState(null);
	const [properties, setProperties] = useState([]);
	const [propertySearch, setPropertySearch] = useState("");
	const [propertySelected, setPropertySelected] = useState(false);
	const [propertyId, setPropertyId] = useState(null);
	const [propertyInputClick, setPropertyInputClick] = useState(false);
	const [typeOfForm, setTypeOfForm] = useState(null);
	const [loading, setLoading] = useState(false);
	const [project, setProject] = useState(false);
	const [projects, setProjects] = useState([]);
	const [projectSearch, setProjectSearch] = useState("");
	const [projectSelected, setProjectSelected] = useState(false);
	const [projectId, setProjectId] = useState(null);
	const [projectInputClick, setProjectInputClick] = useState(false);

	useEffect(() => {
		getProperties();
	}, []);

	useEffect(() => {
		propertiesDisplay();
	}, [propertySearch]);

	let openImagePickerAsync = async () => {
		let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

		if (permissionResult.granted === false) {
			alert("Permission to access camera roll is required!");
			return;
		}

		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
			base64: true,
		});

		if (pickerResult.cancelled === true) {
			return;
		}
		if (!imageOne) {
			setImageOne(`data:image/jpg;base64,${pickerResult.base64}`);
		} else if (!imageTwo) {
			setImageTwo(`data:image/jpg;base64,${pickerResult.base64}`);
		} else if (!imageThree) {
			setImageThree(`data:image/jpg;base64,${pickerResult.base64}`);
		} else if (!imageFour) {
			setImageFour(`data:image/jpg;base64,${pickerResult.base64}`);
		}
	};
	let getProperties;
	switch (props.user.user.user) {
		case "Admin":
			getProperties = () => {
				axios
					// .get("http://64.227.51.108:4068/api/company/properties")
					.get("http://localhost:4068/api/company/properties")
					.then((res) => setProperties(res.data));
			};
			break;

		case "employee":
			getProperties = () => {
				axios
					// .get("http://64.227.51.108:4068/api/company/properties")
					.get("http://localhost:4068/api/company/properties")
					.then((res) => setProperties(res.data));
			};
			break;

		default:
			getProperties = () => {
				axios
					// .get("http://64.227.51.108:4068/api/user/properties")
					.get("http://localhost:4068/api/user/properties")
					.then((res) => setProperties(res.data));
			};
	}

	const handleSubmit = () => {
		if (!title) {
			Alert.alert("Please fill out a Title");
		} else if (!summary) {
			Alert.alert("Please fill out a Summary");
		} else if (!propertySelected) {
			Alert.alert("Please select a Property from the list");
		} else if (title.length > 20) {
			Alert.alert("Title cannot be longer then 20 characters");
		} else if (summary.length > 200) {
			Alert.alert("Summary cannot be longer then 200 characters");
		}
		// else if (!typeOfForm) {
		// 	Alert.alert("Please select a Type of Form");
		// }
		else {
			setLoading(true);
			axios
				// .post("http://64.227.51.108:4068/api/company/photo", {
				// 	imageOne: imageOne,
				// 	imageTwo: imageTwo,
				// 	imageThree: imageThree,
				// 	imageFour: imageFour,
				// 	title: title,
				// 	summary: summary,
				// 	propertyId: propertyId,
				// 	projectId: projectId,
				// })
				.post("http://localhost:4068/api/company/photo", {
					imageOne: imageOne,
					imageTwo: imageTwo,
					imageThree: imageThree,
					imageFour: imageFour,
					title: title,
					summary: summary,
					propertyId: propertyId,
					projectId: projectId,
				})
				.then((res) => {
					setLoading(false);
					Alert.alert(
						//title
						"Form Submitted",
						//body
						"You will be sent back to the Dashboard",
						[
							{
								text: "Sounds Good",
								onPress: () => props.navigation.popToTop(),
							},
						],
						{ cancelable: false }
						//clicking out side of alert will not cancel
					);
				});
		}
	};

	const displayImageOne = () => {
		if (imageOne !== null) {
			return (
				// <View style={styles.container}>
				<Image source={{ uri: imageOne }} style={styles.thumbnail} />
				// </View>
			);
		}
	};
	const displayImageTwo = () => {
		if (imageTwo !== null) {
			return (
				// <View style={styles.container}>
				<Image source={{ uri: imageTwo }} style={styles.thumbnail} />
				// </View>
			);
		}
	};
	const displayImageThree = () => {
		if (imageThree !== null) {
			return (
				// <View style={styles.container}>
				<Image source={{ uri: imageThree }} style={styles.thumbnail} />
				// </View>
			);
		}
	};
	const displayImageFour = () => {
		if (imageFour !== null) {
			return (
				// <View style={styles.container}>
				<Image source={{ uri: imageFour }} style={styles.thumbnail} />
				// </View>
			);
		}
	};

	const propertiesDisplay = () => {
		let filteredProperties = properties.filter((ele) =>
			ele.name.toLowerCase().includes(propertySearch.toLowerCase())
		);

		filteredProperties.length > 5
			? (filteredProperties = filteredProperties.splice(0, 5))
			: null;
		return filteredProperties.map((ele, key) => (
			<PropertySearch
				propertyName={ele.name}
				id={ele.property_id}
				key={key}
				handleSelectedProperty={(name, id) => handleSelectedProperty(name, id)}
			/>
		));
	};

	const handlePropertySearch = (property) => {
		setPropertySelected(false);
		setPropertySearch(property);
	};

	const handleSelectedProperty = (name, id) => {
		setPropertySearch(name);
		setPropertySelected(true);
		setPropertyId(id);
		// setPropertyInputClick(false);
	};

	useEffect(() => {
		projectsDisplay();
	}, [projectSearch]);

	useEffect(() => {
		handleProjectGet();
	}, [projectInputClick]);

	const projectsDisplay = () => {
		let filteredProjects = projects.filter((ele) =>
			ele.name.toLowerCase().includes(projectSearch.toLowerCase())
		);

		filteredProjects.length > 5
			? (filteredProjects = filteredProjects.splice(0, 5))
			: null;
		return filteredProjects.map((ele, key) => {
			console.log(id);
			let id;
			props.user.user.user === "Admin" ? (id = ele.id) : (id = ele.project_id);
			return (
				<PropertySearch
					propertyName={ele.name}
					id={id}
					key={key}
					handleSelectedProperty={(name, id) => handleSelectedProject(name, id)}
				/>
			);
		});
	};

	const handleProjectSearch = (project) => {
		setProjectSelected(false);
		setProjectSearch(project);
	};

	const handleProjectGet = () => {
		axios
			.get("http://localhost:4068/api/projects")
			.then((res) => setProjects(res.data));
	};

	const handleSelectedProject = (name, id) => {
		setProjectSearch(name);
		setProjectSelected(true);
		setProjectId(id);
		// setPropertyInputClick(false);
	};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.background}>
				<TextInput
					style={styles.input}
					placeholder="Title"
					onChangeText={(title) => setTitle(title)}
				/>
				<TextInput
					style={styles.inputSummary}
					placeholder="Summary"
					onChangeText={(summary) => setSummary(summary)}
					multiline={true}
				/>

				<TextInput
					style={styles.propertyInput}
					placeholder="Property"
					onFocus={() => setPropertyInputClick(true)}
					// onBlur={() => setPropertyInputClick(false)}
					onChangeText={(property) => handlePropertySearch(property)}
					value={propertySearch}
				/>
				{propertyInputClick
					? propertySelected
						? null
						: propertiesDisplay()
					: null}
				<DropDownPicker
					items={[
						{ label: "Yes", value: true },
						{ label: "No", value: false },
					]}
					defaultNull
					placeholder="Is this for a project?"
					containerStyle={{
						height: 40,
						width: 200,
						marginBottom: 10,
						marginTop: 10,
					}}
					onChangeItem={(item) => setProject(item.value)}
				/>
				{project ? (
					<>
						<TextInput
							style={styles.propertyInput}
							placeholder="Project"
							onFocus={() => setProjectInputClick(true)}
							// onBlur={() => setPropertyInputClick(false)}
							onChangeText={(project) => handleProjectSearch(project)}
							value={projectSearch}
						/>
						{projectInputClick
							? projectSelected
								? null
								: projectsDisplay()
							: null}
					</>
				) : null}

				<TouchableOpacity
					style={styles.button}
					onPress={loading ? null : () => handleSubmit()}
				>
					<Text style={styles.buttonText}>Submit</Text>
				</TouchableOpacity>
				{loading ? (
					<View style={styles.loadingIcon}>
						<ActivityIndicator size="large" color="#c48273" />
					</View>
				) : null}

				<View style={styles.imageContainer}>
					{displayImageOne()}
					{displayImageTwo()}
					{displayImageThree()}
					{displayImageFour()}
				</View>
				{imageFour ? null : (
					<TouchableOpacity onPress={openImagePickerAsync}>
						<Image
							style={styles.image}
							source={require("../assets/add-photo-icon.png")}
						/>
					</TouchableOpacity>
				)}
			</View>
		</ScrollView>
	);
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withNavigation(RequestForm));

const styles = StyleSheet.create({
	background: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 100,
	},
	button: {
		marginTop: 10,
		paddingTop: 10,
		backgroundColor: "#c48273",
		borderRadius: 5,
		alignItems: "center",
		padding: 10,
		marginBottom: 10,
	},
	buttonContainer: {
		height: "70%",
		display: "flex",
		justifyContent: "flex-end",
		width: "50%",
	},
	buttonText: {
		color: "white",
	},
	container: {
		flex: 1,
	},
	image: {
		height: 200,
		width: 175,
	},
	imageContainer: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		flexWrap: "wrap",
		justifyContent: "center",
		marginBottom: 10,
	},
	loadingIcon: {
		position: "absolute",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 100,
	},
	logo: {
		width: 305,
		height: 159,
		marginBottom: 20,
	},
	input: {
		width: 200,
		height: 44,
		padding: 10,
		borderWidth: 1,
		borderColor: "black",
		marginBottom: 10,
		borderRadius: 5,
		backgroundColor: "white",
	},
	inputSummary: {
		width: 200,
		height: 80,
		padding: 10,
		borderWidth: 1,
		borderColor: "black",
		marginBottom: 10,
		borderRadius: 5,
		backgroundColor: "white",
	},
	instructions: {
		color: "#888",
		fontSize: 18,
		marginHorizontal: 15,
		marginBottom: 10,
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

	thumbnail: {
		width: 200,
		height: 175,
		margin: 2,
	},
});
