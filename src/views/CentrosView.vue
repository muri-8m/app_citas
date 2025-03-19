<template>
  <div class="background">
    <div class="centros-container">
      <!-- Header fijo con los botones y título -->
      <header class="header">
        <button @click="goBack" class="back-button">←</button>
        <h2>{{ $t('centros.title') }}</h2>
        <div class="language-buttons">
          <button @click="changeLanguage('es')" class="language-button">
            <img src="/img/banderaesp.png" alt="Español" />
          </button>
          <button @click="changeLanguage('en')" class="language-button">
            <img src="/img/banderaUK.png" alt="English" />
          </button>
        </div>
      </header>

      <!-- Lista de centros con tarjetas alineadas a la izquierda y a la derecha -->
      <div class="centros-list">
        <CardCentros v-for="(center, index) in centers" :key="center.name" :center="center" class="centro-card" />
      </div>

      <!-- Imagen debajo de la lista de centros (2x2) -->
      <div class="image-container">
        <img class="img" src="/img/centromedico.jpg" alt="Centro Médico" />
        <img class="img" src="/img/images.jpg" alt="Centro Médico" />
        <img class="img" src="/img/images1.jpg" alt="Centro Médico" />
        <img class="img" src="/img/images2.jpg" alt="Centro Médico" />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { getCenters } from '@/service/apiService'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CardCentros from '@/components/CardCentros.vue'

const centers = ref([])
const { locale } = useI18n()
const router = useRouter()

// Fetch de centros
const fetchCenters = async () => {
  try {
    const token = localStorage.getItem('token')
    centers.value = await getCenters(token)
  } catch (error) {
    console.error(error)
    alert('No se pudieron cargar los centros: ' + error.message)
  }
}

onMounted(() => {
  fetchCenters()
})

// Cambiar el idioma
const changeLanguage = (lang) => {
  locale.value = lang
}

// Volver a la página anterior
const goBack = () => {
  router.back()
}
</script>

<style scoped lang="scss">
@use "@/assets/centros.scss" as *;
</style>
