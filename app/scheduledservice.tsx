import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ScheduledService() {
  const router = useRouter();
  const { data, valor, nome, service, receiptNumber } = useLocalSearchParams();

  const voltarParaHome = () => {
    router.replace('/home'); // evita voltar para o comprovante
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendamento de serviço realizado ✅</Text>

      <View style={styles.box}>
        <Text style={styles.label}>Comprovante Nº:</Text>
        <Text style={styles.value}>#{receiptNumber}</Text>

        <Text style={styles.label}>Serviço:</Text>
        <Text style={styles.value}>{service}</Text>

        <Text style={styles.label}>Prestador:</Text>
        <Text style={styles.value}>{nome}</Text>

        <Text style={styles.label}>Data agendada:</Text>
        <Text style={styles.value}>{data}</Text>

        <Text style={styles.label}>Valor:</Text>
        <Text style={styles.value}>R$ {valor}</Text>
      </View>

      <TouchableOpacity style={styles.botao} onPress={voltarParaHome}>
        <Text style={styles.botaoTexto}>Voltar para o início</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#2A7BD2', textAlign: 'center' },
  box: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 32,
  },
  label: { fontSize: 14, color: '#555', marginTop: 12 },
  value: { fontSize: 16, fontWeight: 'bold', color: '#000', marginTop: 2 },
  botao: { backgroundColor: '#2A7BD2', padding: 16, borderRadius: 8 },
  botaoTexto: { color: '#fff', fontSize: 16, textAlign: 'center' },
});
