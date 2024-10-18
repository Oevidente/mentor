import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export function AlunosTab() {
  return (
    <View style={styles.container}>
      {/* Botões */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Feather name="book" size={24} color="black" />
          <Text style={styles.buttonTitle}>Cursos</Text>
          <Text style={styles.buttonSubtitle}>Ver cursos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Feather name="message-square" size={24} color="black" />
          <Text style={styles.buttonTitle}>Mensagens</Text>
          <Text style={styles.buttonSubtitle}>Ver mensagens</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.button, styles.largeButton]}>
        <Feather name="activity" size={24} color="black" />
        <Text style={styles.buttonTitle}>Atividades</Text>
        <Text style={styles.buttonSubtitle}>Ver atividades</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.largeButton]}>
        <Feather name="calendar" size={24} color="black" />
        <Text style={styles.buttonTitle}>Agenda</Text>
        <Text style={styles.buttonSubtitle}>Ver agenda</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  largeButton: {
    flex: 1,
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
});

export default AlunosTab;
