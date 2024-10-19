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
  const router = useRouter();
  const { alunos } = useContext(AlunosContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.largeButton]}
        onPress={() => router.push('/cadastrar-aluno')}
      >
        <Feather name="user-plus" size={24} color="black" />
        <Text style={styles.buttonTitle}>Cadastrar Novo Aluno</Text>
        <Text style={styles.buttonSubtitle}>Adicionar aluno ao sistema</Text>
      </TouchableOpacity>

      <FlatList
        data={alunos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.button, styles.alunoItem]}
            onPress={() => router.push(`/aluno/${item.id}`)}
          >
            <Text style={styles.alunoNome}>{item.nome}</Text>
            <Text>{item.email}</Text>
            <Text>{item.telefone}</Text>
          </TouchableOpacity>
        )}
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
  button: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 8,
  },
  largeButton: {
    marginBottom: 16,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  alunoItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  alunoNome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AlunosTab;
