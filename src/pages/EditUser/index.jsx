import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView } from 'react-native';

import voltarImg from '../../../assets/icon/voltar.png';
import api from '../../services/api';
import styles from './styles';

export default function EditUser({ navigation }) {
  const [token, setToken] = useState(null);
  const [imagem, setImagem] = useState(null);
  const [nome, setNome] = useState(null);
  const [dtNascimento, setDtNascimento] = useState(null);
  const [emailLogado, setEmailLogado] = useState(null);
  const [localizacao, setLocalizacao] = useState(null);
  const [id, setId] = useState(null);

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
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImagem(result.uri); // Usando result.uri para atualizar a imagem
    }
  };

  async function handleEdit() {
    if (emailLogado == '' || nome == '' || localizacao == '' || localizacao == null) {
      alert('Preencha os campos obrigatórios');
    } else {
      try {
        const formData = new FormData();
        formData.append('email', emailLogado);
        formData.append('name', nome);
        if (imagem) {
          const localUri = imagem;
          const filename = localUri.split('/').pop();

          const match = /\.(\w+)$/.exec(filename);
          const type = match ? `image/${match[1]}` : 'image';

          formData.append('image', { uri: localUri, name: filename, type });
        }
        formData.append('location', localizacao);

        const response = await api.put(`user/update/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          saveData(nome, emailLogado, imagem, localizacao);
          navigation.navigate('MainTab');
        } else {
          alert('Não foi possível atualizar o perfil.');
        }
      } catch (error) {
        alert('Não foi possível atualizar o perfil. Verifique os dados e tente novamente.');
        console.error(error);
      }
    }
  }

  const saveData = async (name, email, image, location) => {
    try {
      await AsyncStorage.setItem('@name', name);
      await AsyncStorage.setItem('@email', email);
      await AsyncStorage.setItem('@location', location);
      if (image === null) {
        await AsyncStorage.removeItem('@image'); // Remover imagem nula
      } else {
        await AsyncStorage.setItem('@image', image);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <KeyboardAvoidingView 
       behavior="padding" 
       style={styles.header}
       >
    <SafeAreaView style={styles.header}>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => { navigation.goBack(); }} style={styles.voltar}>
          <Image source={voltarImg} style={styles.voltarIcon} />
          <Text style={styles.voltarTxt}>Perfil</Text>
        </TouchableOpacity>
        <Text style={styles.txtNome}>Editar perfil</Text>
        <TouchableOpacity style={styles.containerImg} onPress={pickImage}>
          {imagem ? (
            <Image
              source={{ uri: imagem }}
              style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 500 }}
            />
          ) : (
            <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'InterSemiBold' }}>
              Adicionar Foto
            </Text>
          )}
        </TouchableOpacity>
        <Text style={styles.texto}>Nome</Text>
        <TextInput
          onChangeText={setNome}
          value={nome}
          style={styles.txtInput}
        />
        <Text style={styles.texto}>Email</Text>
        <TextInput
          onChangeText={setEmailLogado}
          value={emailLogado}
          style={styles.txtInput}
        />
        <Text style={styles.texto}>Localização</Text>
        <TextInput
          onChangeText={setLocalizacao}
          value={localizacao}
          style={styles.txtInput}
        />
        <TouchableOpacity style={styles.botao} onPress={() => handleEdit()}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
