import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { AlunosContext } from './AlunoContext';

const CadastrarAluno = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const router = useRouter();
  const { adicionarAluno } = useContext(AlunosContext);

  const handleSubmit = () => {
    if (!nome || !email || !telefone) {
      Alert.alert('Por favor, preencha todos os campos.');
      return;
    }

    adicionarAluno({ nome, email, telefone });
    Alert.alert('Aluno cadastrado com sucesso!');
    router.push('/alunos');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Novo Aluno</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />
      <Button title="Cadastrar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
});

export default CadastrarAluno;
