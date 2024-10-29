import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlunosContext } from './AlunoContext';

const AlunoDetalhes = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params || {}; // Verifica se params está definido antes de acessar id
  const { alunos } = useContext(AlunosContext);
  const [nota, setNota] = useState('');

  useEffect(() => {
    const loadNota = async () => {
      try {
        // Carrega a anotação salva para o aluno específico usando o id
        const savedNota = await AsyncStorage.getItem(`nota_${id}`);
        if (savedNota !== null) {
          setNota(savedNota);
        } else {
          setNota(''); // Limpa a anotação se não houver nenhuma salva
        }
      } catch (error) {
        console.error('Failed to load note:', error);
      }
    };

    if (id) {
      loadNota();
    }
  }, [id]);

  const saveNota = async () => {
    try {
      // Salva a anotação para o aluno específico usando o id
      await AsyncStorage.setItem(`nota_${id}`, nota);
      alert('Anotação salva com sucesso!');
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };

  // Encontra o aluno específico usando o id
  const aluno = alunos.find((aluno) => aluno.id === id);

  const openWhatsApp = (telefone) => {
    const url = `https://api.whatsapp.com/send?phone=55${telefone}`;
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open WhatsApp:', err),
    );
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
      <Text style={styles.title}>{aluno.nome}</Text>
      <Text style={styles.label}>Email: {aluno.email}</Text>
      <TouchableOpacity
        style={styles.whatsappButton}
        onPress={() => openWhatsApp(aluno.telefone)}
      >
        <Text style={styles.whatsappButtonText}>
          Enviar WhatsApp para {aluno.nome}
        </Text>
      </TouchableOpacity>
      <Text style={styles.label}>Notas:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Escreva suas anotações aqui..."
        value={nota}
        onChangeText={setNota}
        multiline
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={saveNota}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EditarAluno', { id })}
        >
          <Text style={styles.buttonText}>Editar cadastro</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  textInput: {
    height: 400,
    borderColor: '#ccc',
    backgroundColor: '#eeeeee89',
    borderWidth: 1,
    padding: 8,
    marginTop: 8,
    textAlignVertical: 'top',
    borderRadius: 8,
    marginBottom: 16,
    color: '#203534', // Updated color
    fontSize: 16,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  whatsappButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 16,
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

export default AlunoDetalhes;
