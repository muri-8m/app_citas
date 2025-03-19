<template>
  <div class="background">
  <div class="register-container">
    <h2>{{ $t('register.title') }}</h2>
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
    <form @submit.prevent="register">
      <input v-model="form.username" type="text" :placeholder="$t('register.username')" required />
      <input v-model="form.password" type="password" :placeholder="$t('register.password')" required />
      <input v-model="form.name" type="text" :placeholder="$t('register.name')" required />
      <input v-model="form.lastname" type="text" :placeholder="$t('register.lastname')" required />
      <input v-model="form.email" type="email" :placeholder="$t('register.email')" required />
      <input v-model="form.phone" type="tel" :placeholder="$t('register.phone')" required />
      <input v-model="form.date" type="date" :placeholder="$t('register.birthdate')" required />
      <button type="submit">{{ $t('register.submit') }}</button>
      <RouterLink to="/login" class="btn">{{ $t('register.login') }}</RouterLink>
    </form>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser } from '@/service/apiService'
import { useI18n } from 'vue-i18n'

// Acceder al router
const router = useRouter()

// Formulario reactivo
const form = ref({
  username: '',
  password: '',
  name: '',
  lastname: '',
  email: '',
  phone: '',
  date: ''
})

// Acceder a i18n para cambiar de idioma
const { locale } = useI18n()

// Función para cambiar el idioma
const changeLanguage = (lang) => {
  locale.value = lang
}

// Función para registrar al usuario
const register = async () => {
  try {
    await registerUser(form.value)
    alert('Registro exitoso')
    router.push('/login')
  } catch (error) {
    console.error(error)
    alert('Error al registrar: ' + error.message)
  }
}
</script>

<style scoped lang="scss">
@use "@/assets/registro.scss" as *;
</style>


