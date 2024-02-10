import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';

import TagProductInfo from '../../components/TagProductInfo';
import TabelaNutricional from '../../components/TabelaNutricional';
import voltarImg from '../../../assets/icon/voltar.png';
import semImagem from '../../../assets/images/sem-imagem.png';
import styles from './styles';

export default function ProductInfo( { route, navigation } ) {
  const { data } = route.params; 
  
  return (
    <SafeAreaView style={styles.header} >
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => { navigation.goBack()}}  style={styles.voltar}>
          <Image source={voltarImg}  style={styles.voltarIcon}/>
          <Text style={styles.voltarTxt}>Produtos</Text>
        </TouchableOpacity>
        <Text style={styles.txtNome}>{data.name}</Text>
        <View style={styles.containerImage}>
          {data.image ? 
            <Image 
              source={{uri: `data:image/jpeg;base64,${data.image}`}}  
              style={{width: '90%', height:'90%', objectFit: 'contain', alignSelf:'center' }}/>
            : <Image source={semImagem} style={{width: '40%', height:'40%', objectFit: 'contain', alignSelf:'center' }} />
          }
        </View>
        <Text style={styles.textoNegrito}>Não contém</Text>
        <View style={{ paddingVertical: 8, gap: 4 }}>
          { data.tags ? data.tags.map (tag => {
            return (
              <TagProductInfo data={tag} key={tag}/>
            )
          }) : null}
        </View>
        <Text style={styles.textoNegrito}>Marca</Text>
        <Text style={styles.texto}>{data.brand}</Text>
        <Text style={styles.textoNegrito}>Ingredientes</Text>
        <Text style={styles.texto}>{data.ingredients}</Text>
        <Text style={styles.textoNegrito}>Descrição</Text>
        <Text style={styles.texto}>{data.description}</Text>
        <TabelaNutricional data={data.nutrition_facts}/>
        <View style={{ height:25 }}/>
      </ScrollView>
    </SafeAreaView>
  )
}