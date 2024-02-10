import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  header: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: '#F6F6F6'
  },
  container: {
    paddingVertical:16,
    paddingHorizontal:16,
    // backgroundColor: '#F6F6F6',
    // justifyContent: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  voltar: {
    flexDirection:'row',
    alignContent: 'center',
    gap:16,
    marginLeft: 8,
    marginBottom: 30,
    marginTop: 10,
  },
  resend: {
    flexDirection:'row',
    alignContent: 'center',
    gap: 10,
    marginTop: 16,
  },
  textoSublinhadoResend: {
    fontFamily:'InterMedium',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  voltarTxt: {
    fontFamily: 'InterMedium',
    fontSize: 18,
    color:'#716E68',
  },
  voltarIcon: {
    height:18,
    width:10,
    alignSelf: 'center',
  },
  texto: {
    fontFamily:'InterMedium',
    fontSize: 16,
    marginTop: 16,
  },
  textoSublinhado: {
    fontFamily:'InterMedium',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 16,
  },
  textoInfo: {
    fontFamily:'InterRegular',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  textoLogin: {
    fontFamily:'InterMedium',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
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
  textoFunc: {
    fontFamily:'InterRegular',
    fontSize: 16,
    marginTop: 30,
    marginBottom: 60,
    fontWeight: '300',
    color:'#716E68',
    textAlign: 'center',
  },
  textoFuncSublinhado: {
    fontFamily:'InterRegular',
    textDecorationLine: 'underline',
    color:'#716E68',
  },
  botao: {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#7FA492',
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 40,
    marginBottom: 20,
  },
  textoBotao: {
    fontFamily:'InterMedium',
    fontSize: 18,
    color:'#ffffff',
  },
});

export default styles;
