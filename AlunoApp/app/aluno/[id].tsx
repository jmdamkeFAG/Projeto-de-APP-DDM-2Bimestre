import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { getAlunoById, Aluno } from '../../src/services/alunoService';

export default function DetalhesAluno() {
  const { id } = useLocalSearchParams();
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof id === 'string') {
      getAlunoById(id)
        .then(setAluno)
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  if (!aluno) {
    return (
      <View style={styles.container}>
        <Text>Aluno não encontrado</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Detalhes do aluno',
        }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>{aluno.nome}</Text>
        <Text>Email: {aluno.email}</Text>
        <Text>CPF: {aluno.cpf}</Text>
        <Text>Data de Nascimento: {new Date(aluno.dataNasc).toLocaleDateString()}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center' },
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, marginBottom: 16 },
  item: {
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
  },
  nome: { fontWeight: 'bold', fontSize: 16 },
});