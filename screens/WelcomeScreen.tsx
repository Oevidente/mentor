import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = ({
  onUserSubmit,
}: {
  onUserSubmit: (name: string, imageUri: string) => void;
}) => {
  const [name, setName] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (name.trim() && imageUri) {
      await AsyncStorage.setItem('userName', name);
      await AsyncStorage.setItem('userImage', imageUri);
      onUserSubmit(name, imageUri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <TextInput
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.profileImage} />
        ) : (
          <Text style={styles.imagePickerText}>Escolha uma foto de perfil</Text>
        )}
      </TouchableOpacity>
      <Button title="Continuar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '80%',
  },
  imagePicker: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
    width: '80%',
    height: 150,
  },
  imagePickerText: {
    color: '#666',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});

export default WelcomeScreen;
