import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
};

interface Aluno {
  id: string;
  nome: string;
  email: string;
  telefone: string;
}

interface AlunosContextProps {
  alunos: Aluno[];
  adicionarAluno: (aluno: Aluno) => void;
  removerAluno: (id: string) => void;
}

const AlunosContext = createContext<AlunosContextProps | undefined>(undefined);

const AlunosProvider = ({ children }: { children: ReactNode }) => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  useEffect(() => {
    const fetchStoredAlunos = async () => {
      const storedAlunos = await getData('alunos');
      if (storedAlunos) {
        setAlunos(JSON.parse(storedAlunos));
      }
    };

    fetchStoredAlunos();
  }, []);

  const adicionarAluno = async (aluno: Aluno) => {
    const newAluno = { ...aluno, id: uuid.v4() as string };
    const newAlunos = [...alunos, newAluno];
    setAlunos(newAlunos);
    await storeData('alunos', JSON.stringify(newAlunos));
    console.log('Aluno adicionado:', newAluno);
  };

  const removerAluno = async (id: string) => {
    const newAlunos = alunos.filter((aluno) => aluno.id !== id);
    setAlunos(newAlunos);
    await storeData('alunos', JSON.stringify(newAlunos));
    console.log('Aluno removido:', id);
  };

  return (
    <AlunosContext.Provider value={{ alunos, adicionarAluno, removerAluno }}>
      {children}
    </AlunosContext.Provider>
  );
};

export { AlunosProvider, AlunosContext };
