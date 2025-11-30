// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, addPost } from '../features/posts/postsSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { items, status, error, isAddingPost } = useSelector((state) => state.posts);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    // Al montar, obtener publicaciones
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAddPost = () => {
    // Validación
    if (!title.trim() || !body.trim()) {
      setFormError('Por favor, completa todos los campos');
      return;
    }

    setFormError('');

    const newPost = {
      title,
      body,
      userId: 1, // Dummy
    };

    dispatch(addPost(newPost));

    // Limpiar formulario
    setTitle('');
    setBody('');
  };

  const isLoadingPosts = status === 'loading';

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MiniBlog de Clases</Text>

      {/* Mensajes de carga y error */}
      {isLoadingPosts && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Cargando publicaciones…</Text>
        </View>
      )}
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={items}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : `local-${index}`
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
        ListEmptyComponent={
          !isLoadingPosts && (
            <Text style={styles.empty}>No hay publicaciones todavía.</Text>
          )
        }
      />

      <View style={styles.form}>
        <Text style={styles.formTitle}>Nueva publicación</Text>
        
        {formError ? <Text style={styles.formError}>{formError}</Text> : null}
        
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            if (formError) setFormError('');
          }}
          editable={!isAddingPost}
        />
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Contenido"
          value={body}
          onChangeText={(text) => {
            setBody(text);
            if (formError) setFormError('');
          }}
          multiline
          editable={!isAddingPost}
        />
        <Button
          title={isAddingPost ? 'Enviando...' : 'Publicar'}
          onPress={handleAddPost}
          disabled={!title.trim() || !body.trim() || isAddingPost}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 40, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    marginBottom: 12,
  },
  loadingText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#0066cc',
  },
  card: {
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  title: { fontWeight: 'bold', marginBottom: 4, fontSize: 16, color: '#333' },
  empty: { 
    textAlign: 'center', 
    marginTop: 16, 
    fontStyle: 'italic',
    color: '#666',
  },
  form: { 
    marginTop: 16, 
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  formTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  formError: {
    color: '#d32f2f',
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  error: { 
    color: '#d32f2f', 
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    fontWeight: '500',
  },
});

export default HomeScreen;
