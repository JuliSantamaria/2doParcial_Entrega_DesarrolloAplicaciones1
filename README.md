# Trabajo Práctico - React Native con Redux Toolkit

Este repositorio contiene dos aplicaciones desarrolladas en React Native utilizando Redux Toolkit para la gestión de estado.

##  Aplicaciones

### 1. MiniBlog de Clases (Actividad1_Miniblog)
Aplicación de blog que consume la API de JSONPlaceholder para mostrar y gestionar publicaciones.

**Características:**
- Visualización de posts con paginación
- Creación de nuevos posts
- Integración con JSONPlaceholder API
- Gestión de estado con Redux Toolkit

**Ubicación:** `TPReactNative/`

---

### 2. Gestor de Usuarios de Prueba (GestorUsuarios)
Aplicación para gestionar usuarios de prueba utilizando la API de ReqRes.in.

**Características:**
- Lista de usuarios con paginación visual (indicadores circulares)
- Creación de nuevos usuarios mediante modal
- Integración con ReqRes.in API
- Diseño moderno con botones circulares
- Gestión de estado con Redux Toolkit

**Ubicación:** `GestorUsuarios/`

---

##  Requisitos Previos

- **Node.js** (versión 14 o superior)
- **npm** o **yarn**
- **Expo CLI** instalado globalmente:
  ```bash
  npm install -g expo-cli
  ```
- **Expo Go** (aplicación móvil para testing)
  - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [iOS](https://apps.apple.com/app/expo-go/id982107779)

---

##  Instalación y Ejecución

### Actividad 1: MiniBlog de Clases

1. **Navegar al directorio del proyecto:**
   ```bash
   cd Actividad1_Miniblog
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar la aplicación:**
   ```bash
   npm start
   ```
   o
   ```bash
   expo start
   ```

4. **Ejecutar en diferentes plataformas:**
   - **Android:** `npm run android` o presiona `a` en la terminal de Expo
   - **iOS:** `npm run ios` o presiona `i` en la terminal de Expo
   - **Web:** `npm run web` o presiona `w` en la terminal de Expo
   - **Móvil (Expo Go):** Escanea el código QR con la app Expo Go

---
 
### Actividad 2: Gestor de Usuarios de Prueba (Actividad2_GestorUsuarios)

1. **Navegar al directorio del proyecto:**
   ```bash
   cd Actividad2_GestorUsuarios
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar la aplicación:**
   ```bash
   npm start
   ```
   o
   ```bash
   expo start
   ```

4. **Ejecutar en diferentes plataformas:**
   - **Android:** `npm run android` o presiona `a` en la terminal de Expo
   - **iOS:** `npm run ios` o presiona `i` en la terminal de Expo
   - **Web:** `npm run web` o presiona `w` en la terminal de Expo
   - **Móvil (Expo Go):** Escanea el código QR con la app Expo Go

5. **Modo túnel (opcional - para redes con firewall):**
   ```bash
   npm run tunnel
   ```

---

##  Tecnologías Utilizadas

- **React Native** 0.74.0
- **Expo** ~51.0.0
- **Redux Toolkit** ^2.0.0
- **React Redux** ^9.0.0
- **JSONPlaceholder API** (Actividad 1)
- **ReqRes.in API** (Actividad 2)

---

##  Uso con Expo Go

1. Instala **Expo Go** en tu dispositivo móvil
2. Asegúrate de que tu computadora y móvil estén en la misma red Wi-Fi
3. Ejecuta npm start en el proyecto deseado
4. Escanea el código QR que aparece en la terminal:
   - **Android:** Usa la app Expo Go directamente
   - **iOS:** Usa la cámara del iPhone y luego abre con Expo Go

---

##  Estructura del Proyecto

### TPReactNative (Actividad 1)
```
TPReactNative/
├── App.js
├── package.json
└── src/
    ├── components/
    ├── features/
    │   └── posts/
    │       └── postsSlice.js
    ├── screens/
    │   └── HomeScreen.js
    └── store/
        └── store.js
```

### GestorUsuarios (Actividad 2)
```
GestorUsuarios/
├── App.js
├── package.json
└── src/
    ├── components/
    │   ├── ErrorBoundary.js
    │   ├── UserForm.js
    │   └── UserList.js
    ├── features/
    │   └── users/
    │       └── usersSlice.js
    ├── screens/
    │   └── HomeScreen.js
    └── store/
        └── store.js
```

---

##  Solución de Problemas

### Error: "Metro bundler no se inicia"
```bash
# Limpiar caché de Expo
expo start -c
```

### Error: "No se puede conectar con Expo Go"
- Verifica que ambos dispositivos estén en la misma red
- Intenta usar modo túnel: `npm run tunnel`
- Desactiva el firewall temporalmente





