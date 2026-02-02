import { View } from 'react-native';

type GutterProps = {
  size: number;
};

export const Gutter = ({ size }: GutterProps) => (
  <View style={{ height: size, width: size }} />
);
