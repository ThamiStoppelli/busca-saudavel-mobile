import { Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';

import styles from './styles';
import ContainerEquipe from '../../../components/ContainerEquipe';
import logo from '../../../../assets/images/logo_grande.png';
import semImagem from '../../../../assets/images/sem-imagem.png';

export default function About() {
  return (
    <SafeAreaView style={styles.header}>
      <ScrollView style={styles.container}>
        <Image source={logo} style={{ alignSelf:'center', marginBottom: 32 }}/>
        {/* <View style={styles.containerImage}>
            <Image source={semImagem} style={{width: '40%', height:'40%', objectFit: 'contain', alignSelf:'center' }} />
        </View> */}
        <Text style={styles.texto}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis tempus ut scelerisque feugiat pulvinar aliquam placerat purus nec. Leo, eu eleifend libero pulvinar urna ullamcorper lobortis nisl. Integer pulvinar tellus scelerisque maecenas at nam nunc tortor fusce. Tellus, ultrices id curabitur lacus, aliquam id velit adipiscing pulvinar. Sit at volutpat diam id. Vel ac elit, malesuada laoreet tristique eu diam proin. Id quis eget odio vitae interdum. Sed pellentesque fermentum justo, felis pulvinar leo suspendisse. Malesuada venenatis, quam libero, eget scelerisque. Sapien, faucibus fermentum donec gravida. Nullam est urna feugiat luctus egestas eros. Adipiscing blandit nunc massa feugiat in egestas commodo. Viverra porta amet sit porttitor dui tristique arcu.</Text>
        <Text style={styles.textoNegrito}>Nossa Equipe</Text>
        <ContainerEquipe 
          name={'Camila Medeiros'} 
          insta={'https://www.instagram.com/camilamedeir0s_/'} 
          link={'https://www.linkedin.com/in/camila-medeir0s/'}/>
        <ContainerEquipe 
          name={'Iago Marques'} 
          insta={'https://www.instagram.com/iagopmarques/'} 
          link={'https://www.linkedin.com/in/iago-marques-developer/'}/>
        <ContainerEquipe 
          name={'Luiza Gadelha'} 
          insta={'https://www.instagram.com/gadelhaluiza/'} 
          link={'https://www.linkedin.com/in/luiza-gadelha/'}/>
        <ContainerEquipe 
          name={'Matheus Cosme'} 
          insta={'https://www.instagram.com/cosmemc/'} 
          link={'https://www.linkedin.com/in/matheus-cosme-alencar/'}/>
        <ContainerEquipe 
          name={'Themires Stoppelli'} 
          insta={'https://www.instagram.com/thamistoppelli/'} 
          link={'https://www.linkedin.com/in/thamires-stoppelli-6ab51a175/'}/>
        <View style={{ height:85 }}/>
      </ScrollView>
    </SafeAreaView>
  )
}