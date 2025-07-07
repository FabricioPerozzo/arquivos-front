// app/Prestador/PainelFornecedor.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function PainelFornecedor() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📌 Painel do Prestador</Text>

      <TouchableOpacity style={styles.botao} onPress={() => router.push('/Prestador/CadastraServico')}>
        <Text style={styles.textoBotao}>Cadastrar Novo Serviço</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => router.push('/Prestador/Agenda')}>
        <Text style={styles.textoBotao}>Ver Agendamentos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'center' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 40, textAlign: 'center', color: '#2A7BD2' },
  botao: {
    backgroundColor: '#2A7BD2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  textoBotao: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
