import { Slot } from 'expo-router';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { Loading } from '@/components/Loading/Loading';
import { View } from 'react-native';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <>
      <View className="flex-1 bg-green-500">
        {fontsLoaded ? <Slot /> : <Loading />}
      </View>
    </>
  );
}
