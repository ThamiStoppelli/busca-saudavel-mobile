import { StatusBar, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  header: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: '#F6F6F6'
  },
  container: {
    paddingVertical:16,
    paddingHorizontal:16,
  },
  voltar: {
    flexDirection:'row',
    alignContent: 'center',
    gap:16,
    marginLeft: 8,
    marginBottom: 20
  },
  voltarTxt: {
    fontFamily: 'InterMedium',
    fontSize: 20,
  },
  voltarIcon: {
    height:18,
    width:10,
    alignSelf: 'center',
  },
  txtNome: {
    fontFamily: 'InterSemiBold',
    fontSize: 18,
    color: '#716E68',
    textAlign: 'center',
    paddingVertical: 22,
  },
  containerImage: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 8,
    overflow: 'hidden',
    height: 354,
    marginBottom: 26,
  },
  imagem: {
    objectFit: 'contain', 
    alignSelf:'center'
  },
  textoNegrito: {
    fontFamily: 'InterSemiBold',
    fontSize: 14,
  },
  texto: {
    fontFamily: 'InterMedium',
    fontSize: 14,
    marginBottom: 24,
  }
});

export default styles;