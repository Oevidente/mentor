import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'; // Updated import
import { useRoute, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { AlunosContext } from './AlunoContext';

const EditarAluno = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params || {};
  const { alunos, adicionarOuAtualizarAluno } = useContext(AlunosContext);
  const [aluno, setAluno] = useState({ nome: '', email: '', telefone: '' });

  useEffect(() => {
    const alunoToEdit = alunos.find((aluno) => aluno.id === id);
    if (alunoToEdit) {
      setAluno(alunoToEdit);
    }
  }, [id, alunos]);

  const handleSave = () => {
    adicionarOuAtualizarAluno(aluno);
    Toast.show({
      type: 'success',
      text1: 'Sucesso',
      text2: 'Aluno salvo com sucesso!',
    });
    navigation.navigate('AlunoDetalhes', { id: aluno.id });
  };

  if (!aluno) {
    return (
      <View style={styles.container}>
        <Text>Aluno não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Aluno</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={aluno.nome}
        onChangeText={(text) => setAluno({ ...aluno, nome: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={aluno.email}
        onChangeText={(text) => setAluno({ ...aluno, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={aluno.telefone}
        onChangeText={(text) => setAluno({ ...aluno, telefone: text })}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
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
    marginTop: 16,

    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1E262C', // Updated color
  },
  input: {
    fontSize: 16,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 24,
    paddingHorizontal: 8,
    borderRadius: 8,
    color: '#203534', // Updated color
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#5AC5A8',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default EditarAluno;
