/*import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter, useSearchParams } from 'expo-router';
import { AlunosContext } from './AlunoContext';

const AlunoDetalhes = () => {
  const { id } = useSearchParams();
  const { alunos } = useContext(AlunosContext);
  const aluno = alunos.find((aluno) => aluno.id === id);
  const router = useRouter();

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
      <Button title="Voltar" onPress={() => router.back()} />
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
*/

import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter, useSearchParams } from 'expo-router';
import { AlunosContext } from './AlunoContext';

const AlunoDetalhes = () => {
  const { id } = useSearchParams();
  const { alunos } = useContext(AlunosContext);
  const aluno = alunos.find((aluno) => aluno.id === id);
  const router = useRouter();

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
      <Button title="Voltar" onPress={() => router.back()} />
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
