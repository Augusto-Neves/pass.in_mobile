import { colors } from '@/styles/colors';
import { ReactNode } from 'react';
import { TextInput, View, TextInputProps } from 'react-native';

function Input({ children }: { children: ReactNode }) {
  return (
    <View className="w-full h-14 flex-row items-center p-2 border border-green-400 rounded-lg my-3">
      {children}
    </View>
  );
}

function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput
      {...rest}
      placeholderTextColor={colors.gray[200]}
      className="flex-1 h-full self-center text-white text-base font-regular pb-2 pl-2"
    />
  );
}

Input.Field = Field;

export { Input };
