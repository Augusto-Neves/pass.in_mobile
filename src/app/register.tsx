import axios from 'axios';
import { Input } from '@/components/Input/Input';
import { View, Image, Alert, StatusBar } from 'react-native';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/styles/colors';
import { Button } from '@/components/Button/Button';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { api } from '@/server/api';
import { useBadgeStore } from '@/store/badge-store';

const EVENT_ID = process.env.EXPO_PUBLIC_EVENT_ID;

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { saveBadgeData } = useBadgeStore();

  async function handleRegister() {
    try {
      if (!name.trim() || !email.trim()) {
        return Alert.alert('Inscrição', 'Preencha todos os campos.');
      }

      setIsLoading(true);

      const registerResponse = await api.post(`events/${EVENT_ID}/attendees`, {
        name,
        email,
      });

      const attendeeId = registerResponse.data.attendeeId;

      if (attendeeId) {
        const badgeResponse = await api.get(
          `attendees/${attendeeId}/badge`
        );
 
        saveBadgeData(badgeResponse.data.badge);
        Alert.alert('Inscrição', 'Inscrição realizada com sucesso!', [
          { text: 'ver meu ticket', onPress: () => router.navigate('/ticket') },
        ]);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response, 'Error');
        if (
          String(err.response?.data.message).includes(
            'Attendee already registered.'
          )
        ) {
          return Alert.alert('Inscrição', 'Esse e-mail já está cadastrado!');
        }
      }

      setIsLoading(false);
      Alert.alert('Inscrição', 'Não foi possível realizar a inscrição.');
    }
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
          <FontAwesome6
            name="user-circle"
            size={20}
            color={colors.green[200]}
          />

          <Input.Field
            placeholder="Nome completo"
            value={name}
            onChangeText={setName}
          />
        </Input>

        <Input>
          <MaterialIcons
            name="alternate-email"
            size={20}
            color={colors.green[200]}
          />

          <Input.Field
            placeholder="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </Input>
      </View>

      <Button
        title="Realizar inscrição"
        onPress={handleRegister}
        isLoading={isLoading}
      />

      <Link
        href="/"
        className="text-gray-100 text-base font-bold text-center mt-8"
      >
        Já possui ingresso?
      </Link>
    </View>
  );
}
