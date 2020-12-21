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
	const [typeOfWork, setTypeOfWork] = useState([]);
	const [properties, setProperties] = useState([]);
	const [propertySearch, setPropertySearch] = useState("");
	const [propertySelected, setPropertySelected] = useState(false);
	const [propertyId, setPropertyId] = useState(null);
	const [propertyInputClick, setPropertyInputClick] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loadingBeforeImage, setBeforeLoadingImage] = useState(false);
	const [loadingAfterImage, setAfterLoadingImage] = useState(false);

	useEffect(() => {
		getProperties();
	}, []);

	useEffect(() => {
		propertiesDisplay();
	}, [propertySearch]);

	let openImagePickerAsync = async (type) => {
		// if (type === "beforeImage") {
		// 	setBeforeLoadingImage(true);
		// } else {
		// 	setAfterLoadingImage(true);
		// }
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

		let image = await ImagePicker.showImagePicker((response) => {
			// console.log("Response = ", response);
			if (type === "beforeImage") {
				setBeforeLoadingImage(true);
			} else {
				setAfterLoadingImage(true);
			}

			if (response.didCancel) {
				setBeforeLoadingImage(false);
				setAfterLoadingImage(false);
			} else if (response.error) {
				console.log("ImagePicker Error: ", response.error);
			} else if (response.customButton) {
				console.log("User tapped custom button: ", response.customButton);
				// alert(response.customButton);
			} else {
				if (type === "beforeImage") {
					setBeforeLoadingImage(false);
					// let arr = beforeImages;
					// arr.push(`data:image/jpg;base64,${response.data}`);
					// setBeforeImages(arr);
					setBeforeImages([...beforeImages, response.uri]);
					// return response;
				} else {
					setAfterLoadingImage(false);
					setAfterImages([...afterImages, response.uri]);
					// return response;
				}
			}
		});
	};

	let getProperties;
	switch (props.user.user.user) {
		case "Admin":
			getProperties = () => {
				axios
					.get("http://142.93.92.22:4135/api/company/properties")
					.then((res) => setProperties(res.data));
			};
			break;

		case "employee":
			getProperties = () => {
				axios
					.get("http://142.93.92.22:4135/api/company/properties")
					.then((res) => setProperties(res.data));
			};
			break;

		default:
			getProperties = () => {
				lehi;
				axios

					.get("http://142.93.92.22:4135/api/user/properties")
					.then((res) => setProperties(res.data));
			};
	}

	const handleSubmit = () => {
		if (!propertySelected) {
			Alert.alert("Please Select a Property from the list");
		} else if (!typeOfWork[0]) {
			Alert.alert("Please Select a Type Of Work");
		} else if (beforeImages < 4) {
			Alert.alert("Please Select Four Before Images");
		} else if (afterImages < 4) {
			Alert.alert("Please Select Four After Images");
		}
		// else if (!typeOfForm) {
		// 	Alert.alert("Please select a Type of Form");
		// }
		else {
			setLoading(true);
			let typeOfWorkString = typeOfWork.join(", ");

			axios
				.post("http://142.93.92.22:4135/api/company/photo", {
					imageOne: beforeImages[0],
					imageTwo: beforeImages[1],
					imageThree: beforeImages[2],
					imageFour: beforeImages[3],
					imageFive: afterImages[0],
					imageSix: afterImages[1],
					imageSeven: afterImages[2],
					imageEight: afterImages[3],
					typeOfWork: typeOfWorkString,
					propertyId: propertyId,
				})
				.then((res) => {
					setLoading(false);
					Alert.alert(
						//title
						"Form Submitted",
						//body
						"Thank you for your Submission",
						[
							{
								text: "No Problem",
								onPress: () => {
									setBeforeImages([]);
									setAfterImages([]);
									setPropertySearch("");
									setPropertySelected(false);
									setPropertyId(null);
									setTypeOfWork([]);
								},
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
				<>
					<Image source={{ uri: ele }} style={styles.thumbnail} />
					{loadingBeforeImage ? <ActivityIndicator /> : null}
				</>
			));
		} else {
			return afterImages.map((ele, indx, arr) => (
				<>
					<Image source={{ uri: ele }} style={styles.thumbnail} />
					{loadingAfterImage && indx === arr.length - 1 ? (
						<ActivityIndicator />
					) : null}
				</>
			));
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
				<DropDownPicker
					items={[
						{ label: "Mowing", value: "Mowing" },
						{ label: "Irrigation", value: "Irrigation" },
						{ label: "Plant/Rock Areas", value: "Plant/Rock Areas" },
						{ label: "Cleanup", value: "Cleanup" },

						{
							label: "Fertilization/Spraying",
							value: "Fertilization/Spraying",
						},
						{ label: "Site Inspection", value: "Site Inspection" },
						{ label: "Special Projects", value: "Special Projects" },
						{ label: "Snow Plowing", value: "Snow Plowing" },
						{ label: "Snow Sidewalks", value: "Snow Sidewalks" },

						{ label: "Parking De-Icing", value: "Parking DeIcing" },
						{ label: "Sidewalk De-Icing", value: "Sidewalk De-Icing" },
						{ label: "Aeration", value: "Aeration" },
						{ label: "Pruning", value: "Pruning" },
						{ label: "Leaf Pickup", value: "Leaf Pickup" },
						{ label: "Turn On/Off", value: "Turn On/Off" },
					]}
					defaultValue={typeOfWork}
					placeholder="Type Of Work"
					containerStyle={{
						height: 40,
						width: 200,
						marginBottom: 10,
						marginTop: 10,
					}}
					onChangeItem={(item) => setTypeOfWork(item)}
					multiple={true}
				/>
				{/* <DropDownPicker
					items={[
						{
							label: "UK",
							value: "uk",
							icon: () => <Icon name="flag" size={18} color="#900" />,
						},
						{
							label: "France",
							value: "france",
							icon: () => <Icon name="flag" size={18} color="#900" />,
						},
					]}
					multiple={true}
					multipleText="%d items have been selected."
					min={0}
					max={10}
					defaultValue={typeOfWork}
					containerStyle={{ height: 40 }}
					itemStyle={{
						justifyContent: "flex-start",
					}}
					onChangeItem={(item) =>
						this.setState({
							countries: item, // an array of the selected items
						})
					}
				/> */}
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
				{beforeImages.length >= 4 ? null : (
					<TouchableOpacity onPress={() => openImagePickerAsync("beforeImage")}>
						<Icon name="plus" size={30} color="black" />
					</TouchableOpacity>
				)}
				<View style={styles.imageContainer}>
					{displayImage("beforeImages")}
					{loadingBeforeImage ? <ActivityIndicator /> : null}
				</View>

				<Text>After:</Text>
				{afterImages.length >= 4 ? null : (
					<TouchableOpacity onPress={() => openImagePickerAsync("afterImage")}>
						<Icon name="plus" size={30} color="black" />
					</TouchableOpacity>
				)}
				{/* {loadingAfterImage && afterImages.length === 0 ? (
					<ActivityIndicator />
				) : null} */}
				<View style={styles.imageContainer}>{displayImage("afterImages")}</View>

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
		// width: "100%",
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
