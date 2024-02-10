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
  textoSemLogin: {
    fontFamily:'InterMedium',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 32,
  },
  textoSemLoginSublinhado: {
    fontFamily:'InterMedium',
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 32,
  },
  textoExplicativo: {
    fontFamily: 'InterRegular',
    fontSize: 18,
    textAlign: 'center'
  },
  input: {
    flexDirection: 'row',
    alignContent: 'center',
    height: 40,
    padding: 10,
    marginHorizontal: 4,
    marginVertical: 24,
    borderWidth: 1.5,
    borderColor: '#716E68',
    borderRadius: 32,
  },
  botao: {
    backgroundColor: '#7FA492',
    height: 36,
    padding: 10,
    borderRadius: 32,
    marginBottom: 28,
  },
  textoBotao: {
    textAlign: 'center',
    fontFamily: 'InterRegular',
    fontSize: 14,
    color: '#F6F6F6',
  },
  textoGeral: {
    fontFamily: 'InterRegular',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 64
  },
});

export default styles;