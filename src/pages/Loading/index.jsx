import { Text, View, SafeAreaView } from 'react-native';

import styles from './styles';

export default function Loading() {
  return (
    <SafeAreaView style={styles.header}>
      <View>
        <Text>Tela de Carregar</Text>
      </View>
    </SafeAreaView>
  )
}