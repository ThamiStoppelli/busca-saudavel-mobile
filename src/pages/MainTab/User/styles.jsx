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
  texto: {
    fontFamily:'InterMedium',
    fontSize: 16,
    marginTop: 16,
  },
  textoNome: {
    fontFamily:'InterMedium',
    fontSize: 18,
  },
  textoInfo: {
    fontFamily:'InterRegular',
    fontSize: 16,
  },
  txtInput: {
    backgroundColor: '#FFFFFF',
    borderColor:'#716E68',
    borderWidth: 2,
    borderRadius: 8,
    height: 50,
    width:'100%',
    padding: 8,
    marginVertical: 12,
    backgroundColor:'#F6F6F6'
  },
  textoSenha: {
    fontFamily:'InterRegular',
    fontSize: 16,
    alignSelf: 'flex-end',
    color: '#716E68',
  },
  textoSublinhado: {
    fontFamily:'InterMedium',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 16,
  },
  botao: {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#7FA492',
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 64,
    marginBottom: 12,
  },
  textoBotao: {
    fontFamily:'InterMedium',
    fontSize: 18,
    color:'#ffffff',
  },
  containerInfo: {
    backgroundColor:'#C0DCCC',
    height: 100,
    flexDirection:'row',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 24,
    gap: 32,
    marginBottom: 32,
  },
  containerImg: {
    width: 70,
    height: 70,
    borderRadius: 50,
    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor:'#ffffff',
  },
  botaoSair: {
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#7FA492',
    alignItems: 'center',
    justifyContent:'center',
    marginVertical: 18,
  },
  textoSair: {
    fontFamily:'InterMedium',
    fontSize: 18,
    color:'#7FA492',
  },
});

export default styles;