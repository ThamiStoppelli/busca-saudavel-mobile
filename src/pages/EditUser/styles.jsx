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
  texto: {
    fontFamily:'InterMedium',
    fontSize: 16,
    marginTop: 16,
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
  botao: {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#7FA492',
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 48,
    marginBottom: 12,
  },
  textoBotao: {
    fontFamily:'InterMedium',
    fontSize: 18,
    color:'#ffffff',
  },
  containerImg: {
    alignSelf:'center',
    marginVertical: 16,
    borderRadius: 500,
    backgroundColor:'#7FA492',
    width: 130,
    height: 130,
    alignContent: 'center',
    justifyContent: 'center',
    gap: 16,
  }
});

export default styles;