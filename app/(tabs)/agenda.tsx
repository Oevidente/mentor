import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AlunosContext } from './AlunoContext'; // Importe o contexto

let PickerComponent = Picker;
if (Platform.OS === 'web') {
  PickerComponent = require('react-native-web-picker').default;
}

export default function AgendaTab() {
  const { alunos } = useContext(AlunosContext); // Use o contexto para obter os alunos
  const [alunoSelecionado, setAlunoSelecionado] = useState('');
  const [dataAula, setDataAula] = useState('');
  const [horaAula, setHoraAula] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAgendarAula = () => {
    // Lógica para agendar a aula
    console.log(
      `Aula agendada com ${alunoSelecionado} em ${dataAula} às ${horaAula}`,
    );
    // Limpar os campos após agendar
    setAlunoSelecionado('');
    setDataAula('');
    setHoraAula('');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Aula</Text>
      <Picker
        selectedValue={alunoSelecionado}
        style={styles.picker}
        onValueChange={(itemValue) => setAlunoSelecionado(itemValue)}
      >
        <Picker.Item label="Selecione um aluno" value="" />
        {alunos.map((aluno) => (
          <Picker.Item key={aluno.id} label={aluno.nome} value={aluno.nome} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Data (DD/MM/AAAA)"
        value={dataAula}
        onChangeText={setDataAula}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora (HH:MM)"
        value={horaAula}
        onChangeText={setHoraAula}
      />
      <Button title="Agendar" onPress={handleAgendarAula} />
    </View>
  );
}

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
  picker: {
    height: 50,
    width: '100%',
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
/*
AGENDAR AULA
Entrada de texto pro nome do aluno 
Data e hora da aula
Botão de agendar
--------------------------

Lista de aulas agendadas com:
Nome do aluno
Data e hora da aula
*/
