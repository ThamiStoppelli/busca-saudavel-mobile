import { Text, View } from 'react-native';

import styles from './styles';

export default function TabelaNutricional( {data} ) {
  return (
    <View style={styles.container}>
      <Text style={styles.textoNegrito}> Tabela nutricional </Text>
      <View style={styles.containerTexto}>
        <Text style={styles.texto}>Quantidade da porção</Text>
        <Text style={styles.texto}>{data.serving_size ? data.serving_size : '-'}</Text>
      </View>
      <View style={styles.containerTexto}>
        <Text style={styles.texto}>Valor Energético</Text>
        <Text style={styles.texto}>{data.energy_value ? data.energy_value : '-'}</Text>
      </View>
      <View style={styles.containerTexto}>
        <Text style={styles.texto}>Carboidratos</Text>
        <Text style={styles.texto}>{data.carbohydrate ? data.carbohydrate : '-'}</Text>
      </View>
      <View style={styles.containerTexto}>
        <Text style={styles.texto}>Proteínas</Text>
        <Text style={styles.texto}>{data.protein ? data.protein : '-'}</Text>
      </View>
      <View style={styles.containerTexto}>
        <Text style={styles.texto}>Gorduras Totais</Text>
        <Text style={styles.texto}>{data.total_fat ? data.total_fat : '-'}</Text>
      </View>
      <View style={styles.containerTexto}>
        <Text style={styles.texto}>Gorduras Saturadas</Text>
        <Text style={styles.texto}>{data.fat_saturated ? data.fat_saturated : '-'}</Text>
      </View>
      <View style={styles.containerTexto}>
        <Text style={styles.texto}>Gorduras Trans</Text>
        <Text style={styles.texto}>{data.fat_trans ? data.fat_trans : '-'}</Text>
      </View>
      <View style={styles.containerTexto}>
        <Text style={styles.texto}>Fibra Alimentar</Text>
        <Text style={styles.texto}>{data.fiber ? data.fiber : '-'}</Text>
      </View>
      <View style={styles.containerTexto}>
        <Text style={styles.texto}>Sódio</Text>
        <Text style={styles.texto}>{data.sodium ? data.sodium : '-'}</Text>
      </View>
      <View style={styles.containerTexto}>
        <Text style={styles.texto}>Outros minerais</Text>
        <Text style={styles.texto}>{data.minerals ? data.minerals : '-'}</Text>
      </View>
      <View style={styles.containerTexto}>
        <Text style={styles.texto}>Vitaminas</Text>
        <Text style={styles.texto}>{data.vitamins ? data.vitamins : '-'}</Text>
      </View>
    </View>
  )
}