/*import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { AlunosContext } from './AlunoContext';

const EditarAluno = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params || {};
  const { alunos, adicionarAluno } = useContext(AlunosContext);
  const [aluno, setAluno] = useState({ nome: '', email: '', telefone: '' });

  useEffect(() => {
    const alunoToEdit = alunos.find((aluno) => aluno.id === id);
    if (alunoToEdit) {
      setAluno(alunoToEdit);
    }
  }, [id, alunos]);

  const handleSave = () => {
    adicionarAluno(aluno);
    navigation.goBack();
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
      <Button title="Salvar" onPress={handleSave} />
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
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default EditarAluno;
*/

import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
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
      <Button title="Salvar" onPress={handleSave} />
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
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default EditarAluno;
