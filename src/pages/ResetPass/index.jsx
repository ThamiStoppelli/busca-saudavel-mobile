import React, { useRef, useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image, ScrollView, KeyboardAvoidingView, Plataform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
//import Loading from '../../components/Loading';

import ResendIcon from '../../../assets/icon/resend.png';
import voltarImg from '../../../assets/icon/voltar.png';
import api from '../../services/api';
import styles from './styles';

export default function ResetPass() {
    const formRef = useRef(null);
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [recoveryEmailValue, setRecoveryEmailValue] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        console.log(token);
        console.log(password);
        console.log(recoveryEmailValue);
    }, [token, password, recoveryEmailValue]);

    async function handleSubmit() {
        // setLoading(true);
        try {
            const response = await api.put('/auth/reset_password', {
                password_reset_token: token,
                email: recoveryEmailValue,
                password: password,
            });

            if (response.status === 200) {
                //setLoading(false);
                console.log(response);
                navigation.navigate('User');
                alert('Senha alterada com sucesso');
            }
        } catch (error) {
            //setLoading(false);
            console.log(error);
            alert('Não foi possível alterar a senha. Corrija os dados ou envie outro email de recuperação de senha');
        }
    }

    return (
        <KeyboardAvoidingView 
       behavior="padding" 
       //keyboardVerticalOffset={Plataform.OS === "ios" ? 50 : 0}
       style={styles.header}
       >
        <SafeAreaView style={styles.header}>
            <ScrollView style={styles.container}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.voltar}>
                    <Image source={voltarImg} style={styles.voltarIcon} />
                    <Text style={styles.voltarTxt}>Voltar para o login</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Recuperação de senha</Text>
                <Text style={styles.textoInfo}>Informe o token que foi enviado para o seu e-mail e redefina sua senha no campo abaixo.</Text>
                <View>
                    <Text style={styles.texto} htmlFor="token">Token</Text>
                    <TextInput
                        style={styles.txtInput}
                        id="token"
                        type="text"
                        value={token}
                        maxLength={4}
                        onChangeText={(text) => setToken(text)}
                        placeholder="Informe o token"
                    />
                    <Text style={styles.texto} htmlFor="password">Nova senha</Text>
                    <TextInput
                        style={styles.txtInput}
                        id='password'
                        type="password"
                        value={password}
                        maxLength={8}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Digite sua nova senha"
                    />

                    <Text style={styles.texto} htmlFor="token">E-mail informado</Text>
                    <TextInput
                        style={styles.txtInput}
                        id="email"
                        type="email"
                        value={recoveryEmailValue}
                        maxLength={120}
                        onChangeText={(text) => setRecoveryEmailValue(text)}
                        placeholder="Digite seu e-mail"
                    />
                    {/* <View style={styles.resendEmail}>  
                    </View> */}

                    <TouchableOpacity onPress={() => { navigation.navigate('RecoverPass') }} style={styles.resend}>
                        <Image source={ResendIcon} />
                        <Text style={styles.textoSublinhadoResend}>Reenviar código de verificação.</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.botao} onPress={() => handleSubmit()}>
                        {/* {loading ? <Loading /> : <Text style={styles.textoBotao}>Alterar</Text>} */}
                        <Text style={styles.textoBotao}>Alterar</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate('User') }} >
                    <Text style={styles.textoLogin}>Lembrou da senha? <Text style={styles.textoSublinhado}>Entre aqui!</Text></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('About') }}>
                    <Text style={styles.textoFunc}>Já conhece todas as funcionalidades do Busca Saudável? <Text style={styles.textoFuncSublinhado}>Saiba mais.</Text></Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
        </KeyboardAvoidingView>

    );
}
