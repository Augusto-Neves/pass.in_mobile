import { Input } from '@/components/Input/Input';
import { View, Image } from 'react-native';
import { FontAwesome6, MaterialIcons} from '@expo/vector-icons';
import { colors } from '@/styles/colors';
import { Button } from '@/components/Button/Button';
import { Link } from 'expo-router';

export default function Register() {
  return (
    <View className="flex-1 items-center justify-center bg-green-500 p-8">
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

          <Input.Field placeholder="Nome completo" />
        </Input>

        <Input>
          <MaterialIcons
            name="alternate-email"
            size={20}
            color={colors.green[200]}
          />

          <Input.Field placeholder="email" keyboardType='email-address'/>
        </Input>
      </View>

      <Button title="Realizar inscrição" />

      <Link
        href="/"
        className="text-gray-100 text-base font-bold text-center mt-8"
      >
        Já possui ingresso?
      </Link>
    </View>
  );
}
