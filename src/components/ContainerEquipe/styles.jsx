import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#C0DCCC',
    borderRadius:16,
    height: 104,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginVertical: 12,
  },
  imagem: {
    objectFit: 'contain', 
    height: 80,
    width: 80,
    borderRadius: 50,
    alignSelf: 'center',
  },
  containerTexto: {
    marginLeft: 24,
    paddingVertical: 8,
    justifyContent: 'space-between'
  },
  texto: {
    fontFamily: 'InterSemiBold',
    fontSize: 16,
  }
});

export default styles;