import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import WelcomeScreen from '../../screens/WelcomeScreen';
import { useRouter } from 'expo-router'; // Importando useRouter

const HomeScreen = () => {
  const router = useRouter(); // Criando a instância do router
  const [userName, setUserName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);

  const handleUserSubmit = (name: string, imageUri: string) => {
    setUserName(name);
    setUserImage(imageUri);
  };

  return userName && userImage ? (
    <View style={styles.container}>
      {/* Foto de Perfil e Nome do Usuário */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: userImage }} style={styles.profileImage} />
        <Text style={styles.userName}>{userName}</Text>
      </View>

      {/* Linha de Separador */}
      <View style={styles.separator} />

      {/* Botões */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/alunos')} // Navegando para Alunos
        >
          <Feather name="database" size={24} color="black" />
          <Text style={styles.buttonTitle}>Gerencie</Text>
          <Text style={styles.buttonSubtitle}>Seus alunos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/agenda')} // Navegando para Agenda
        >
          <Feather name="calendar" size={24} color="black" />
          <Text style={styles.buttonTitle}>Agende</Text>
          <Text style={styles.buttonSubtitle}>Suas mentorias</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.button, styles.largeButton]}
        onPress={() => router.push('/historico')} // Navegando para Histórico
      >
        <Feather name="clock" size={24} color="black" />
        <Text style={styles.buttonTitle}>Revise</Text>
        <Text style={styles.buttonSubtitle}>As mentorias passadas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.largeButton]}>
        <Image
          source={{ uri: 'https://example.com/icon4.png' }}
          style={styles.icon}
        />
        <Text style={styles.buttonTitle}>Próxima mentoria!</Text>
        <Text style={styles.buttonSubtitle}>Dia X - com fulano</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <WelcomeScreen onUserSubmit={handleUserSubmit} />
  );
};

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
  icon: {
    width: 40,
    height: 40,
    marginBottom: 8,
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

export default HomeScreen;
