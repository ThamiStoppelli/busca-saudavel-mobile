import { Text, Pressable } from 'react-native';

import styles from './styles';

export default function Tag({ dados, status, setStatus }) {

  function tornarDesativo(){
    setStatus(false);
  }

  function tornarAtivo(){
    setStatus(true);
  }

  return (
    <>
      {status == true?
        <Pressable style={styles.containerAtivo} onPress={() => tornarDesativo()}>
          <Text style={styles.textoAtivo}>{dados}</Text>
        </Pressable>
      :
        <Pressable style={styles.container} onPress={() => tornarAtivo()}>
          <Text style={styles.texto}>{dados}</Text>
        </Pressable>
      }
    </>
  )
}