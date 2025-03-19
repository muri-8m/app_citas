<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()

// Extraer 'locale' de useI18n para cambiar el idioma
const { locale } = useI18n()

const navigateTo = (route) => {
  router.push(route)
}

// Función para cambiar el idioma
const changeLanguage = (lang) => {
  locale.value = lang  // Cambiar el idioma
}
</script>

<template>
  <div class="background">
    <div class="dashboard-container">
      <!-- Header fijo con los botones y título -->
      <header class="header">
        <h2>{{ $t('dashboard.welcome') }}</h2>
        <div class="language-buttons">
          <button @click="changeLanguage('es')" class="language-button">
            <img src="/img/banderaesp.png" alt="Español" />
          </button>
          <button @click="changeLanguage('en')" class="language-button">
            <img src="/img/banderaUK.png" alt="English" />
          </button>
        </div>
      </header>

      <div class="buttons-container">
        <button class="button" @click="navigateTo('/centros')">{{ $t('dashboard.centers') }}</button>
        <button class="button" @click="navigateTo('/citas')">{{ $t('dashboard.dates') }}</button>
        <button class="button" @click="navigateTo('/perfil')">{{ $t('dashboard.profile') }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/dashboard.scss" as *;
</style>
