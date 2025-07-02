import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

const services = ['Pintor', 'Encanador', 'Pedreiro'];

export default function Home() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const handlePrev = () => setIndex((index - 1 + services.length) % services.length);
  const handleNext = () => setIndex((index + 1) % services.length);

  const handleSearch = () => {
    router.push(`/providers?service=${services[index]}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Selecione o Serviço</Text>
      <Text style={styles.subtitle}>Escolha um serviço para ver os prestadores disponíveis.</Text>

      <View style={styles.selector}>
        <TouchableOpacity onPress={handlePrev}>
          <Text style={styles.arrow}>←</Text>
        </TouchableOpacity>

        <Text style={styles.service}>{services[index]}</Text>

        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Procurar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2A7BD2', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#777', marginBottom: 30, textAlign: 'center' },
  selector: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30 },
  arrow: { fontSize: 30, marginHorizontal: 20, color: '#2A7BD2' },
  service: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  button: {
    backgroundColor: '#2A7BD2',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
