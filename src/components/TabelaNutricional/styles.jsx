import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#7FA492',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 28,
  },
  textoNegrito: {
    fontFamily: 'InterSemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  containerTexto: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop: 8,
  },
  texto: {
    fontFamily: 'InterMedium',
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 8,
  }
});

export default styles;