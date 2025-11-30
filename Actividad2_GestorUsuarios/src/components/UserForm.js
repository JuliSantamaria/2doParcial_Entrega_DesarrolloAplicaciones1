// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';

const UserForm = ({ onSubmit, isCreating, successMessage, onClearSuccess, visible, onClose }) => {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (successMessage && onClearSuccess) {
      // Mostrar mensaje de éxito
      Alert.alert('Éxito', successMessage, [
        {
          text: 'OK',
          onPress: () => {
            // Limpiar formulario
            setName('');
            setJob('');
            // Limpiar mensaje
            onClearSuccess();
            // Cerrar modal
            onClose();
          }
        }
      ]);
    }
  }, [successMessage, onClearSuccess, onClose]);

  const handleSubmit = () => {
    // Validaciones
    if (!name.trim()) {
      setFormError('El nombre es obligatorio');
      return;
    }
    if (!job.trim()) {
      setFormError('El puesto/rol es obligatorio');
      return;
    }

    setFormError('');
    const userData = { name: name.trim(), job: job.trim() };
    console.log('Enviando usuario:', userData);
    onSubmit(userData);
  };

  const handleNameChange = (text) => {
    setName(text);
    if (formError) setFormError('');
  };

  const handleJobChange = (text) => {
    setJob(text);
    if (formError) setFormError('');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.title}>Crear Nuevo Usuario</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {formError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{formError}</Text>
            </View>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            value={name}
            onChangeText={handleNameChange}
            editable={!isCreating}
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Puesto/Rol (ej: Developer, Manager)"
            value={job}
            onChangeText={handleJobChange}
            editable={!isCreating}
            placeholderTextColor="#999"
          />

          <TouchableOpacity
            style={[
              styles.button,
              (isCreating || !name.trim() || !job.trim()) && styles.buttonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isCreating || !name.trim() || !job.trim()}
          >
            <Text style={styles.buttonText}>
              {isCreating ? 'Creando...' : 'Crear Usuario'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    fontSize: 15,
    backgroundColor: '#fff',
    marginBottom: 12,
    color: '#333',
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonDisabled: {
    backgroundColor: '#b0bec5',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserForm;
