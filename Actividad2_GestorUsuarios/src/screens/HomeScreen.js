// src/screens/HomeScreen.js
import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, createUser, clearSuccessMessage } from '../features/users/usersSlice';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {
    items,
    status,
    error,
    isCreatingUser,
    currentPage,
    totalPages,
    successMessage,
  } = useSelector((state) => state.users);

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  useEffect(() => {
    // Al montar, obtener usuarios de la página 1
    dispatch(fetchUsers(1));
  }, [dispatch]);

  const handleCreateUser = (userData) => {
    dispatch(createUser(userData));
  };

  const handleClearSuccess = () => {
    dispatch(clearSuccessMessage());
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(fetchUsers(page));
    }
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const isLoading = status === 'loading';

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Gestor de Usuarios</Text>
            <Text style={styles.headerSubtitle}>Prueba con ReqRes.in</Text>
          </View>

          {/* Lista de Usuarios */}
          <View style={styles.listContainer}>
            <Text style={styles.sectionTitle}>Lista de Usuarios</Text>
            <UserList users={items} isLoading={isLoading} error={error} />
          </View>
        </View>
      </ScrollView>

      {/* Modal del formulario */}
      <UserForm
        visible={isModalVisible}
        onClose={closeModal}
        onSubmit={handleCreateUser}
        isCreating={isCreatingUser}
        successMessage={successMessage}
        onClearSuccess={handleClearSuccess}
      />

      {/* Botón para abrir modal de creación - Encima de paginación */}
      <TouchableOpacity style={styles.createButton} onPress={openModal}>
        <Text style={styles.createButtonIcon}>+</Text>
        <Text style={styles.createButtonText}>Crear Usuario</Text>
      </TouchableOpacity>

      {/* Paginación - Ahora en la parte inferior fija */}
      {totalPages > 1 && (
        <View style={styles.paginationContainer}>
          {/* Botón Anterior */}
          <TouchableOpacity
            style={[
              styles.circularButton,
              currentPage === 1 && styles.circularButtonDisabled,
            ]}
            onPress={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
          >
            <Text style={[
              styles.arrowText,
              currentPage === 1 && styles.arrowTextDisabled
            ]}>
              ←
            </Text>
          </TouchableOpacity>

          {/* Indicadores de página */}
          <View style={styles.pageIndicators}>
            {[...Array(totalPages)].map((_, index) => (
              <View
                key={index}
                style={[
                  styles.pageIndicator,
                  currentPage === index + 1 && styles.pageIndicatorActive,
                ]}
              />
            ))}
          </View>

          {/* Botón Siguiente */}
          <TouchableOpacity
            style={[
              styles.circularButton,
              currentPage === totalPages && styles.circularButtonDisabled,
            ]}
            onPress={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
          >
            <Text style={[
              styles.arrowText,
              currentPage === totalPages && styles.arrowTextDisabled
            ]}>
              →
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 8,
  },
  header: {
    marginBottom: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2196f3',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196f3',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#2196f3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  createButtonIcon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 8,
  },
  createButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    gap: 20,
  },
  circularButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2196f3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  circularButtonDisabled: {
    backgroundColor: '#e0e0e0',
    elevation: 0,
  },
  arrowText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  arrowTextDisabled: {
    color: '#bdbdbd',
  },
  pageIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pageIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e0e0e0',
  },
  pageIndicatorActive: {
    backgroundColor: '#2196f3',
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  paginationButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    minWidth: 90,
  },
  paginationButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  paginationButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  pageInfo: {
    paddingHorizontal: 12,
  },
  pageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  listContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
});

export default HomeScreen;
