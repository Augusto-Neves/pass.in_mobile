import { Input } from '@/components/Input/Input';
import { View, Image, Alert, StatusBar } from 'react-native';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/styles/colors';
import { Button } from '@/components/Button/Button';
import { Link, router } from 'expo-router';
import { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleRegister() {
    if (!name.trim() || !email.trim()) {
      return Alert.alert('Inscrição', 'Preencha todos os campos.');
    }

    router.navigate('/ticket');
  }

  return (
    <View className="flex-1 items-center justify-center bg-green-500 p-8">
      <StatusBar barStyle="light-content"/>
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
            textContentType='emailAddress'
            autoComplete='email'
            autoCapitalize='none'
            value={email}
            onChangeText={setEmail}
          />
        </Input>
      </View>

      <Button title="Realizar inscrição" onPress={handleRegister} />

      <Link
        href="/"
        className="text-gray-100 text-base font-bold text-center mt-8"
      >
        Já possui ingresso?
      </Link>
    </View>
  );
}
