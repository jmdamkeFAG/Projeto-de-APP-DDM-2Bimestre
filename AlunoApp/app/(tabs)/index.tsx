import { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { getAlunos, Aluno } from '../../src/services/alunoService';
import { Stack, useFocusEffect, useRouter } from 'expo-router';

export default function HomeScreen() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getAlunos()
      .then(setAlunos)
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const carregarAlunos = async () => {
    try {
      const data = await getAlunos();
      setAlunos(data);
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarAlunos();
    }, [])
  );

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  return (
    <><Stack.Screen
      options={{
        title: 'Lista de Alunos',
      }} /><View style={styles.container}>
        <Text style={styles.title}>Lista de Alunos</Text>
        <FlatList
          data={alunos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => router.push(`/aluno/${item.id}`)}
            >
              <Text style={styles.nome}>{item.nome}</Text>
              <Text>{item.email}</Text>
            </TouchableOpacity>
          )} />
      </View></>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center' },
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 16, borderTopWidth: 32, borderTopColor: "white" },
  item: {
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
  },
  nome: { fontWeight: 'bold', fontSize: 16 },
});