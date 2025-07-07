
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const pedidosMock = [
  {
    id: '1',
    cliente: 'Ana Paula',
    servico: 'Pintor',
    data: '2025-07-06',
    endereco: 'Rua das Flores, 123 – Joaçaba/SC',
    valor: '150.00',
  },
  {
    id: '2',
    cliente: 'Carlos Eduardo',
    servico: 'Encanador',
    data: '2025-07-08',
    endereco: 'Av. Brasil, 456 – Joaçaba/SC',
    valor: '200.00',
  },
];

export default function Agenda() {
  const router = useRouter();

  const aceitarAgendamento = (id: string) => {
    console.log('Agendamento aceito:', id);
    // TODO: salvar na agenda oficial
  };

  const reagendar = (pedido: typeof pedidosMock[0]) => {
    router.push({
      pathname: '/Prestador/Reagendar',
      params: {
        id: pedido.id,
        cliente: pedido.cliente,
        servico: pedido.servico,
        dataOriginal: pedido.data,
      },
    });
  };

  const voltarParaPainel = () => {
    router.replace('/Prestador/PainelFornecedor');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>📋 Agendamentos pendentes</Text>

        {pedidosMock.map(pedido => (
          <View key={pedido.id} style={styles.card}>
            <Text style={styles.item}><Text style={styles.label}>Cliente:</Text> {pedido.cliente}</Text>
            <Text style={styles.item}><Text style={styles.label}>Serviço:</Text> {pedido.servico}</Text>
            <Text style={styles.item}><Text style={styles.label}>Data:</Text> {pedido.data}</Text>
            <Text style={styles.item}><Text style={styles.label}>Endereço:</Text> {pedido.endereco}</Text>
            <Text style={styles.item}><Text style={styles.label}>Valor pago:</Text> R$ {pedido.valor}</Text>

            <View style={styles.botoes}>
              <TouchableOpacity
                style={[styles.botao, styles.aceitar]}
                onPress={() => aceitarAgendamento(pedido.id)}
              >
                <Text style={styles.botaoTexto}>Aceitar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.botao, styles.reagendar]}
                onPress={() => reagendar(pedido)}
              >
                <Text style={styles.botaoTexto}>Reagendar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.botaoVoltar} onPress={voltarParaPainel}>
        <Text style={styles.botaoVoltarTexto}>Voltar para o Painel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#2A7BD2' },
  card: {
    backgroundColor: '#f4f4f4',
    padding: 20,
    borderRadius: 10,
    marginBottom: 24,
    elevation: 2,
  },
  label: { fontWeight: 'bold', color: '#333' },
  item: { fontSize: 16, marginVertical: 4, color: '#555' },
  botoes: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  botao: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  aceitar: { backgroundColor: '#2A7BD2' },
  reagendar: { backgroundColor: '#F39C12' },
  botaoTexto: { color: '#fff', fontWeight: '600' },
  botaoVoltar: {
    backgroundColor: '#6c757d',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoVoltarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});