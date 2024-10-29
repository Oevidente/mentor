import { Tabs } from 'expo-router';
import React, { forwardRef, useState, useEffect } from 'react'; // Import forwardRef, useState, useEffect
import { AlunosProvider } from './AlunoContext';
import { TabBarIcon } from '../../components/navigation/TabBarIcon';
import { Colors } from '../../constants/Colors';
import { useColorScheme, ActivityIndicator } from 'react-native';
import 'react-native-get-random-values';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate fetching data
      await AsyncStorage.getItem('someData');
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <AlunosProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'home' : 'home-outline'}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="alunos"
          options={{
            title: 'Alunos',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'list-circle' : 'list-circle-outline'}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="agenda"
          options={{
            title: 'Agenda',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'calendar-sharp' : 'calendar-outline'}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="historico"
          options={{
            title: 'Historico',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? 'code-slash' : 'code-slash-outline'}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="cadastrar-aluno"
          options={{
            tabBarButton: () => null, // Isso esconde a aba
          }}
        />
        <Tabs.Screen
          name="AlunoDetalhes"
          options={{
            tabBarButton: () => null, // Isso esconde a aba
          }}
        />
        <Tabs.Screen
          name="EditarAluno"
          options={{
            tabBarButton: () => null, // Isso esconde a aba
          }}
        />
      </Tabs>
      <Toast />
    </AlunosProvider>
  );
}
