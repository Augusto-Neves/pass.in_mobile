import { colors } from '@/styles/colors';
import { Feather } from '@expo/vector-icons';
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Qrcode } from '@/components/Qrcode/Qrcode';
import { BadgeDataProps, useBadgeStore } from '@/store/badge-store';
import { MotiView } from 'moti';

type CredentialProps = {
  data: BadgeDataProps;
  image?: string;
  onChangeAvatar?: () => void;
  onShowQRcode?: () => void;
};

export function Credential({
  data,
  onChangeAvatar,
  onShowQRcode,
}: CredentialProps) {
  const { height } = useWindowDimensions();
  const eventId = data.eventId.split('-')[0];

  return (
    <MotiView
      from={{
        opacity: 0,
        translateY: -height,
        rotateZ: '50deg',
        rotateX: '30deg',
        rotateY: '30deg',
      }}
      animate={{
        opacity: 1,
        translateY: 0,
        rotateZ: '0deg',
        rotateX: '0deg',
        rotateY: '0deg',
      }}
      transition={{
        type: 'spring',
        damping: 20,
        rotateZ: { damping: 15, mass: 3 },
      }}
      className="w-full self-stretch items-center"
    >
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
            <Text className="text-zinc-50 text-sm font-bold">
              {data.eventTitle}
            </Text>
            <Text className="text-zinc-50 text-sm font-bold">#{eventId}</Text>
          </View>

          <View className="h-40 w-40 bg-black rounded-full" />
        </ImageBackground>

        {data.image ? (
          <TouchableOpacity onPress={onChangeAvatar} activeOpacity={0.9}>
            <Image
              source={{ uri: data.image }}
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
          {data?.name}
        </Text>
        <Text className="font-regular text-base text-zinc-300 mb-4">
          {data?.email}
        </Text>

        <Qrcode size={120} value={data.checkInUrl} />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-6"
          onPress={onShowQRcode}
        >
          <Text className="font-bold text-orange-500 text-sm">
            Ampliar QR Code
          </Text>
        </TouchableOpacity>
      </View>
    </MotiView>
  );
}
