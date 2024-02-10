import { StatusBar, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  header: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: '#F6F6F6'
  },
  container: {
    paddingVertical:32,
    paddingHorizontal:16,
  },
  containerImage: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 8,
    overflow: 'hidden',
    height: 354,
    marginVertical: 26,
  },
  imagem: {
    objectFit: 'contain', 
    alignSelf:'center'
  },
  texto: {
    fontFamily: 'InterMedium',
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 24,
    textAlign:'justify',
  },
  textoNegrito: {
    fontFamily: 'InterSemiBold',
    fontSize: 16,
    textAlign:'center',
    marginBottom: 12,
  }
});

export default styles;