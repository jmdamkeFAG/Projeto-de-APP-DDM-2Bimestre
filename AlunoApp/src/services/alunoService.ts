import { API_URL } from '../../constants/api';

export interface Aluno {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  dataNasc: string;
}

export async function getAlunos(): Promise<Aluno[]> {
  const response = await fetch(`${API_URL}/alunos`);
  if (!response.ok) throw new Error('Erro ao buscar alunos');
  return response.json();
}

export async function getAluno(id: string): Promise<Aluno> {
  const response = await fetch(`${API_URL}/alunos/${id}`);
  if (!response.ok) throw new Error('Erro ao buscar aluno');
  return response.json();
}

export async function createAluno(aluno: Omit<Aluno, 'id'>): Promise<Aluno> {
  const response = await fetch(`${API_URL}/alunos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(aluno),
  });
  if (!response.ok) throw new Error('Erro ao criar aluno');
  return response.json();
}
