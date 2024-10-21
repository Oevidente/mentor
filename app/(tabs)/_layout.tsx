import { Tabs } from 'expo-router';
import React from 'react';
import { AlunosProvider } from './AlunoContext';
import { TabBarIcon } from '../../components/navigation/TabBarIcon';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from 'react-native';
import 'react-native-get-random-values';

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
      </Tabs>
    </AlunosProvider>
  );
}
