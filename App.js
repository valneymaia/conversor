import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const API_URL = 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL';



const ConversorDeMoedas = () => {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        setRates({
          USD: data.USDBRL?.bid,
          EUR: data.EURBRL?.bid,
          BTC: data.BTCBRL?.bid,
        });
      })
      .catch(error => console.error('Erro ao buscar as taxas:', error));
  }, []);

  const converterMoeda = () => {
    let convertido = amount * rates[fromCurrency];
    if (toCurrency !== 'BRL') {
      convertido /= rates[toCurrency];
    }
    setConvertedAmount(convertido.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversor de Moedas</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite o valor"
        value={amount}
        onChangeText={text => setAmount(text)}
      />
      <Picker
        selectedValue={fromCurrency}
        style={styles.picker}
        onValueChange={(itemValue) => setFromCurrency(itemValue)}
      >
        <Picker.Item label="USD" value="USD" />
        <Picker.Item label="EUR" value="EUR" />
        <Picker.Item label="BTC" value="BTC" />
      </Picker>
      <Picker
        selectedValue={toCurrency}
        style={styles.picker}
        onValueChange={(itemValue) => setToCurrency(itemValue)}
      >
        <Picker.Item label="BRL" value="BRL" />
        <Picker.Item label="USD" value="USD" />
        <Picker.Item label="EUR" value="EUR" />
        <Picker.Item label="BTC" value="BTC" />
      </Picker>
      

      
      <Button  
          title="Converter"
          color="#841584" 
          onPress={converterMoeda}
      />
      

      {convertedAmount && (
        <Text style={styles.result}>
          Valor Convertido: {convertedAmount} {toCurrency}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333333',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#841584',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 100,
    marginBottom: 20,
  },
  result: {
    fontSize: 18,
    marginTop: 20,
    color: '#841584',
  },
});

export default ConversorDeMoedas;
