import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createAluno } from '../../src/services/alunoService';

export default function CadastroAlunoScreen() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [dataNasc, setDataNasc] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = async () => {
    if (!nome || !cpf || !email || !dataNasc) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      await createAluno({
        nome,
        cpf,
        email,
        dataNasc: dataNasc.toISOString(),
      });
      Alert.alert('Sucesso', 'Aluno cadastrado com sucesso!');
      
      setNome('');
      setCpf('');
      setEmail('');
      setDataNasc(new Date());
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível cadastrar o aluno.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Aluno</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <View style={styles.input}>
        <Text style={{ marginBottom: 6 }}>Data de Nascimento:</Text>
        <Button
          title={dataNasc.toLocaleDateString()}
          onPress={() => setShowDatePicker(true)}
        />
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={dataNasc}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDataNasc(selectedDate);
          }}
        />
      )}

      <Button title="Cadastrar Aluno" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
  },
});
