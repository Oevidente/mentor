import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AlunosContext } from './AlunoContext';
import { v4 as uuidv4 } from 'uuid';

const CadastrarAluno = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const router = useRouter();
  const { alunos, adicionarAluno, removerAluno } = useContext(AlunosContext);

  const handleSubmit = () => {
    if (!nome || !email || !telefone) {
      Alert.alert('Por favor, preencha todos os campos.');
      return;
    }

    const id = uuidv4(); // Generate a unique ID
    adicionarAluno({ id, nome, email, telefone });
    Alert.alert('Aluno cadastrado com sucesso!');
    router.push('/alunos');
  };

  const handleRemove = (id: string) => {
    removerAluno(id);
    Alert.alert('Aluno removido com sucesso!');
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
      <View style={styles.buttonContainer}>
        <Button title="Cadastrar" onPress={handleSubmit} />
      </View>

      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          // Add a defensive check to ensure item and its properties are defined
          if (!item || !item.telefone) {
            return (
              <View>
                <Text>Invalid item</Text>
              </View>
            );
          }

          return (
            <View style={styles.alunoItem}>
              <Text style={styles.alunoNome}>{item.nome}</Text>
              <Text>{item.email}</Text>
              <Text>
                ({item.telefone.slice(0, 2)}) {item.telefone.slice(2, 7)}-
                {item.telefone.slice(7)}
              </Text>
              <View style={styles.removeButtonContainer}>
                <Button title="Remover" onPress={() => handleRemove(item.id)} />
              </View>
            </View>
          );
        }}
      />
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
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 24,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    marginBottom: 24,
  },
  alunoItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
  },
  alunoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  removeButtonContainer: {
    marginTop: 16,
  },
});

export default CadastrarAluno;
