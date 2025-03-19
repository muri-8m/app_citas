<template>
  <div class="background">
  <div class="login-container">
    <h2>{{ $t('login.title') }}</h2>
      <!-- Header fijo con los botones y título -->
      <header class="header">

    <div class="language-buttons">
      <button @click="changeLanguage('es')" class="language-button">
        <img src="/img/banderaesp.png" alt="Español" />
      </button>
      <button @click="changeLanguage('en')" class="language-button">
        <img src="/img/banderaUK.png" alt="English" />
      </button>
    </div>
  </header>

    <form @submit.prevent="login">
      <input v-model="form.username" type="text" :placeholder="$t('login.username')" required />
      <input v-model="form.password" type="password" :placeholder="$t('login.password')" required />
      <button type="submit">{{ $t('login.button') }}</button>
    </form>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter'  // Importar el store 'counter.js'
import { useI18n } from 'vue-i18n'
  
// Usar el router y el store
const router = useRouter()
const counterStore = useCounterStore()

// Obtener el objeto i18n
const { locale } = useI18n()  // Desestructurar locale para cambiar el idioma
  
// Definir el formulario reactivo
const form = ref({
  username: '',
  password: ''
})

// Función de login
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

// Función para cambiar el idioma
const changeLanguage = (lang) => {
  locale.value = lang  // Cambiar el idioma
}
</script>

  
<style scoped lang="scss">
@use "@/assets/login.scss" as *;
</style>
