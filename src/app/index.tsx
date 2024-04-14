import { Input } from '@/components/Input/Input';
import { View, Image, Alert, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/styles/colors';
import { Button } from '@/components/Button/Button';
import { Link, router } from 'expo-router';
import { useState } from 'react';

export default function Home() {
  const [eventCode, setEventCode] = useState('');

  function handleAccessCredential() {
    if (!eventCode.trim()) {
      return Alert.alert('Credencial', 'Informe o código do evento.');
    }

    router.navigate('/ticket');
  }

  return (
    <View className="flex-1 items-center justify-center bg-green-500 p-8">
      <StatusBar barStyle="light-content" />
      <Image
        source={require('@/assets/logo.png')}
        className="h-16 mb-12"
        resizeMode="contain"
      />
      <View className="w-full">
        <Input>
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={20}
            color={colors.green[200]}
          />

          <Input.Field
            placeholder="Código do evento"
            onChangeText={setEventCode}
          />
        </Input>
      </View>

      <Button title="Acessar credencial" onPress={handleAccessCredential} />

      <Link
        href="/register"
        className="text-gray-100 text-base font-bold text-center mt-8"
      >
        Ainda não possui ingresso?
      </Link>
    </View>
  );
}
