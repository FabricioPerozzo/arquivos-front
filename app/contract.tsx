import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ContractScreen() {
  const { name, price, service } = useLocalSearchParams();
  const router = useRouter();

  const [days, setDays] = useState('');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState('');

  const numericPrice = Number(price);
  const numericDays = Number(days);
  const total = isNaN(numericDays) ? 0 : numericDays * numericPrice;

  const handleConfirm = () => {
    if (!days || isNaN(numericDays) || numericDays <= 0) {
      Alert.alert('Erro', 'Informe uma quantidade válida de dias.');
      return;
    }

    router.push({
      pathname: '/payment',
      params: {
        nome: name,
        valor: total.toFixed(2),
        service,
        days: days,
        location,
        notes,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmar Contratação</Text>

      <Text style={styles.label}>Serviço:</Text>
      <Text style={styles.value}>{service}</Text>

      <Text style={styles.label}>Prestador:</Text>
      <Text style={styles.value}>{name}</Text>

      <Text style={styles.label}>Preço por dia:</Text>
      <Text style={styles.value}>R$ {numericPrice.toFixed(2)}</Text>

      <Text style={styles.label}>Quantidade de dias:</Text>
      <TextInput
        style={styles.compactInput}
        keyboardType="numeric"
        placeholder="Ex: 3"
        value={days}
        onChangeText={setDays}
      />

      <Text style={styles.label}>Localização do serviço:</Text>
      <TextInput
        style={styles.compactInput}
        placeholder="Ex: Rua das Flores, 123"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Observações:</Text>
      <TextInput
        style={[styles.input, styles.notesInput]}
        multiline
        numberOfLines={6}
        placeholder="Ex: Levar ferramentas específicas. Chegar às 8h."
        value={notes}
        onChangeText={setNotes}
      />

      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirmar Contratação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#2A7BD2', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, color: '#555', marginTop: 12 },
  value: { fontSize: 18, fontWeight: '600', color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 16,
    marginTop: 6,
  },
  compactInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 16,
    marginTop: 6,
  },
  notesInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A7BD2',
    marginTop: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2A7BD2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
