import { useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import moreIcon from '../../../assets/icon/more.png';
import notFavorited from '../../../assets/icon/not-favorited.png';
import favorited from '../../../assets/icon/favorited.png';
import semImagem from '../../../assets/images/sem-imagem.png';
import styles from './styles';

export default function CardProdutoHome({ data, favorite, clickFavorite }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerImagem}>
        {data.image ? (
          <Image
            source={{ uri: `data:image/jpeg;base64,${data.image}` }}
            style={{ width: '90%', height: '90%', resizeMode: 'contain', alignSelf: 'center' }}
          />
        ) : (
          <Image source={semImagem} style={{ width: '50%', height: '50%', resizeMode: 'contain', alignSelf: 'center' }} />
        )}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '75%', paddingHorizontal: 8, paddingVertical: 2 }}>
        <View style={styles.containerTexto}>
          <Text style={styles.texto}> {data.name} </Text>
          <Text style={styles.texto}> {data.brand} </Text>
        </View>
        <View style={styles.containerIcon}>
          <TouchableOpacity onPress={clickFavorite}>
            <Image source={favorite ? favorited : notFavorited} style={{ alignSelf: 'flex-end' }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ProductInfo', { data })}>
            <Image source={moreIcon} style={{ alignSelf: 'flex-end' }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
