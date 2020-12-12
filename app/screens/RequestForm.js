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
// import * as ImagePicker from "expo-image-picker";
import ImagePicker from "react-native-image-picker";
import axios from "axios";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import DropDownPicker from "react-native-dropdown-picker";
import PropertySearch from "../components/PropertySearch";
import Icon from "react-native-vector-icons/Feather";

const RequestForm = (props) => {
	const [beforeImages, setBeforeImages] = useState([]);
	const [afterImages, setAfterImages] = useState([]);

	const [imageOne, setImageOne] = useState(null);
	const [imageTwo, setImageTwo] = useState(null);
	const [imageThree, setImageThree] = useState(null);
	const [imageFour, setImageFour] = useState(null);
	const [properties, setProperties] = useState([]);
	const [propertySearch, setPropertySearch] = useState("");
	const [propertySelected, setPropertySelected] = useState(false);
	const [propertyId, setPropertyId] = useState(null);
	const [propertyInputClick, setPropertyInputClick] = useState(false);
	const [loading, setLoading] = useState(false);
	const [project, setProject] = useState(false);

	useEffect(() => {
		getProperties();
	}, []);

	useEffect(() => {
		propertiesDisplay();
	}, [propertySearch]);

	let openImagePickerAsync = async (type) => {
		// let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

		// if (permissionResult.granted === false) {
		// 	alert("Permission to access camera roll is required!");
		// 	return;
		// }

		// let pickerResult = await ImagePicker.launchImageLibrary({
		// 	allowsEditing: true,
		// 	aspect: [4, 3],
		// 	base64: true,
		// });

		// if (pickerResult.cancelled === true) {
		// 	return;
		// }

		var options = {
			title: "Select Image",
			customButtons: [
				{
					name: "customOptionKey",
					title: "Choose Photo from Custom Option",
				},
			],
			storageOptions: {
				skipBackup: true,
				path: "images",
			},
		};
		let image = await ImagePicker.showImagePicker(options, (response) => {
			// console.log("Response = ", response);
			if (response.didCancel) {
				console.log("User cancelled image picker");
			} else if (response.error) {
				console.log("ImagePicker Error: ", response.error);
			} else if (response.customButton) {
				console.log("User tapped custom button: ", response.customButton);
				// alert(response.customButton);
			} else {
				// console.log(response);

				setBeforeImages([`data:image/jpg;base64,${response.data}`]);
				return response;
			}
		});

		switch (type) {
			case "beforeImage":
				setBeforeImages([
					...beforeImages,
					`data:image/jpg;base64,${image.data}`,
				]);
			case "afterImage":
				setAfterImages([
					...afterImages,
					`data:image/jpg;base64,${pickerResult.base64}`,
				]);
		}
	};
	console.log(beforeImages.length);

	let getProperties;
	switch (props.user.user.user) {
		case "Admin":
			getProperties = () => {
				axios
					.get("http://localhost:4068/api/company/properties")
					.then((res) => setProperties(res.data));
			};
			break;

		case "employee":
			getProperties = () => {
				axios
					.get("http://localhost:4068/api/company/properties")
					.then((res) => setProperties(res.data));
			};
			break;

		default:
			getProperties = () => {
				axios

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

	const displayImage = (imageType) => {
		if (imageType === "beforeImages") {
			return beforeImages.map((ele) => (
				<Image source={{ uri: ele }} style={styles.thumbnail} />
			));
		} else {
			return afterImages.map((ele) => (
				<Image source={{ uri: ele }} style={styles.thumbnail} />
			));
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

	// useEffect(() => {
	// 	projectsDisplay();
	// }, [projectSearch]);

	// useEffect(() => {
	// 	handleProjectGet();
	// }, [projectInputClick]);

	// const projectsDisplay = () => {
	// 	let filteredProjects = projects.filter((ele) =>
	// 		ele.name.toLowerCase().includes(projectSearch.toLowerCase())
	// 	);

	// 	filteredProjects.length > 5
	// 		? (filteredProjects = filteredProjects.splice(0, 5))
	// 		: null;
	// 	return filteredProjects.map((ele, key) => {
	// 		let id;
	// 		props.user.user.user === "Admin" ? (id = ele.id) : (id = ele.project_id);
	// 		return (
	// 			<PropertySearch
	// 				propertyName={ele.name}
	// 				id={id}
	// 				key={key}
	// 				handleSelectedProperty={(name, id) => handleSelectedProject(name, id)}
	// 			/>
	// 		);
	// 	});
	// };

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
				<DropDownPicker
					items={[
						{ label: "Yes", value: true },
						{ label: "No", value: false },
						{ label: "Stuff", value: false },
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
					multiple
				/>
				{/* <TextInput
					style={styles.input}
					placeholder="Title"
					onChangeText={(title) => setTitle(title)}
				/> */}
				{/* <TextInput
					style={styles.inputSummary}
					placeholder="Summary"
					onChangeText={(summary) => setSummary(summary)}
					multiline={true}
				/> */}

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
				<Text>Before:</Text>
				{beforeImages.length >= 3 ? null : (
					<TouchableOpacity onPress={() => openImagePickerAsync("beforeImage")}>
						<Icon name="plus" size={30} color="black" />
					</TouchableOpacity>
				)}
				<View style={styles.imageContainer}>
					{displayImage("beforeImages")}
				</View>

				<Text>After:</Text>
				<TouchableOpacity onPress={() => openImagePickerAsync("afterImage")}>
					<Icon name="plus" size={30} color="black" />
				</TouchableOpacity>
				{displayImage("afterImages")}

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
		width: 150,
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
