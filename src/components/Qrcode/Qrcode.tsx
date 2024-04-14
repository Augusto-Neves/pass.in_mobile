import { colors } from '@/styles/colors';
import QRCodeSvg from 'react-native-qrcode-svg';

type QrcodeProps = {
  size: number;
  value: string;
};

export function Qrcode({ size, value }: QrcodeProps) {
  return (
    <QRCodeSvg
      size={size}
      value={value}
      color={colors.white}
      backgroundColor="transparent"
    />
  );
}
