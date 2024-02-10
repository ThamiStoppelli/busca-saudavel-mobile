import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import api from '../../services/api';
import styles from './styles';

function TagProductInfo({ data }){
  const [tag, setTag] = useState('');
  
  function buscarTag() {
    api
      .get(`/tag/get/${data}`)
      .then(res => {
        if (res.data != null) {
          setTag(res.data.free_of)
        } else {
          setTag(data)
        }
      })
      .catch(e => {
        console.error(e.message)
      })
  };

  useEffect(() => {
    buscarTag()
  },[])

  return(  
    <View style={styles.container}>
      <Text style={styles.texto}>{tag}</Text>
    </View>
  )
}
  
export default TagProductInfo;