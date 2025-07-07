import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AvaliarServico() {
  const router = useRouter();

  const [nomePrestador, setNomePrestador] = useState('');
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState('');
  const [mensagemConfirmacao, setMensagemConfirmacao] = useState('');

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setNota(i)} activeOpacity={0.7}>
          <Ionicons
            name={i <= nota ? 'star' : 'star-outline'}
            size={36}
            color="#f1c40f"
            style={{ marginHorizontal: 4 }}
          />
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.starsContainer}>
        {stars}
      </View>
    );
  };

  const handleSubmit = () => {
    if (!nomePrestador.trim()) {
      Alert.alert('Erro', 'Por favor, insira o nome do prestador.');
      return;
    }
    if (nota < 1 || nota > 5) {
      Alert.alert('Erro', 'Por favor, selecione uma nota entre 1 e 5 estrelas.');
      return;
    }

    // Aqui você pode salvar a avaliação no backend ou AsyncStorage
    // Por enquanto só mostra mensagem de confirmação

    setMensagemConfirmacao('Avaliação registrada! Obrigado pelo feedback.');

    setTimeout(() => {
      router.replace('/home'); // volta para a Home após 2 segundos
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avaliar Serviço</Text>

      <Text style={styles.label}>Nome do Prestador</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do prestador"
        value={nomePrestador}
        onChangeText={setNomePrestador}
      />

      <Text style={styles.label}>Nota</Text>
      {renderStars()}

      <Text style={styles.label}>Comentário</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Deixe seu comentário (opcional)"
        multiline
        numberOfLines={4}
        value={comentario}
        onChangeText={setComentario}
        textAlignVertical="top"
      />

      {mensagemConfirmacao ? (
        <Text style={styles.confirmMessage}>{mensagemConfirmacao}</Text>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enviar Avaliação</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2A7BD2',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
  },
  textArea: {
    height: 100,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2A7BD2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  confirmMessage: {
    textAlign: 'center',
    color: '#28a745',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
});
