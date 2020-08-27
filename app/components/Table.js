import React, { Component } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";

const Tables = (props) => {
	return (
		<View style={styles.container}>
			<Table borderStyle={{ borderWidth: 2, borderColor: "#7d8c74" }}>
				<Row
					data={props.headerData}
					style={styles.head}
					textStyle={styles.text}
				/>
				<Rows data={props.rowData} textStyle={styles.text} />
			</Table>
		</View>
	);
};

export default Tables;

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, paddingTop: 10, width: "80%" },
	head: { height: 40, backgroundColor: "#7d8c74" },
	text: { margin: 10, color: "white" },
});
