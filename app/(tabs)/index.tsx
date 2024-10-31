import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import Feather from '@expo/vector-icons/Feather';
import WelcomeScreen from '../../screens/WelcomeScreen';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [nextClass, setNextClass] = useState<{
    date: string;
    student: string;
  } | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserData = async () => {
    const storedUserName = await AsyncStorage.getItem('userName');
    const storedUserImage = await AsyncStorage.getItem('userImage');
    if (storedUserName && storedUserImage) {
      setUserName(storedUserName);
      setUserImage(storedUserImage);
    }
    setLoading(false);
  };

  const fetchNextClass = useCallback(async () => {
    const storedClasses = await AsyncStorage.getItem('aulasAgendadas');
    if (storedClasses) {
      const classes = JSON.parse(storedClasses);
      const upcomingClasses = classes.filter((cls: any) => {
        const classDate = new Date(
          `${cls.data.slice(4)}-${cls.data.slice(2, 4)}-${cls.data.slice(0, 2)}T${cls.hora.slice(0, 2)}:${cls.hora.slice(2)}`,
        );
        return classDate > new Date();
      });
      if (upcomingClasses.length > 0) {
        upcomingClasses.sort((a: any, b: any) => {
          const dateA = new Date(
            `${a.data.slice(4)}-${a.data.slice(2, 4)}-${a.data.slice(0, 2)}T${a.hora.slice(0, 2)}:${a.hora.slice(2)}`,
          );
          const dateB = new Date(
            `${b.data.slice(4)}-${b.data.slice(2, 4)}-${b.data.slice(0, 2)}T${b.hora.slice(0, 2)}:${b.hora.slice(2)}`,
          );
          return dateA - dateB;
        });
        setNextClass({
          date: upcomingClasses[0].data,
          student: upcomingClasses[0].aluno,
        });
      } else {
        setNextClass(null);
      }
    }
  }, []);

  useEffect(() => {
    fetchUserData();
    fetchNextClass();
  }, [fetchNextClass]);

  const handleUserSubmit = (name: string, imageUri: string) => {
    setUserName(name);
    setUserImage(imageUri);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNextClass().then(() => setRefreshing(false));
  }, [fetchNextClass]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return userName && userImage ? (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
          onPress={() => router.push('/alunos')}
        >
          <Feather name="database" size={24} color="black" />
          <Text style={styles.buttonTitle}>Gerencie</Text>
          <Text style={styles.buttonSubtitle}>Seus alunos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push({
              pathname: '/agenda',
              params: { onNewClassAdded: fetchNextClass },
            });
          }}
        >
          <Feather name="calendar" size={24} color="black" />
          <Text style={styles.buttonTitle}>Agende</Text>
          <Text style={styles.buttonSubtitle}>Suas aulas</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/historico')}
      >
        <Feather name="clock" size={24} color="black" />
        <Text style={styles.buttonTitle}>Revise</Text>
        <Text style={styles.buttonSubtitle}>As aulas passadas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonNext}>
        <Feather name="bell" size={24} color="black" />
        <Text style={styles.buttonTitle}>Próxima aula!</Text>
        {nextClass ? (
          <Text style={styles.buttonSubtitle}>
            Dia {nextClass.date.slice(0, 2)}/{nextClass.date.slice(2, 4)}/
            {nextClass.date.slice(4)} - com {nextClass.student}
          </Text>
        ) : (
          <Text style={styles.buttonSubtitle}>Nenhuma aula agendada</Text>
        )}
      </TouchableOpacity>
      {/* Message to inform the user about pull-to-refresh */}
      <View style={styles.refreshMessageContainer}>
        <Text style={styles.refreshMessage}>Puxe para atualizar</Text>
      </View>
    </ScrollView>
  ) : (
    <WelcomeScreen onUserSubmit={handleUserSubmit} />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
    gap: 16,
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    marginTop: 32,
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E262C',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 95,
  },
  button: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    maxHeight: 95,
    marginHorizontal: 8,
  },
  buttonNext: {
    backgroundColor: '#5AC5A8',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    maxHeight: 95,
    marginHorizontal: 8,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E262C',
  },
  buttonSubtitle: {
    fontSize: 12,
    color: '#666',
    color: '#1E262C',
  },
  refreshMessageContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  refreshMessage: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;
