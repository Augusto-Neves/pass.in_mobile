import { Input } from '@/components/Input/Input';
import { View, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/styles/colors';
import { Button } from '@/components/Button/Button';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-green-500 p-8">
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

          <Input.Field placeholder="Código do Evento" />
        </Input>
      </View>

      <Button title="Acessar credencial" />

      <Link href="/register" className='text-gray-100 text-base font-bold text-center mt-8'>
        Ainda não possui ingresso?
      </Link>
    </View>
  );
}
