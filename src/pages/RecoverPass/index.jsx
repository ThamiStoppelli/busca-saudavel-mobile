import React, { useRef, useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image, KeyboardAvoidingView, Plataform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth';
//import Loading from '../Loading';

import voltarImg from '../../../assets/icon/voltar.png';
import api from '../../services/api';
import styles from './styles';

export default function RecoverPass() {
  const { recoveryEmail, setRecoveryEmail } = useContext(AuthContext) || {};
  //setLoading, loading,
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const recoveryEmailValue = recoveryEmail || "";
  const setRecoveryEmailValue = setRecoveryEmail || (() => { });


  useEffect(() => {
    setRecoveryEmailValue(email);
  }, [email]);

  async function handleSubmit() {
    // setLoading(true);

    try {
      const response = await api.post("/auth/forgot_password", {
        email: email,
      });

      console.log(email);
      AsyncStorage.setItem("recoveryEmail", recoveryEmailValue);
      console.log(recoveryEmailValue);

      if (response.status === 200) {
        //setLoading(false);
        console.log(response);
        navigation.navigate('ResetPass');
        alert("Caso este e-mail esteja cadastrado, receberá o código em sua caixa de entrada");
      }
    } catch (error) {
      console.log(error.message);

      if (error.message === "Network Error") {
        //setLoading(false);
        console.log(error);
        alert("Ocorreu um erro de conexão ao serviço");
      } else {
        //setLoading(false);
        setTimeout(() => alert("Ocorreu um erro de conexão ao serviço"), 5000);
        //navigation.navigate('MainTab')
      }
    }
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      //keyboardVerticalOffset={Plataform.OS === "ios" ? 50 : 0}
      style={styles.header}
    >
      <SafeAreaView style={styles.header}>

        <View style={styles.container}>
          {/* <View style={styles.content}> */}
          <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.voltar}>
            <Image source={voltarImg} style={styles.voltarIcon} />
            <Text style={styles.voltarTxt}>Voltar para o login</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Recuperação de senha</Text>
          <Text style={styles.textoInfo}>Insira seu email cadastrado abaixo, para que possamos lhe enviar a instrução de recuperação de senha.</Text>
          <View>
            <Text style={styles.texto} htmlFor="email">E-mail</Text>
            <TextInput
              style={styles.txtInput}
              id="email"
              type="email"
              value={email}
              maxLength={120}
              onChangeText={(text) => setEmail(text)}
              placeholder="Digite seu e-mail"
            />

            {/* {loading ? (
              <TouchableOpacity style={styles.button}>
                <Loading />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>
            )} */}


            <TouchableOpacity style={styles.botao} onPress={() => handleSubmit()}>
              <Text style={styles.textoBotao}>Enviar</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => { navigation.navigate('User') }} >
            <Text style={styles.textoLogin}>Lembrou da senha? <Text style={styles.textoSublinhado}>Entre aqui!</Text></Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('About') }}>
            <Text style={styles.textoFunc}>Já conhece todas as funcionalidades do Busca Saudável? <Text style={styles.textoFuncSublinhado}>Saiba mais.</Text></Text>
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
