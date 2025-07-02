import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface Provider {
  id: string;
  name: string;
  price: number; // preço por dia
  rating: number;
}

const providersData: Record<string, Provider[]> = {
  Pintor: [
    { id: '1', name: 'Carlos Pinturas', price: 50, rating: 4.5 },
    { id: '2', name: 'João das Tintas', price: 45, rating: 4.0 },
  ],
  Encanador: [
    { id: '3', name: 'Maria Hidráulica', price: 70, rating: 4.7 },
    { id: '4', name: 'Pedro Reparos', price: 65, rating: 4.3 },
  ],
  Pedreiro: [
    { id: '5', name: 'Luís Construções', price: 80, rating: 4.8 },
    { id: '6', name: 'Ana Obras', price: 75, rating: 4.2 },
  ],
};

export default function Providers() {
  const router = useRouter();
  const { service } = useLocalSearchParams();

  const providers = service && providersData[service as string] ? providersData[service as string] : [];

  const handleSelectProvider = (provider: Provider) => {
    router.push({
      pathname: '/contract',
      params: {
        name: provider.name,
        price: provider.price.toString(),
        service: service as string,
      },
    });
  };

  if (!service) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>Serviço não especificado.</Text>
      </View>
    );
  }

  if (providers.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>Nenhum prestador encontrado para {service}.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prestadores para: {service}</Text>
      <FlatList
        data={providers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleSelectProvider(item)}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.details}>Preço: R$ {item.price.toFixed(2)} / dia</Text>
            <Text style={styles.details}>Avaliação: {item.rating} ⭐</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  message: { fontSize: 18, color: '#777' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#2A7BD2' },
  card: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  details: { fontSize: 14, color: '#555' },
});
