import { useState, useEffect, useCallback } from 'react';
import { Text, View, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView, Alert, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../../services/api';
import Tag from '../../../components/Tag';
import CardProdutoHome from '../../../components/CardProdutoHome';
import search from '../../../../assets/icon/search.png';
import styles from './styles';

export default function Home() {
  const [busca, setBusca] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [lactoseAtivo, setLactoseAtivo] = useState(false);
  const [amendoimAtivo, setAmendoimAtivo] = useState(false);
  const [glutenAtivo, setGlutenAtivo] = useState(false);
  const [acucarAtivo, setAcucarAtivo] = useState(false);
  const [mariscosAtivo, setMariscosAtivo] = useState(false);
  const [ovoAtivo, setOvoAtivo] = useState(false);
  const [origemAnimalAtivo, setOrigemAnimalAtivo] = useState(false);
  const [favoritedProducts, setFavoritedProducts] = useState({});
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
  const getData = useCallback(async () => {
    try {
      const storedToken = await AsyncStorage.getItem('@token');
      const storedId = await AsyncStorage.getItem('@id');

      // Verificar se os valores são nulos ou indefinidos antes de definir os estados
      if (storedToken && storedId) {
        setToken(storedToken);
        setId(storedId);
      }
    } catch (error) {
      console.error("Erro ao obter dados do AsyncStorage:", error);
    }
  }, [setToken, setId]);
  // const getData = async () => {
  //   try {
  //     //setToken(await AsyncStorage.getItem('@token'));
  //     //setId(await AsyncStorage.getItem('@id'));
  //     const storedToken = await AsyncStorage.getItem('@token');
  //     const storedId = await AsyncStorage.getItem('@id');
  //     setUserData({ token: storedToken, id: storedId });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const buscarProdutos = useCallback(() => { 
    api
      .get(`/product/search?search=${busca}`)
      .then(res => {
        setProdutos(res.data)
      })
      .catch(e => {
        console.error(e.message)
      })
      
  }, [busca]);

  const todosFavoritos = useCallback(() => {
    if (!token) {
      api
      .get(`/product/search?search=${busca}`)
      .then(res => {
        setProdutos(res.data)
      })
    }
      api
        .get(`/user/get_favorite_products/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        })
        .then(res => {
          res.data.map(produto => {
            setFavoritedProducts((prevState) => ({
              ...prevState,
              [produto._id]: true,
            }));
          })
          console.log(favoritedProducts)
        })
        .catch(e => {
          console.error(e.message)
        })
        
  }, [token, id]);

  // async function todosFavoritos() {
  //   try {
  //     const res = await api.get(`/user/get_favorite_products/${id}`, {
  //       headers: {
  //         "Authorization": `Bearer ${token}`,
  //       }
  //     });
  
  //     res.data.map(produto => {
  //       setFavoritedProducts(prevState => ({
  //         ...prevState,
  //         [produto._id]: true,
  //       }));
  //     });
  
  //     console.log(favoritedProducts);
  //   } catch (error) {
  //     console.error("Erro ao buscar favoritos:", error);
  //   }
  // }
  

  function buscarTags() {
    api
      .get(`/product/search_by_tag?ref_1=${lactoseAtivo}&ref_2=${amendoimAtivo}&ref_3=${glutenAtivo}&ref_4=${acucarAtivo}&ref_5=${mariscosAtivo}&ref_6=${ovoAtivo}&ref_7=${origemAnimalAtivo}&`)
      .then(res => {
        setProdutos(res.data)
      })
      .catch(e => {
        console.error(e.message)
      })
      .finally(() => {
        setRefreshing(false);
      })
  }

  // useEffect(() => {
  //   getData();
  //   buscarProdutos();
  //   if (id) {
  //     todosFavoritos()
  //   };
  // }, [id])

  const fetchData = async () => {
    try {
      await getData();
      buscarProdutos();
      if (token) {
        todosFavoritos();
      }
    } catch (error) {
      console.error("Erro durante a execução do useEffect:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, getData, buscarProdutos, todosFavoritos]);
  
  useFocusEffect(
    useCallback(() => {
      fetchData();
      return () => {
        // Cleanup, se necessário
      };
    }, [token, getData, buscarProdutos, todosFavoritos])
  );

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

  function handleFavorite(produtoId) {
    console.log("Favoritando ou desfavoritando produto com ID:", produtoId);

    if (token) {
      if (favoritedProducts[produtoId]) {
        api.put(`/user/remove_favorite_product/${id}`,
          { product_id: produtoId },
          { headers: { Authorization: `Bearer ${token}` } }
        ).then((res) => {
            console.log(res.data);
            exibirAlerta('Favorito removido', 'Produto removido dos favoritos com sucesso');
            setFavoritedProducts((prevState) => ({
              ...prevState,
              [produtoId]: false,
            }));
          }).catch((err) => {
            console.log("Erro ao desfavoritar:", err);
          });
      } else {
        api.put(`/user/add_favorite_product/${id}`,
          { product_id: produtoId },
          { headers: { Authorization: `Bearer ${token}` } }
        ).then((res) => {
            console.log(res.data);
            exibirAlerta('Favorito adicionado', 'Produto adicionado aos favoritos com sucesso');
            setFavoritedProducts((prevState) => ({
              ...prevState,
              [produtoId]: true,
            }));
          }).catch((err) => {
            console.log("Erro ao favoritar:", err);
          });
      }
    } else {
      exibirAlerta(`Favoritar Produto ${produtoId} e ${token}`, 'Faça login para favoritar produtos');
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    // Adicione aqui a lógica de atualização, como recarregar dados da API, etc.
    console.log(`${id} e ${token}`)
    buscarProdutos();
    todosFavoritos();
    setRefreshing(false);
  };


  return (
    <SafeAreaView style={styles.header} >
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Text style={styles.textoExplicativo}>A plataforma de busca para facilitar suas escolhas nutricionais.</Text>
        <View style={styles.input}>
          <Image source={search} style={{ marginRight: 8, height: 20, width: 20 }} />
          <TextInput
            onChangeText={setBusca}
            value={busca}
            placeholder="Busque pelo nome ou marca do produto"
            onSubmitEditing={buscarProdutos}
            style={{ width: '95%', height: '100%' }} />
        </View>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 16, justifyContent: 'center' }}>
          <Tag dados="Lactose" status={lactoseAtivo} setStatus={setLactoseAtivo} />
          <Tag dados="Amendoim" status={amendoimAtivo} setStatus={setAmendoimAtivo} />
          <Tag dados="Glúten" status={glutenAtivo} setStatus={setGlutenAtivo} />
          <Tag dados="Açúcar" status={acucarAtivo} setStatus={setAcucarAtivo} />
          <Tag dados="Mariscos" status={mariscosAtivo} setStatus={setMariscosAtivo} />
          <Tag dados="Ovo" status={ovoAtivo} setStatus={setOvoAtivo} />
          <Tag dados="Origem Animal" status={origemAnimalAtivo} setStatus={setOrigemAnimalAtivo} />
        </View>
        <TouchableOpacity style={styles.botao} onPress={() => buscarTags()}>
          <Text style={styles.textoBotao}>Buscar por Tag</Text>
        </TouchableOpacity>
        <View style={{ gap: 16 }}>
          {!produtos.length ?
            <Text style={styles.textoGeral}>Nenhum produto encontrado</Text>
            :
            produtos.map(produto => {
              return (
                <CardProdutoHome
                  key={produto._id}
                  data={produto}
                  clickFavorite={() => handleFavorite(produto._id)}
                  favorite={!!favoritedProducts[produto._id]}
                />
              )
            })
          }
        </View>
        <View style={{ height: 85 }} />
      </ScrollView>
    </SafeAreaView>
  )
}
