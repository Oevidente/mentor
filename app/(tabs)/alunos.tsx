import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { AlunosContext } from './AlunoContext';

const AlunosTab = () => {
  const { alunos } = useContext(AlunosContext);
  const router = useRouter();

  // Ensure that the data is an array and not undefined or null
  const data = Array.isArray(alunos)
    ? alunos.filter((item) => item && item.telefone)
    : [];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.button, styles.alunoItem]}
        onPress={() => router.push(`/AlunoDetalhes?id=${item.id}`)}
      >
        <Text style={styles.alunoNome}>{item.nome}</Text>
        <Text style={styles.alunoInfo}>{item.email}</Text>
        <Text style={styles.alunoInfo}>
          ({item.telefone.slice(0, 2)}) {item.telefone.slice(2, 7)}-
          {item.telefone.slice(7)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.buttonCadastro]}
        onPress={() => router.push('/cadastrar-aluno')}
      >
        <Feather name="users" size={24} color="#1E262C" />
        <Text style={styles.buttonTitle}>Gerenciar Alunos</Text>
        <Text style={styles.buttonSubtitle}>Adicionar ou Remover aluno(s)</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonCadastro: {
    flex: 1,
    backgroundColor: '#5AC5A8',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    maxHeight: 114,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
    height: '100%',
    paddingVertical: 32,
  },
  button: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    maxHeight: 114,
  },
  largeButton: {
    marginBottom: 16,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E262C',
  },
  buttonSubtitle: {
    fontSize: 14,
    color: '#203534',
    fontWeight: '500',
  },
  alunoItem: {
    padding: 16,
  },
  alunoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E262C',
  },
  alunoInfo: {
    color: '#203534',
    fontWeight: '500',
  },
});

export default AlunosTab;
