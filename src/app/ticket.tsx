import { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  Share,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Credential } from '@/components/Credential/Credential';
import { Header } from '@/components/Header/Header';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '@/styles/colors';
import { Button } from '@/components/Button/Button';
import * as ImagePicker from 'expo-image-picker';
import { Qrcode } from '@/components/Qrcode/Qrcode';
import { useBadgeStore } from '@/store/badge-store';
import { Redirect } from 'expo-router';
import { MotiView } from 'moti';

export default function Ticket() {
  const [expandQRCode, setExpandQRCode] = useState(false);
  const { badgeData, removeBadgeData, updateAvatar } = useBadgeStore();

  async function handleSelectImage() {
    try {
      const results = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      });

      if (results.assets) {
        updateAvatar(results.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Foto', 'Não foi possível selecionar a imagem.');
    }
  }

  async function handleShareTicket() {
    try {
      if (badgeData?.checkInUrl) {
        await Share.share({
          message: badgeData.checkInUrl,
        });
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Compartilhar', 'Não foi possível compartilhar o ingresso.');
    }
  }

  function handleRemoveBadge() {
    Alert.alert(
      'Remover Ingresso',
      'Tem certeza que deseja remover seu ingresso?',
      [{ text: 'Sim', onPress: () => removeBadgeData() }, { text: 'Não' }]
    );
  }

  if (!badgeData) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" />
      <Header title="Minha Credencial" />

      <ScrollView
        className="-mt-28 -z-10"
        contentContainerStyle={{ paddingHorizontal: 32, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <Credential
          data={badgeData}
          onChangeAvatar={handleSelectImage}
          onShowQRcode={() => setExpandQRCode(true)}
        />

        <MotiView
          from={{
            translateY: 0,
          }}
          animate={{
            translateY: 10,
          }}
          transition={{
            loop: true,
            type: 'timing',
            duration: 700,
          }}
        >
          <FontAwesome
            style={{ alignSelf: 'center', marginVertical: 24 }}
            name="angle-double-down"
            size={24}
            color={colors.gray[300]}
          />
        </MotiView>

        <Text className="text-white font-bold text-2xl mt-4">
          Compartilhar credencial
        </Text>

        <Text className="text-white font-regular text-base mt-1 mb-6">
          Mostre ao mundo que você vai participar do {badgeData.eventTitle}!
        </Text>

        <Button title="Compartilhar" onPress={handleShareTicket} />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-10"
          onPress={handleRemoveBadge}
        >
          <Text className="text-base text-white font-bold text-center">
            Remover Ingresso
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={expandQRCode} statusBarTranslucent animationType="slide">
        <View className="flex-1 items-center justify-center bg-green-500">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setExpandQRCode(false)}
          >
            <Qrcode size={300} value={badgeData.checkInUrl} />
            <Text className="text-orange-500 font-bold text-sm  text-center mt-10">
              Fechar QRCode
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
