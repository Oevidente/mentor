import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

function Historico() {
  const [aulasCumpridas, setAulasCumpridas] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const loadAulasCumpridas = async () => {
        setLoading(true);
        try {
          const storedAulas = await AsyncStorage.getItem('aulasAgendadas');
          if (storedAulas) {
            const aulas = JSON.parse(storedAulas);
            const cumpridas = aulas.filter((aula) => aula.cumprida);
            setAulasCumpridas(cumpridas);
          }
        } catch (error) {
          console.error('Failed to load aulas cumpridas', error);
        } finally {
          setLoading(false);
        }
      };

      loadAulasCumpridas();
    }, []),
  );

  const formatDate = (date) => {
    return `${date.slice(0, 2)}/${date.slice(2, 4)}/${date.slice(4)}`;
  };

  const formatTime = (time) => {
    return `${time.slice(0, 2)}:${time.slice(2)} horas`;
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
      <Text style={styles.title}>Histórico de Aulas</Text>
      <FlatList
        data={aulasCumpridas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.aulaItem}>
            <Text style={styles.alunoNome}>{item.aluno}</Text>
            <Text>
              {formatDate(item.data)} às {formatTime(item.hora)}
            </Text>
          </View>
        )}
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
    marginTop: 16,

    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1E262C', // Updated color
  },
  aulaItem: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  alunoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E262C', // Updated color
  },
});

export default Historico;
