import React from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { openModal } from "../Redux/portfolioSlice";

const Stocks = ({ stocks }) => {
  const dispatch = useDispatch();

  const handleAdd = (stock) => {
    dispatch(openModal({ stock, isAdd: true }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stocks</Text>
      <FlatList
        data={stocks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.oneDay}>{item.oneDay}</Text>
            <Text style={styles.oneYear}>{item.oneYr}</Text>
            <TouchableOpacity onPress={() => handleAdd(item)}>
              <Text style={styles.addButton}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
  },
  name: {
    color: "blue",
  },
  price: {
    color: "gray",
  },
  oneDay: {
    color: "green",
  },
  oneYear: {
    color: "green",
  },
  addButton: {
    color: "blue",
  },
});

export default Stocks;
