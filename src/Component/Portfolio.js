import React from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deletePortfolio, openModal } from "../Redux/portfolioSlice";

const Portfolio = () => {
  const portfolio = useSelector((store) => store?.portfolio?.portfolioData);
  const dispatch = useDispatch();

  const handleEdit = (stock) => {
    dispatch(openModal({ ...stock, isAdd: false }));
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8000/portfolio/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(deletePortfolio({ id }));
    } catch (error) {
      throw new Error();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portfolio</Text>
      <FlatList
        data={portfolio}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item.stock.name}</Text>
            <Text style={styles.price}>{item.stock.price}</Text>
            <Text style={styles.quantity}>{item.value}</Text>
            <Text style={styles.invested}>{Number(item.stock.price) * Number(item.value)}</Text>
            <Text style={styles.oneDay}>{item.stock.oneDay}</Text>
            <Text style={styles.oneYear}>{item.stock.oneYr}</Text>
            <TouchableOpacity onPress={() => handleEdit(item)}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item._id)}>
              <Text style={styles.deleteButton}>Delete</Text>
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
    color: "green",
  },
  quantity: {
    color: "gray",
  },
  invested: {
    color: "green",
  },
  oneDay: {
    color: "gray",
  },
  oneYear: {
    color: "gray",
  },
  editButton: {
    color: "blue",
  },
  deleteButton: {
    color: "red",
  },
});

export default Portfolio;
