import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function Scheduling() {
  const [dataSelecionada, setDataSelecionada] = useState('');
  const router = useRouter();
  const { receiptNumber, valor, nome, service } = useLocalSearchParams();

  const agendar = () => {
    if (!dataSelecionada) {
      Alert.alert('Selecione uma data antes de agendar.');
      return;
    }

    router.push({
      pathname: '/scheduledservice',
      params: {
        data: dataSelecionada,
        receiptNumber,
        valor,
        nome,
        service,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Escolha a data do serviço</Text>

      <Calendar
        onDayPress={day => setDataSelecionada(day.dateString)}
        markedDates={{
          [dataSelecionada]: {
            selected: true,
            selectedColor: '#2A7BD2',
          },
        }}
        theme={{
          todayTextColor: '#2A7BD2',
          arrowColor: '#2A7BD2',
          monthTextColor: '#2A7BD2',
          textSectionTitleColor: '#333',
          textMonthFontWeight: 'bold',
          textMonthFontSize: 18,
        }}
      />

      <TouchableOpacity style={styles.botao} onPress={agendar}>
        <Text style={styles.textoBotao}>Agendar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'center' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  botao: {
    backgroundColor: '#2A7BD2',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  textoBotao: { color: '#fff', fontSize: 16, textAlign: 'center' },
});
