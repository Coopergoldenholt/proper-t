import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	TextInput,
	Image,
	Alert,
	RefreshControl,
} from "react-native";
import axios from "axios";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import PropertyTable from "../../components/Table";
import DeleteButton from "../../components/DeleteButton";
import TextClick from "../../components/TextClick";
import EditButton from "../../components/EditButton";
import PropertySearch from "../../components/PropertySearch";

const wait = (timeout) => {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
};

const AdminProperties = (props) => {
	const [properties, setProperties] = useState([]);
	const [managedCompanies, setManagedCompanies] = useState([]);
	const [propertySelected, setPropertySelected] = useState(false);
	const [propertySearch, setPropertySearch] = useState("");
	const [propertyInputClick, setPropertyInputClick] = useState(false);
	const [propertyId, setPropertyId] = useState(null);
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		axios

			.get(
				`http://142.93.92.22:4135/api/companies/${props.user.user.companyId}`
			)
			.then((res) => {
				setManagedCompanies(res.data);
			});
		getManagedCompanies();
		axios

			.get("http://142.93.92.22:4135/api/company/properties")
			.then((res) => setProperties(res.data));
		wait(2000).then(() => setRefreshing(false));
	}, []);

	useEffect(() => {
		getManagedCompanies();
		axios

			.get("http://142.93.92.22:4135/api/company/properties")
			.then((res) => setProperties(res.data));
	}, []);
	useEffect(() => {
		propertiesDisplay();
	}, [propertySearch]);

	const getManagedCompanies = () => {
		axios

			.get(
				`http://142.93.92.22:4135/api/companies/${props.user.user.companyId}`
			)
			.then((res) => {
				setManagedCompanies(res.data);
			});
	};

	const deleteButton = (id) => (
		<DeleteButton selection="property" navigation={props.navigation} id={id} />
	);
	const editButton = (id) => <EditButton id={id} />;

	const tableText = (text, id) => (
		<TextClick
			selection={"user"}
			text={text}
			id={id}
			navigation={props.navigation}
		/>
	);

	const getTables = () => {
		const tables = managedCompanies.map((company, index) => {
			const headerData = ["Property Name", "Delete"];
			let splitByCompany = properties.filter((property) => {
				return property.managed_company_id === company.id;
			});

			splitByCompany.sort((a, b) => (a.name > b.name ? 1 : -1));
			const rowData = splitByCompany.map((property) => {
				return [
					tableText(property.name, property.property_id),
					// editButton(property.property_id),
					deleteButton(property.property_id),
				];
			});
			const companyName = splitByCompany.map((property) => {
				return property.company_name;
			});

			return (
				<>
					<Text style={styles.companyName}>{companyName[0]}</Text>
					<View style={styles.userContainer}>
						<PropertyTable
							key={index}
							rowData={rowData}
							headerData={headerData}
						/>
					</View>
				</>
			);
		});
		return tables;
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

	const handleSearchClick = () => {
		if (propertyId) {
			props.navigation.navigate("Property", { id: propertyId });
		} else {
			Alert.alert("Select a Property from the Dropdown");
		}
	};

	return (
		<ScrollView
			contentContainerStyle={styles.scrollView}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			<View style={styles.background}>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => props.navigation.navigate("Company Registration")}
					>
						<Text style={styles.buttonText}>Add a New Company</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => props.navigation.navigate("Property Registration")}
					>
						<Text style={styles.buttonText}>Add a Property</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.searchSection}>
					<TextInput
						style={styles.propertyInput}
						placeholder="Search For a Property"
						onFocus={() => setPropertyInputClick(true)}
						onChangeText={(property) => handlePropertySearch(property)}
						value={propertySearch}
					/>
					<TouchableOpacity
						style={styles.searchIcon}
						onPress={() => handleSearchClick()}
					>
						<Image
							style={styles.searchIcon}
							source={require("../../assets/search-icon.png")}
						/>
					</TouchableOpacity>
				</View>
				{propertyInputClick
					? propertySelected
						? null
						: propertiesDisplay()
					: null}

				{getTables()}
				<TextClick />
			</View>
		</ScrollView>
	);
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withNavigation(AdminProperties));

const styles = StyleSheet.create({
	background: {
		width: "100%",
		paddingTop: 20,
		alignItems: "center",
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

		marginBottom: 20,
	},
	buttonContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
	buttonText: { textAlign: "center", color: "white" },
	companyName: {
		marginTop: 10,
	},
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
		color: "black",
	},
	propertyInput: {
		width: 200,
		height: 44,
		padding: 10,

		borderWidth: 1,
		borderColor: "black",

		borderRadius: 5,
		backgroundColor: "white",
		color: "black",
	},
	searchSection: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	searchIcon: {
		padding: 10,
		height: 10,
		width: 10,
		position: "absolute",
		right: 10,
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
