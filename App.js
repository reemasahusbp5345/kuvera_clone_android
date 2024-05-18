import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet, Modal } from "react-native";
import Portfolio from "./components/Portfolio";
import Stocks from "./components/Stocks";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolio } from "./redux/portfolioSlice";

function App() {
  const [stocks, setStocks] = useState([]);
  const isModalOpen = useSelector((store) => store?.portfolio?.modal);
  const dispatch = useDispatch();

  const fetchStocks = async () => {
    try {
      const response = await fetch("http://localhost:8000/stocks");
      const stockData = await response.json();
      setStocks(stockData);
    } catch (error) {
      throw new Error();
    }
  };

  const fetchPortfolio = async () => {
    try {
      const response = await fetch("http://localhost:8000/portfolio");
      const portfolioData = await response.json();
      dispatch(getPortfolio(portfolioData));
    } catch (error) {
      throw new Error();
    }
  };

  useEffect(() => {
    fetchStocks();
    fetchPortfolio();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Stocks stocks={stocks} />
        </View>
        <View style={styles.section}>
          <Portfolio />
        </View>
      </ScrollView>
      <Modal visible={isModalOpen} transparent={true}>
        <ModalComponent />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  section: {
    borderWidth: 2,
    margin: 10,
    padding: 10,
  },
});

export default App;
