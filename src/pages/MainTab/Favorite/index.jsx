import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView, Alert, RefreshControl } from 'react-native';
import { AxiosError } from 'axios';

import api from '../../../services/api';
import CardProdutoHome from '../../../components/CardProdutoHome';
import search from '../../../../assets/icon/search.png';
import styles from './styles';
import logo from '../../../../assets/images/logo_grande.png';

export default function Favorite() {
  const [busca, setBusca] = useState('');
  const [produtos, setProdutos] = useState([]);
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);


  const getData = async () => {
    try {
      setToken(await AsyncStorage.getItem('@token'));
      setId(await AsyncStorage.getItem('@id'));
    } catch (e) {
      console.error(e);
    }
  };

  // async function buscarProdutos() {
  //   try {
  //     const response = await api.get(`/user/get_favorite_products/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       })
  //       console.log(response.data)
  //       setProdutos(response.data)
  //   } catch (e) {
  //     if (e instanceof AxiosError) {
  //       console.error(e.message)
  //     }
  //   }
  // };

  const buscarProdutos = useCallback(() => {
    api
    .get(`/user/get_favorite_products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          search: busca
        }
      }).then(res => {
        setProdutos(res.data);
      }).catch (e => {
        console.error(e.message)
      })
  }, [token, id, busca]);

  // const buscarProdutos = useCallback(async () => {
  //   try {
  //     const response = await api.get(`/user/get_favorite_products/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       },
  //       params: {
  //         search: busca // Adicione a busca como parâmetro na requisição
  //       }
  //     });
  //     setProdutos(response.data);
  //   } catch (e) {
  //     if (e instanceof AxiosError) {
  //       console.error(e.message);
  //     }
  //   }
  // }, [token, id, busca]);

  useEffect(() => {
    getData();
    buscarProdutos();
    console.log(produtos)
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      getData();
      // if(token) {
      buscarProdutos();
      // }
      return () => {
        // Cleanup, se necessário
      };
    }, [token])
  );
  
  function handleUnfavorite(produtoId) {
    console.log("Removendo favorito do produto com ID:", produtoId);
  
    api.put(`/user/remove_favorite_product/${id}`,
      { product_id: produtoId },
      { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(res => {
        console.log(res.data);
        exibirAlerta('Remover favorito', 'Produto removido dos favoritos com sucesso');
  
        api.get(`/user/get_favorite_products/${id}`)
          .then(res => {
            setProdutos(res.data);
          })
          .catch(e => {
            if (e instanceof AxiosError) {
              console.error(e.message);
            }
          });
      })
      .catch((e) => {
        if (e instanceof AxiosError) {
          console.error(e.message);
        }
      });
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

  const onRefresh = async () => {
    setRefreshing(true);
    console.log(`${id} e ${token}`)
    buscarProdutos();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.header}>
      {token ?
        <ScrollView 
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <Text style={styles.textoExplicativo}>Favoritos</Text>
          <View style={styles.input}>
            <Image source={search} style={{ marginRight: 8, height: 20, width: 20 }} />
            <TextInput
              onChangeText={setBusca}
              value={busca}
              placeholder="Busque pelo nome ou marca do produto"
              onSubmitEditing={buscarProdutos}
              style={{ width: '95%', height: '100%' }} />
          </View>
          <View style={{ gap: 16 }}>
            {!produtos.length ?
              <Text style={styles.textoGeral}>Nenhum produto encontrado</Text>
              :
              produtos.map(produto => {
                return (
                  <CardProdutoHome
                    key={produto._id}
                    data={produto}
                    clickFavorite={() => handleUnfavorite(produto.product_id)}
                    favorite={true}
                  />
                )
              })
            }
          </View>
          <View style={{ height: 85 }} />
        </ScrollView>
        :
        <ScrollView style={styles.container}>
          <Image source={logo} style={{ alignSelf: 'center', marginTop: 32, marginBottom: 64 }} />
          <Text style={styles.textoSemLogin}>Para ter acesso a essa funcionade você precisa está logado.</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('User') }}>
            <Text style={styles.textoSemLoginSublinhado}>Clique aqui para realizar o login.</Text>
          </TouchableOpacity>
        </ScrollView>
      }
    </SafeAreaView>
  )
}