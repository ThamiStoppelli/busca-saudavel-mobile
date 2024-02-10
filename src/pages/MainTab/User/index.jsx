import { useState, useEffect, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, SafeAreaView, Image, ScrollView, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';

import styles from './styles';
import api from '../../../services/api';
import logo from '../../../../assets/images/logo_grande.png';
import semImagem from '../../../../assets/images/sem-imagem.png';

export default function User() {
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const [imagem, setImagem] = useState(null);
  const [nome, setNome] = useState(null);
  const [dtNascimento, setDtNascimento] = useState(null);
  const [emailLogado, setEmailLogado] = useState(null);
  const [localizacao, setLocalizacao] = useState(null);
  const [id, setId] = useState(null);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleLogin() {
    if (email == '' || senha == '') {
      alert('Preencha os dados para realizar login');
    } else {
      api.post('/auth/login', {
        email: email,
        password: senha
      })
        .then(res => {
          saveData(res.data.user.name, res.data.user.email, res.data.user._id, res.data.token, res.data.user.image, res.data.user.location, res.data.user.birth_date);

          // Extrair informações relevantes da resposta
          const { name, email, id, token, image, location, birth_date } = res.data.user;

          // Salvar informações no AsyncStorage
          AsyncStorage.setItem('@token', token);
          AsyncStorage.setItem('@id', id);
          AsyncStorage.setItem('@name', name);
          AsyncStorage.setItem('@email', email);
          AsyncStorage.setItem('@image', image);
          AsyncStorage.setItem('@location', location);
          AsyncStorage.setItem('@birth_date', birth_date);

          navigation.navigate('Home');
        }).catch(error => {
          exibirAlerta("Login não realizado", "Verifique se inseriu os dados corretos e tente logar novamente.");
          console.error(error);
        });
    }
  }

  const saveData = async (name, email, id, token, image, location, birth_date) => {
    try {
      await AsyncStorage.setItem('@name', name);
      await AsyncStorage.setItem('@email', email);
      await AsyncStorage.setItem('@id', id);
      await AsyncStorage.setItem('@token', token);
      if (image == null) {
        await AsyncStorage.removeItem('@image');
      } else {
        await AsyncStorage.setItem('@image', image);
      }
      if (location == null) {
        await AsyncStorage.removeItem('@location');
      } else {
        await AsyncStorage.setItem('@location', location);
      }
      if (birth_date == null) {
        await AsyncStorage.removeItem('@birth_date');
      } else {
        await AsyncStorage.setItem('@birth_date', birth_date);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem('@name');
      await AsyncStorage.removeItem('@email');
      await AsyncStorage.removeItem('@id');
      await AsyncStorage.removeItem('@token');
      await AsyncStorage.removeItem('@image');
      await AsyncStorage.removeItem('@location');
      await AsyncStorage.removeItem('@birth_date');
      //navigation.navigate('Home');
      getData();
    } catch (e) {
      exibirAlerta(`Erro ${e}`,
      `id: ${id} e token: ${token}`);
    }
  }

  const exibirAlerta = (title, msg) => {
    Alert.alert(
      title,
      msg,
      [
        { text: 'OK', onPress: () => console.log('OK Pressionado') }
      ],
      { cancelable: false }
    );
  };

  const getData = async () => {
    try {
      setToken(await AsyncStorage.getItem('@token'));
      setImagem(await AsyncStorage.getItem('@image'));
      setNome(await AsyncStorage.getItem('@name'));
      setDtNascimento(await AsyncStorage.getItem('@birth_date'));
      setEmailLogado(await AsyncStorage.getItem('@email'));
      setLocalizacao(await AsyncStorage.getItem('@location'));
      setId(await AsyncStorage.getItem('@id'));
     
    } catch (e) {
      console.error(e);
      exibirAlerta('Erro no getData', `${e}`)
    }
  }

  useEffect(() => {
    getData();
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      getData();
      return () => {};
    }, [])
  );

  return (
    <KeyboardAvoidingView 
       behavior="padding" 
       style={styles.header}
       >
    <SafeAreaView style={styles.header}>
      {token ? (
        <ScrollView style={styles.container}>
          <View style={styles.containerInfo}>
            <View style={styles.containerImg}>
              <Image
                source={imagem ? { uri: `data:image/jpeg;base64,${imagem}` } : semImagem}
                style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 500 }}
              />
            </View>
            <Text style={styles.textoNome}>{nome}</Text>
          </View>
          <Text style={styles.texto}>E-mail</Text>
          <Text style={styles.textoInfo}>{emailLogado}</Text>
          <Text style={styles.texto}>Localização</Text>
          <Text style={styles.textoInfo}>{localizacao ? localizacao : 'Não informado'}</Text>
          <TouchableOpacity style={styles.botao} onPress={() => { navigation.navigate('EditUser'); }}>
            <Text style={styles.textoBotao}>Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoSair} onPress={() => deleteData()}>
            <Text style={styles.textoSair}>Sair</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ScrollView style={styles.container}>
          <Image source={logo} style={{ alignSelf: 'center', marginTop: 32, marginBottom: 64 }} />
          <Text style={styles.texto}>E-mail</Text>
          <TextInput
            onChangeText={setEmail}
            value={email}
            style={styles.txtInput}
          />
          <Text style={styles.texto}>Senha</Text>
          <TextInput
            onChangeText={setSenha}
            value={senha}
            secureTextEntry={true}
            style={styles.txtInput}
          />
          <TouchableOpacity onPress={() => { navigation.navigate('RecoverPass'); }}>
            <Text style={styles.textoSenha}>Esqueci a senha</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={() => handleLogin()}>
            <Text style={styles.textoBotao}>Entrar</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              marginTop: -10,
            }}
          >
            <Text style={styles.texto}>Novo por aqui?</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('SignUp'); }}>
              <Text style={styles.textoSublinhado}>Crie sua conta</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 85 }} />
        </ScrollView>
      )}
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
}