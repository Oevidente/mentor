/*import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface Aluno {
  id: string;
  nome: string;
  email: string;
  telefone: string;
}

interface AlunosContextProps {
  alunos: Aluno[];
  adicionarAluno: (aluno: Aluno) => void;
}
const AlunosContext = createContext<AlunosContextProps | undefined>(undefined);

const AlunosProvider = ({ children }: { children: ReactNode }) => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  useEffect(() => {
    const storedAlunos = localStorage.getItem('alunos');
    if (storedAlunos) {
      setAlunos(JSON.parse(storedAlunos));
    }
  }, []);

  const adicionarAluno = (aluno: Aluno) => {
    const newAlunos = [...alunos, aluno];
    setAlunos(newAlunos);
    localStorage.setItem('alunos', JSON.stringify(newAlunos));
    console.log('Aluno adicionado:', aluno);
  };

  return (
    <AlunosContext.Provider value={{ alunos, adicionarAluno }}>
      {children}
    </AlunosContext.Provider>
  );
};

export { AlunosProvider, AlunosContext };
*/
import React, { createContext, useState, useEffect, ReactNode } from 'react';

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
    const storedAlunos = localStorage.getItem('alunos');
    if (storedAlunos) {
      setAlunos(JSON.parse(storedAlunos));
    }
  }, []);

  const adicionarAluno = (aluno: Aluno) => {
    const newAlunos = [...alunos, aluno];
    setAlunos(newAlunos);
    localStorage.setItem('alunos', JSON.stringify(newAlunos));
    console.log('Aluno adicionado:', aluno);
  };

  const removerAluno = (id: string) => {
    const newAlunos = alunos.filter((aluno) => aluno.id !== id);
    setAlunos(newAlunos);
    localStorage.setItem('alunos', JSON.stringify(newAlunos));
    console.log('Aluno removido:', id);
  };

  return (
    <AlunosContext.Provider value={{ alunos, adicionarAluno, removerAluno }}>
      {children}
    </AlunosContext.Provider>
  );
};

export { AlunosProvider, AlunosContext };
