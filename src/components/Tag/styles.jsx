import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderColor:'#7FA492',
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 1,
    width:'auto'
  },
  texto: {
    fontFamily:'InterRegular',
    fontSize: 14,
    color: '#7FA492',
    textAlign:'center',
  },
  containerAtivo: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderColor:'#7FA492',
    backgroundColor:'#7FA492',
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 1,
    width:'auto'
  },
  textoAtivo: {
    fontFamily:'InterRegular',
    fontSize: 14,
    color: '#ffffff',
    textAlign:'center',
  },
});

export default styles;