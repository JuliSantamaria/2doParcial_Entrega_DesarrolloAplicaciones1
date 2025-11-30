// src/features/users/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  isCreatingUser: false,
  currentPage: 1,
  totalPages: 1,
  successMessage: null,
};

// API Key para ReqRes.in
const REQRES_API_KEY = 'reqres-free-v1';

// Thunk para GET - Obtener usuarios con paginación
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page = 1, { rejectWithValue }) => {
    try {
      console.log(`Fetching users page ${page} from API...`);
      const url = `https://reqres.in/api/users?page=${page}`;
      console.log('URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': REQRES_API_KEY,
        },
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`HTTP ${response.status}: ${errorText || 'Error al obtener usuarios'}`);
      }
      
      const data = await response.json();
      console.log('Users fetched successfully:', data);
      
      return {
        users: data.data || [],
        page: data.page || page,
        totalPages: data.total_pages || 1,
      };
    } catch (error) {
      console.error('Network error:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Thunk para POST - Crear usuario
export const createUser = createAsyncThunk(
  'users/createUser',
  async (newUser, { rejectWithValue }) => {
    try {
      console.log('Creating user via API:', newUser);
      const response = await fetch(
        'https://reqres.in/api/users',
        {
          method: 'POST',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': REQRES_API_KEY,
          },
          body: JSON.stringify(newUser),
        }
      );
      
      console.log('Create response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Create user error:', response.status, errorText);
        throw new Error(`HTTP ${response.status}: ${errorText || 'Error al crear usuario'}`);
      }
      
      const data = await response.json();
      console.log('User created via API:', data);
      
      // Adaptar la respuesta para que tenga el formato esperado
      return {
        ...data,
        first_name: newUser.name.split(' ')[0] || newUser.name,
        last_name: newUser.name.split(' ')[1] || '',
        email: data.email || `${newUser.name.toLowerCase().replace(/\s+/g, '.')}@test.com`,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newUser.name)}&background=random`,
        job: newUser.job
      };
    } catch (error) {
      console.error('Error creating user:', error);
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET - Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.users;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Error al obtener usuarios. Verifica tu conexión.';
        console.error('fetchUsers rejected:', action.payload);
      })
      // POST - Create User
      .addCase(createUser.pending, (state) => {
        state.isCreatingUser = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isCreatingUser = false;
        // Agregar el nuevo usuario al inicio de la lista
        // Nota: La API de reqres.in devuelve un ID generado
        state.items.unshift(action.payload);
        state.successMessage = 'Usuario creado exitosamente';
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isCreatingUser = false;
        state.error = action.payload || 'Error al crear usuario. Intenta nuevamente.';
        console.error('createUser rejected:', action.payload);
      });
  },
});

export const { clearSuccessMessage } = usersSlice.actions;
export default usersSlice.reducer;
