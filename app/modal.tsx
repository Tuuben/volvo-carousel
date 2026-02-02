import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text>This is a modal</Text>
      <Animated.Image
        source={require('@/assets/images/xc90_recharge.jpg')}
        style={{ width: '100%', height: 240 }}
      />

      <Link href="/" dismissTo style={styles.link}>
        <Text>Go to home screen</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
