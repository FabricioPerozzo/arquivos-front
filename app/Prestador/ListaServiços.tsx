import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';

type Servico = {
  id: string;
  nome: string;
  tipo: string;
  valor: string;
  mensagem: string;
};

export default function ListaServicos() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const router = useRouter();

  // Carrega os serviços sempre que a tela for focada
  useFocusEffect(
    useCallback(() => {
      const carregarServicos = async () => {
        try {
          const data = await AsyncStorage.getItem('servicos');
          const lista = data ? JSON.parse(data) : [];
          setServicos(lista);
        } catch (error) {
          console.error('Erro ao carregar serviços:', error);
        }
      };

      carregarServicos();
    }, [])
  );

  const renderItem = ({ item }: { item: Servico }) => (
    <View style={styles.card}>
      <Text style={styles.label}>Nome: <Text style={styles.value}>{item.nome}</Text></Text>
      <Text style={styles.label}>Tipo: <Text style={styles.value}>{item.tipo}</Text></Text>
      <Text style={styles.label}>Valor: <Text style={styles.value}>R$ {item.valor}</Text></Text>
      <Text style={styles.label}>Mensagem: <Text style={styles.value}>{item.mensagem}</Text></Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Serviços</Text>

      {servicos.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum serviço cadastrado ainda.</Text>
      ) : (
        <FlatList
          data={servicos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => router.back()}
      >
        <Text style={styles.botaoTexto}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#2A7BD2' },
  card: {
    backgroundColor: '#f4f4f4',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  label: { fontWeight: 'bold', color: '#333', fontSize: 16, marginBottom: 4 },
  value: { fontWeight: 'normal', color: '#555' },
  emptyText: { fontSize: 16, color: '#999', textAlign: 'center', marginTop: 40 },
  botaoVoltar: {
    backgroundColor: '#6c757d',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
