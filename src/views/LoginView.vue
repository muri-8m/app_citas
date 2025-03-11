<template>
    <div class="login-container">
      <h2>Iniciar sesión</h2>
      <form @submit.prevent="login">
        <input v-model="form.username" type="text" placeholder="Username" required />
        <input v-model="form.password" type="password" placeholder="Password" required />
        <button type="submit">LOGIN</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useCounterStore } from '@/stores/counter'  // Importar el store 'counter.js'
  
  const router = useRouter()
  const counterStore = useCounterStore()  // Usar el store 'counter.js'
  
  const form = ref({
    username: '',
    password: ''
  })
  
  const login = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form.value),
      })
  
      if (!response.ok) {
        throw new Error('Error al iniciar sesión: ' + response.statusText)
      }
  
      const result = await response.json()
      console.log('Resultado del login:', result)  // Muestra el objeto completo que se recibe del servidor
  
      // Cambiar 'result.token' por 'result.access_token'
      if (result && result.access_token) {
        counterStore.setToken(result.access_token)
        localStorage.setItem('token', result.access_token)
        console.log('Token guardado correctamente')
        router.push('/dashboard')
      } else {
        throw new Error('Access token no recibido del backend')
      }
    } catch (error) {
      console.error('Error de login:', error)
      alert('Error al iniciar sesión: ' + error.message)
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    text-align: center;
  }
  
  input {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #36936d;
  }
  </style>
  