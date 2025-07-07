import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Rota das abas principais */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* Rotas da pasta Prestador */}
        <Stack.Screen name="Prestador/Agenda" options={{ title: 'Agenda' }} />
        <Stack.Screen name="Prestador/CadastraServico" options={{ title: 'Cadastrar Serviço' }} />
        <Stack.Screen name="Prestador/ServicoSalvo" options={{ title: 'Serviço Salvo' }} />
        <Stack.Screen name="Prestador/Reagendar" options={{ title: 'Reagendar' }} />
        <Stack.Screen name="Prestador/PainelFornecedor" options={{ title: 'Painel Fornecedor' }} />

        {/* Página para rotas não encontradas */}
        <Stack.Screen name="+not-found" options={{ title: 'Página não encontrada' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
