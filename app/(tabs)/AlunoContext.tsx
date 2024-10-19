import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface Aluno {
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
  };

  return (
    <AlunosContext.Provider value={{ alunos, adicionarAluno }}>
      {children}
    </AlunosContext.Provider>
  );
};

export { AlunosProvider, AlunosContext };
