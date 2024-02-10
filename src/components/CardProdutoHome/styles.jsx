import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C0DCCC',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 94,
    width: '100%',
  },
  containerImagem: {
    width: '25%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 8,
    overflow: 'hidden',
  },
  containerTexto: {
    justifyContent:'space-around',
    width:'87%'
  },
  containerIcon: {
    justifyContent:'space-around',
  },
  texto: {
    fontFamily: 'InterMedium',
  }
});

export default styles;