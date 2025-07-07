import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function Reagendar() {
  const [novaData, setNovaData] = useState('');
  const [erro, setErro] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const router = useRouter();

  const { cliente, servico, dataOriginal } = useLocalSearchParams();

  const confirmarReagendamento = () => {
    if (!novaData) {
      setErro(true);
      return;
    }

    setErro(false);
    setConfirmado(true);

    setTimeout(() => {
      router.replace('/Prestador/Agenda');
    }, 3000);
  };

  return (
    <View style={styles.container}>
      {!confirmado ? (
        <>
          <Text style={styles.titulo}>Escolha uma nova data:</Text>

          <Calendar
            onDayPress={(day) => setNovaData(day.dateString)}
            markedDates={{
              [novaData]: { selected: true, selectedColor: '#2A7BD2' },
            }}
            theme={{
              todayTextColor: '#2A7BD2',
              arrowColor: '#2A7BD2',
              monthTextColor: '#2A7BD2',
            }}
          />

          {erro && (
            <Text style={styles.avisoErro}>
              ⚠️ Selecione uma data para reagendamento
            </Text>
          )}

          <TouchableOpacity style={styles.botao} onPress={confirmarReagendamento}>
            <Text style={styles.textoBotao}>Reagendar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.confirmacao}>
          <Text style={styles.mensagem}>✅ Serviço reagendado com sucesso!</Text>
          <Text style={styles.subtexto}>
            Nova data sugerida: {novaData}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'center' },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  botao: { backgroundColor: '#2A7BD2', padding: 16, borderRadius: 8, marginTop: 24 },
  textoBotao: { color: '#fff', fontSize: 16, textAlign: 'center' },
  confirmacao: { alignItems: 'center' },
  mensagem: { fontSize: 20, color: '#28A745', fontWeight: 'bold', marginBottom: 12 },
  subtexto: { fontSize: 16, color: '#555' },
  avisoErro: {
    marginTop: 16,
    fontSize: 15,
    color: '#d9534f',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});