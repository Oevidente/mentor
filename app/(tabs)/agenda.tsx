import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlunosContext } from './AlunoContext';
import Icon from 'react-native-vector-icons/Ionicons';

function AgendaTab() {
  const { alunos } = useContext(AlunosContext);
  const [alunoSelecionado, setAlunoSelecionado] = useState('');
  const [dataAula, setDataAula] = useState('');
  const [horaAula, setHoraAula] = useState('');
  const [loading, setLoading] = useState(false);
  const [aulasAgendadas, setAulasAgendadas] = useState([]);

  useEffect(() => {
    const loadAulasAgendadas = async () => {
      setLoading(true);
      try {
        const storedAulas = await AsyncStorage.getItem('aulasAgendadas');
        if (storedAulas) {
          const aulas = JSON.parse(storedAulas);
          if (Array.isArray(aulas)) {
            setAulasAgendadas(aulas);
          }
        }
      } catch (error) {
        console.error('Failed to load aulas agendadas', error);
      } finally {
        setLoading(false);
      }
    };

    loadAulasAgendadas();
  }, []);

  useEffect(() => {
    const saveAulasAgendadas = async () => {
      try {
        await AsyncStorage.setItem(
          'aulasAgendadas',
          JSON.stringify(aulasAgendadas),
        );
      } catch (error) {
        console.error('Failed to save aulas agendadas', error);
      }
    };

    saveAulasAgendadas();
  }, [aulasAgendadas]);

  const handleAgendarAula = () => {
    if (!alunoSelecionado || !dataAula || !horaAula) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const novaAula = {
      id: Date.now().toString(),
      aluno: alunoSelecionado,
      data: dataAula,
      hora: horaAula,
      cumprida: false,
    };

    setAulasAgendadas((prevAulas) => {
      const novasAulas = [...prevAulas, novaAula];
      return novasAulas.sort((a, b) => {
        const dataHoraA = new Date(
          `${a.data.slice(4)}-${a.data.slice(2, 4)}-${a.data.slice(0, 2)}T${a.hora.slice(0, 2)}:${a.hora.slice(2)}`,
        );
        const dataHoraB = new Date(
          `${b.data.slice(4)}-${b.data.slice(2, 4)}-${b.data.slice(0, 2)}T${b.hora.slice(0, 2)}:${b.hora.slice(2)}`,
        );
        return dataHoraB - dataHoraA;
      });
    });

    console.log(
      `Aula agendada com ${alunoSelecionado} em ${dataAula} às ${horaAula}`,
    );
    setAlunoSelecionado('');
    setDataAula('');
    setHoraAula('');
  };

  const handleExcluirAula = (id) => {
    setAulasAgendadas((prevAulas) => {
      const novasAulas = prevAulas.filter((aula) => aula.id !== id);
      return novasAulas.sort((a, b) => {
        const dataHoraA = new Date(
          `${a.data.slice(4)}-${a.data.slice(2, 4)}-${a.data.slice(0, 2)}T${a.hora.slice(0, 2)}:${a.hora.slice(2)}`,
        );
        const dataHoraB = new Date(
          `${b.data.slice(4)}-${b.data.slice(2, 4)}-${b.data.slice(0, 2)}T${b.hora.slice(0, 2)}:${b.hora.slice(2)}`,
        );
        return dataHoraB - dataHoraA;
      });
    });
  };

  const handleMarcarComoCumprida = (id) => {
    setAulasAgendadas((prevAulas) => {
      const novasAulas = prevAulas.map((aula) => {
        if (aula.id === id) {
          return { ...aula, cumprida: !aula.cumprida };
        }
        return aula;
      });
      // Atualiza o AsyncStorage sempre que uma aula é marcada como cumprida
      AsyncStorage.setItem('aulasAgendadas', JSON.stringify(novasAulas));
      return novasAulas;
    });
  };

  const formatarData = (data) => {
    return data.slice(0, 2) + '/' + data.slice(2, 4) + '/' + data.slice(4);
  };

  const formatarHora = (hora) => {
    return hora.slice(0, 2) + ':' + hora.slice(2) + ' horas';
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={[styles.button, styles.aulaItem]}>
      <Text style={styles.alunoNome}>{item.aluno}</Text>
      <Text>
        {formatarData(item.data)} às {formatarHora(item.hora)}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => handleMarcarComoCumprida(item.id)}
          style={styles.markButton}
        >
          <Icon
            name={
              item.cumprida ? 'checkmark-circle' : 'checkmark-circle-outline'
            }
            size={24}
            color={item.cumprida ? 'green' : '#000'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleExcluirAula(item.id)}
          style={styles.deleteButton}
        >
          <Icon name="trash-outline" size={24} color="#ff4d4d" />
        </TouchableOpacity>
      </View>
    </View>
  );

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
        placeholder="Data (DDMMAAAA sem '/')"
        value={dataAula}
        onChangeText={setDataAula}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora (HHMM sem ':')"
        value={horaAula}
        onChangeText={setHoraAula}
      />
      <Button title="Agendar" onPress={handleAgendarAula} />
      <Text style={styles.subtitle}>Aulas Agendadas</Text>
      <FlatList
        data={aulasAgendadas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
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
  button: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    maxHeight: 114,
  },
  aulaItem: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alunoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  markButton: {
    padding: 8,
  },
  deleteButton: {
    padding: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
  },
});

export default AgendaTab;
