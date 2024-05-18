import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToPortfolio,
  closeModal,
  editPortfolio,
} from "../Redux/portfolioSlice";

const ModalComponent = () => {
  const stock = useSelector((store) => store?.portfolio?.selectedStock);
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (stock?.value) {
      setValue(stock?.value);
    }
  }, [stock]);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const addStockToPortfolio = async (id) => {
    try {
      const response = await fetch("http://localhost:8000/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, value: Number(value) }),
      });
      const newStock = await response.json();
      dispatch(addToPortfolio(newStock));
    } catch (error) {
      throw new Error();
    }
  };

  const updatePortfolio = async (id, data) => {
    try {
      await fetch(`http://localhost:8000/portfolio/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      dispatch(editPortfolio({ id, data }));
    } catch (error) {
      throw new Error();
    }
  };

  const handleSaveModal = async () => {
    if (stock?.isAdd) {
      addStockToPortfolio(stock?.stock?._id);
    } else {
      const data = { ...stock, value: Number(value) };
      updatePortfolio(stock?._id, data);
    }
    dispatch(closeModal());
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modal}>
        <Text style={styles.title}>{stock?.stock?.name}</Text>
        <View style={styles.stockInfo}>
          <Text style={styles.price}>{stock?.stock?.price}</Text>
          <Text style={styles.change}>1D: {stock?.stock?.oneDay}</Text>
          <Text style={styles.change}>1Y: {stock?.stock?.oneYr}</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={value?.toString()}
          onChangeText={(text) => setValue(text)}
          keyboardType="numeric"
        />
        <Text style={styles.total}>
          Total value: {value && Number(stock?.stock?.price) * Number(value)}
        </Text>
        <View style={styles.buttons}>
          <Button title="Save" onPress={handleSaveModal} />
          <Button title="Close" onPress={handleCloseModal} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  stockInfo: {
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "green",
  },
  change: {
    fontSize: 14,
    color: "gray",
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  total: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default ModalComponent;
