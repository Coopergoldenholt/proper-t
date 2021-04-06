import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Alert,
} from "react-native";
import axios from "axios";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import PropertySearch from "../../components/PropertySearch";

import { URL } from "../../../config";

const AddNewProject = (props) => {
	const [projectName, setProjectName] = useState();
	const [managedCompanies, setManagedCompanies] = useState([]);
	const [properties, setProperties] = useState([]);
	const [companyId, setCompanyId] = useState();
	const [propertySelected, setPropertySelected] = useState(false);
	const [propertySearch, setPropertySearch] = useState("");
	const [propertyInputClick, setPropertyInputClick] = useState(false);
	const [propertyId, setPropertyId] = useState(null);

	useEffect(() => {
		getManagedCompanies();
	}, []);
	useEffect(() => {
		getProperties();
	}, [companyId]);

	useEffect(() => {
		propertiesDisplay();
	}, [propertySearch]);

	const handleRegister = () => {
		axios
			.post(`${URL}/api/projects`, {
				name: projectName,
			})
			.then((res) =>
				Alert.alert(
					//title
					"Project Added",
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
				)
			)
			.catch((err) => Alert.alert("Project Could Not be Added"));
	};

	const getManagedCompanies = () => {
		axios

			.get(`${URL}/api/companies/${props.user.user.companyId}`)
			.then((res) => {
				setManagedCompanies(res.data);
			});
	};

	const managedCompaniesPickerData = managedCompanies
		? managedCompanies.map((ele) => {
				return { label: ele.company_name, value: ele.id };
		  })
		: null;

	const getProperties = () => {
		axios
			.get(`${URL}/api/company/managed-company/properties/${companyId}`)

			.then((res) => setProperties(res.data));
		return null;
	};

	const propertiesDisplay = () => {
		let filteredProperties = properties.filter((ele) => {
			return ele.name.toLowerCase().includes(propertySearch.toLowerCase());
		});

		filteredProperties.length > 5
			? (filteredProperties = filteredProperties.splice(0, 5))
			: null;
		return filteredProperties.map((ele, key) => (
			<PropertySearch
				propertyName={ele.name}
				id={ele.id}
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

	const handleSubmit = () => {
		if (!projectName) {
			Alert.alert("Please Enter A Name");
		} else if (!companyId) {
			Alert.alert("Please Enter A Company");
		} else if (!propertyId) {
			Alert.alert("Please Select A Property From the Dropdown");
		} else {
			axios
				.post(`${URL}/api/projects`, {
					mangagedCompanyId: companyId,
					name: projectName,
					propertyId: propertyId,
				})

				.then((res) => {
					Alert.alert(
						//title
						"Project Added",
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

	return (
		<View style={styles.background}>
			<TextInput
				placeholder="Project Name"
				style={styles.input}
				placeholderTextColor="black"
				onChangeText={(name) => setProjectName(name)}
			/>
			{managedCompanies ? (
				<>
					<DropDownPicker
						items={managedCompaniesPickerData}
						defaultNull
						placeholder="Select a Company"
						containerStyle={{ height: 40, width: 200, marginBottom: 10 }}
						onChangeItem={(item) => setCompanyId(item.value)}
					/>
				</>
			) : null}
			{properties[0] ? (
				<>
					<TextInput
						style={styles.propertyInput}
						placeholder="Search For a Property"
						onFocus={() => setPropertyInputClick(true)}
						onChangeText={(property) => handlePropertySearch(property)}
						value={propertySearch}
					/>
					{propertyInputClick
						? propertySelected
							? null
							: propertiesDisplay()
						: null}
				</>
			) : null}

			<TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
				<Text style={styles.buttonText}>Create Project</Text>
			</TouchableOpacity>
		</View>
	);
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withNavigation(AddNewProject));

const styles = StyleSheet.create({
	background: {
		width: "100%",
		paddingTop: 20,
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	button: {
		width: "50%",
		marginTop: 10,
		paddingTop: 10,
		backgroundColor: "#c48273",
		borderRadius: 5,
		alignItems: "center",
		padding: 10,
		color: "white",
	},
	buttonText: {
		color: "white",
	},
	input: {
		width: 200,
		height: 44,
		padding: 10,
		borderWidth: 1,
		borderColor: "white",
		marginBottom: 10,
		borderRadius: 5,
		backgroundColor: "white",
	},
	propertyInput: {
		width: 200,
		height: 44,
		padding: 10,

		borderRadius: 5,
		backgroundColor: "white",
	},
	text: {
		color: "white",
		fontSize: 40,
	},
});
