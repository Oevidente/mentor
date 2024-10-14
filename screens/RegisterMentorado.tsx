// src/screens/RegisterMentorado.tsx
import React, { useState } from 'react';
import { Button, Image, View, TextInput, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';

const RegisterMentorado = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
    }
  };

  const initialValues = { name: '', phone: '' };

  const validationSchema = Yup.object({
    name: Yup.string().required('Nome é obrigatório'),
    phone: Yup.string().required('Celular é obrigatório'),
  });

  const handleFormSubmit = (values: any) => {
    console.log('Dados do mentorado:', values);
    console.log('Foto de perfil:', profileImage);
    // Aqui você pode adicionar o código para enviar esses dados para um backend ou armazenar localmente.
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <TextInput
              placeholder="Nome"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              style={styles.input}
            />
            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}

            <TextInput
              placeholder="Celular (WhatsApp)"
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              keyboardType="phone-pad"
              style={styles.input}
            />
            {touched.phone && errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}

            <Button title="Escolher Foto de Perfil" onPress={pickImage} />
            {profileImage && (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            )}

            <Button title="Cadastrar Mentorado" onPress={handleSubmit as any} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default RegisterMentorado;
