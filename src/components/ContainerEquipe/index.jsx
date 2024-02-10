import React, { useCallback } from 'react';
import { Text, View, Image, Alert, Linking, TouchableHighlight } from 'react-native';

import styles from './styles';
import instagram from '../../../assets/icon/instagram.png';
import linkedin from '../../../assets/icon/linkedin.png';
import imgCamila from '../../../assets/images/camila.png';
import imgIago from '../../../assets/images/iago.png';
import imgLuiza from '../../../assets/images/luiza.png';
import imgMatheus from '../../../assets/images/matheus.png';
import imgThamires from '../../../assets/images/thamires.png';

const OpenURLButton = ({url, imagem}) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableHighlight onPress={handlePress} >
      <Image source={imagem}/>
    </TouchableHighlight>
  );
};


export default function ContainerEquipe({ name, insta, link }) {
  
  return (
    <View style={styles.container}>
      { name == 'Camila Medeiros' ? 
        <Image source={imgCamila} style={styles.imagem}/>
      : name == 'Iago Marques' ?
        <Image source={imgIago} style={styles.imagem}/>
      : name == 'Luiza Gadelha' ?
        <Image source={imgLuiza} style={styles.imagem}/>
      : name == 'Matheus Cosme' ?
        <Image source={imgMatheus} style={styles.imagem}/>
      : name == 'Themires Stoppelli' ?
        <Image source={imgThamires} style={styles.imagem}/>
      : null }
      <View style={styles.containerTexto}>
        <Text style={styles.texto}>{name}</Text>
        <View style={{ flexDirection:'row', gap: 16}}>
          <OpenURLButton url={insta} imagem={instagram}/>
          <OpenURLButton url={link} imagem={linkedin}/>
        </View>
      </View>
    </View>
  )
}