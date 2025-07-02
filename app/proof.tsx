import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function Proof() {
  const router = useRouter();
  const { receiptNumber, valor, nome, service } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagamento realizado ✅</Text>
      <Text style={styles.details}>
        Seu pagamento foi processado com sucesso.
      </Text>

      <View style={styles.receiptBox}>
        <Text style={styles.label}>Comprovante Nº</Text>
        <Text style={styles.value}>#{receiptNumber}</Text>

        <Text style={[styles.label, { marginTop: 16 }]}>Serviço</Text>
        <Text style={styles.value}>{service}</Text>

        <Text style={[styles.label, { marginTop: 16 }]}>Prestador</Text>
        <Text style={styles.value}>{nome}</Text>

        <Text style={[styles.label, { marginTop: 16 }]}>Valor</Text>
        <Text style={styles.value}>R$ {valor}</Text>

        <Text style={[styles.label, { marginTop: 16 }]}>Data e Hora</Text>
        <Text style={styles.value}>{new Date().toLocaleString('pt-BR')}</Text>
      </View>

      <TouchableOpacity
  style={styles.button}
  onPress={() =>
    router.push({
      pathname: '/scheduling',
      params: {
        receiptNumber,
        valor,
        nome,
        service,
      },
    })
  }
>
  <Text style={styles.buttonText}>Agendar data do serviço</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, textAlign: 'center', color: '#2A7BD2' },
  details: { fontSize: 16, textAlign: 'center', marginBottom: 24, color: '#555' },
  receiptBox: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 32,
  },
  label: { fontSize: 14, color: '#666' },
  value: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  button: { backgroundColor: '#2A7BD2', padding: 16, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});
