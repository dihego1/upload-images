import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'

import ImagePicker from 'react-native-image-picker';
import Axios from 'axios'

export default function Upload() {
  const [avatar, setAvatar] = useState();
  
  const imagePickerOptions = {
    title: 'Selecione uma imagem',
    customButtons: [
      {
        name: 'fb',
        title: 'Selecione uma imagem do Facebook'
      },
      {
        name: 'ig',
        title: 'Selecione uma imagem do Instagram'
      }
    ]
  }

  function imagePickerCallback(data) {
    if (data.didCancel) {
      return;
    }
    if (data.error) {
      return;
    }

    if (data.customButton) {
      console.log(data)
    }

    if (!data.uri) {
      return;
    }

    setAvatar(data);
  }

  async function uploadImage() {
    const data = new FormData();

    

    data.append('avatar', {
      fileName: avatar.fileName,
      uri: avatar.uri,
      type: avatar.type
    })

    await Axios.post('http://localhost:3333/files', data)
  }

  return (
    <View style={styles.container}>
      <Image style={styles.avatar}
        source={{
          uri: avatar 
          ? avatar.uri 
          :  'https://amor-doce-br.aminoapps.com/static/img/user-icon-placeholder.png'
        }}
      />
      <TouchableOpacity style={styles.button} 
        onPress={() => ImagePicker.showImagePicker(imagePickerOptions, imagePickerCallback)}>
        <Text style={styles.buttonText}>Escolher imagem</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={uploadImage}>
        <Text style={styles.buttonText}>Enviar imagem</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: '#7159c1',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  }
})