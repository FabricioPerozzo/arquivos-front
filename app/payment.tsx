import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function Payment() {
  const { nome, valor, service, days, location, notes } = useLocalSearchParams();
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pagamento</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Serviço:</Text>
        <Text style={styles.value}>{service}</Text>

        <Text style={styles.label}>Prestador:</Text>
        <Text style={styles.value}>{nome}</Text>

        <Text style={styles.label}>Quantidade de dias:</Text>
        <Text style={styles.value}>{days}</Text>

        <Text style={styles.label}>Localização do serviço:</Text>
        <Text style={styles.value}>{location || 'Não informado'}</Text>

        <Text style={styles.label}>Observações:</Text>
        <Text style={styles.value}>{notes || 'Nenhuma.'}</Text>

        <Text style={[styles.label, { marginTop: 20 }]}>Valor Total:</Text>
        <Text style={[styles.value, { fontSize: 22, fontWeight: 'bold', color: '#2A7BD2' }]}>
          R$ {valor}
        </Text>
      </View>

      <View style={styles.qrContainer}>
        <Text style={styles.label}>Escaneie o QR Code</Text>
        <Image
          source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=R$' + valor }}
          style={styles.qr}
        />
      </View>

      <Text style={styles.warning}>
        * Caso seja necessário mais dias de serviço, favor realizar um novo pedido.
      </Text>

    <TouchableOpacity
  style={styles.button}
  onPress={() =>
    router.push({
      pathname: '/proof',
      params: {
        receiptNumber: `PS-${Date.now()}`, // Gera número único
        valor: valor,
        nome: nome,
        service: service,
      },
    })
  }
>
  <Text style={styles.buttonText}>Pagar com PIX</Text>
</TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2A7BD2',
  },
  infoBox: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  qr: {
    width: 180,
    height: 180,
    marginTop: 8,
  },
  warning: {
    color: 'red',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#2A7BD2',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
