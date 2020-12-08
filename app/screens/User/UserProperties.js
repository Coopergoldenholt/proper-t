import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Image,
	ScrollView,
	Alert,
} from "react-native";
import axios from "axios";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import PropertyTable from "../../components/Table";
import TextClick from "../../components/TextClick";
import PropertySearch from "../../components/PropertySearch";

const AdminProperties = (props) => {
	const [properties, setProperties] = useState([]);
	const [propertyInputClick, setPropertyInputClick] = useState(false);
	const [propertySelected, setPropertySelected] = useState(false);
	const [propertySearch, setPropertySearch] = useState("");
	const [propertyId, setPropertyId] = useState(null);

	useEffect(() => {
		axios

			.get("http://localhost:4068/api/user/properties")
			.then((res) => setProperties(res.data));
	}, []);

	useEffect(() => {
		propertiesDisplay();
	}, [propertySearch]);

	const tableText = (text, id) => (
		<TextClick text={text} id={id} navigation={props.navigation} />
	);
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
		// setPropertyInputClick(false);
	};

	const handleSearchClick = () => {
		if (propertyId) {
			props.navigation.navigate("Property", { id: propertyId });
		} else {
			Alert.alert("Select a Property from the Dropdown");
		}
	};

	const getTables = () => {
		const headerData = ["Property Name"];

		const rowData = properties.map((property) => {
			return [
				tableText(property.name, property.id),
				// editButton(property.property_id),
				// deleteButton(property.property_id),
			];
		});

		return (
			<>
				<View style={styles.userContainer}>
					<PropertyTable rowData={rowData} headerData={headerData} />
				</View>
			</>
		);
	};

	return (
		<ScrollView>
			<View style={styles.background}>
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
	propertyInput: {
		width: 200,
		height: 44,
		padding: 10,

		borderWidth: 1,
		borderColor: "black",

		borderRadius: 5,
		backgroundColor: "white",
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
