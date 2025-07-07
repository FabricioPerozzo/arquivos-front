import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function ServicoSalvo() {
  const router = useRouter();
  const { nome, tipo, valor, mensagem } = useLocalSearchParams();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>✅ Serviço cadastrado com sucesso!</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{nome}</Text>

        <Text style={styles.label}>Tipo:</Text>
        <Text style={styles.value}>{tipo}</Text>

        <Text style={styles.label}>Valor por dia:</Text>
        <Text style={styles.value}>R$ {valor}</Text>

        <Text style={styles.label}>Mensagem:</Text>
        <Text style={styles.value}>{mensagem}</Text>
      </View>

      <TouchableOpacity
        style={styles.botaoPrincipal}
        onPress={() => router.replace('/Prestador/PainelFornecedor')}
      >
        <Text style={styles.botaoTexto}>Ir para Painel do Fornecedor</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSecundario}
        onPress={() => router.push('/Prestador/Agenda')}
      >
        <Text style={styles.botaoTexto}>Ver solicitações de agendamento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#fff', flexGrow: 1, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 24, textAlign: 'center', color: '#2A7BD2' },
  card: {
    backgroundColor: '#f4f4f4',
    padding: 20,
    borderRadius: 12,
    marginBottom: 32
  },
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginTop: 12 },
  value: { fontSize: 16, color: '#111' },
  botaoPrincipal: {
    backgroundColor: '#2A7BD2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16
  },
  botaoSecundario: {
    backgroundColor: '#28A745',
    padding: 16,
    borderRadius: 8
  },
  botaoTexto: { textAlign: 'center', fontSize: 16, color: '#fff', fontWeight: '600' }
});
