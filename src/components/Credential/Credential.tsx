import { colors } from '@/styles/colors';
import { Feather } from '@expo/vector-icons';
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Qrcode } from '@/components/Qrcode/Qrcode';

type CredentialProps = {
  image?: string;
  onChangeAvatar?: () => void;
  onShowQrcode?: () => void;
};

export function Credential({
  onChangeAvatar,
  onShowQrcode,
  image,
}: CredentialProps) {
  return (
    <View className="w-full self-stretch items-center">
      <Image
        className="w-24 h-52 z-10"
        source={require('@/assets/ticket/band.png')}
      />

      <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-3 rounded-2xl -mt-5">
        <ImageBackground
          className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden"
          source={require('@/assets/ticket/header.png')}
        >
          <View className="w-full flex-row items-center justify-between ">
            <Text className="text-zinc-50 text-sm font-bold">NLW Unite</Text>
            <Text className="text-zinc-50 text-sm font-bold">#123</Text>
          </View>

          <View className="h-40 w-40 bg-black rounded-full" />
        </ImageBackground>

        {image ? (
          <TouchableOpacity onPress={onChangeAvatar} activeOpacity={0.9}>
            <Image
              source={{ uri: image }}
              className="w-36 h-36 rounded-full -mt-24"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={onChangeAvatar}
            activeOpacity={0.9}
            className="w-36 h-36 rounded-full -mt-24 bg-gray-400 items-center justify-center"
          >
            <Feather name="camera" color={colors.green[400]} size={32} />
          </TouchableOpacity>
        )}

        <Text className="text-zinc-50 font-bold text-2xl mt-4">
          Augusto Neves
        </Text>
        <Text className="font-regular text-base text-zinc-300 mb-4">
          augusto@email.com
        </Text>

        <Qrcode size={120} value="tat1736" />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-6"
          onPress={onShowQrcode}
        >
          <Text className="font-bold text-orange-500 text-sm">
            Ampliar QR Code
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
