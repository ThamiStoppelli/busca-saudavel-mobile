import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Plataform } from 'react-native';

import voltarImg from '../../../assets/icon/voltar.png';
import api from '../../services/api';
import styles from './styles';

export default function SignUp() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConf, setSenhaConf] = useState('');
  const [tipo, setTipo] = useState(1); 


  async function handleSignUp(){
    if (nome == '' || email == '' || senha == '' || senhaConf == '') {
      alert('Preencha os dados para realizar cadastro');
    } else if (senha != senhaConf ) {
      alert('Digite a mesma senha em ambos os campos de senha.');
      setSenha('');
      setSenhaConf('');
    } else if (!validateEmail(email) ) {
      alert('Email inválido.');
    } else {
      api.post('/user/register', { 
        name: nome,
        user_type: tipo,
        email: email, 
        password: senha 
      })
      .then(res => {
        navigation.navigate('User')
      }).catch( e => {
        alert("Não foi possível efetuar cadastro.");
        console.error(e)
      })
    }
  }

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <KeyboardAvoidingView 
       behavior="padding" 
       //keyboardVerticalOffset={Plataform.OS === "ios" ? 50 : 0}
       style={styles.header}
       >
    <SafeAreaView style={styles.header}>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => { navigation.goBack()}}  style={styles.voltar}>
          <Image source={voltarImg}  style={styles.voltarIcon}/>
          <Text style={styles.voltarTxt}>Voltar para o login</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Cadastro</Text>

        <Text style={styles.texto}>Selecione o seu tipo de usuário</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <RadioButton.Item label="Consumidor" value="1" status={tipo === 1 ? 'checked' : 'unchecked'} onPress={() => setTipo(1)} />
          <RadioButton.Item label="Fornecedor" value="2" status={tipo === 2 ? 'checked' : 'unchecked'} onPress={() => setTipo(2)} />
        </View>
        <Text style={styles.texto}>Nome</Text>
        <TextInput 
          onChangeText={setNome}
          value={nome}
          style={styles.txtInput}/>
        <Text style={styles.texto}>E-mail</Text>
        <TextInput 
          onChangeText={setEmail}
          value={email}
          style={styles.txtInput}/>
        <Text style={styles.texto}>Senha</Text>
        <TextInput 
          onChangeText={setSenha}
          value={senha}
          secureTextEntry={true}
          style={styles.txtInput}/>
        <Text style={styles.texto}>Confirmar senha</Text>
        <TextInput 
          onChangeText={setSenhaConf}
          value={senhaConf}
          secureTextEntry={true}
          style={styles.txtInput}/>
        <TouchableOpacity style={styles.botao} onPress={() => handleSignUp()}>
          <Text style={styles.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>
        <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', gap: 4 }}>
          <Text style={styles.texto}>Já tem uma conta?</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('User') }}>
            <Text style={styles.textoSublinhado}>Entre aqui</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height:30 }}/>
      </ScrollView>
    </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
