import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AlunosContext } from './AlunoContext';

const AlunoDetalhes = () => {
  const route = useRoute();
  const { id } = route.params || {}; // Verifica se params está definido antes de acessar id
  const { alunos } = useContext(AlunosContext);

  console.log('Route Params:', route.params);
  console.log('ID:', id);
  console.log('Alunos:', alunos);

  const aluno = alunos.find((aluno) => aluno.id === id);

  if (!aluno) {
    return (
      <View style={styles.container}>
        <Text>Aluno não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{aluno.nome}</Text>
      <Text>Email: {aluno.email}</Text>
      <Text>
        Telefone: ({aluno.telefone.slice(0, 2)}) {aluno.telefone.slice(2, 7)}-
        {aluno.telefone.slice(7)}
      </Text>
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
});

export default AlunoDetalhes;
