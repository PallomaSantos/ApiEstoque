import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { createProdutos, updateProdutos, fetchEstoque } from "../services/Api";

export default function Cadastro({ navigation }) {
  const [registros, setRegistros] = useState([]);
  const [selectedProdutoId, setSelectedProdutoId] = useState(null);
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [preco, setPreco] = useState("");

  useEffect(() => {
    fetchEstoque(setRegistros);
  }, []);

  const handleSubmit = async () => {
    if (!nome || !marca || !preco) {
      Alert.alert("Atenção", "Preencha todos os campos antes de cadastrar.");
      return;
    }

    const newProduto = { nome, marca, preco };

    if (selectedProdutoId) {
      await updateProdutos(selectedProdutoId, newProduto);
      setSelectedProdutoId(null);
    } else {
      const addedProduto = await createProdutos(newProduto);
      if (addedProduto) {
        Alert.alert("Sucesso!", "Cadastro realizado com sucesso!", [
          { text: "OK", onPress: () => navigation.navigate("Home") },
        ]);
      }
    }

    setNome("");
    setMarca("");
    setPreco("");
  };

  return (
    <View>
      <TextInput placeholder="Produto" value={nome} onChangeText={setNome} />
      <TextInput placeholder="Marca" value={marca} onChangeText={setMarca} />
      <TextInput
    placeholder="Preco"
    value={preco}
    onChangeText={setPreco}
    keyboardType="numeric"/>


      <Button title="Cadastrar" onPress={handleSubmit} />
    </View>
  );
}
