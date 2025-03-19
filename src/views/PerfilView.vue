<template>
  <div class="background">
  <div class="perfil-container">
    <h2>{{ $t('profile.title') }}</h2>
      <!-- Header fijo con los botones y título -->
  <header class="header">
    <button @click="goBack" class="back-button">←</button>
    <div class="language-buttons">
      <button @click="changeLanguage('es')" class="language-button">
        <img src="/img/banderaesp.png" alt="Español" />
      </button>
      <button @click="changeLanguage('en')" class="language-button">
        <img src="/img/banderaUK.png" alt="English" />
      </button>
    </div>
  </header>

    <div v-if="perfil" class="form-actualizar">
      <h3>{{ $t('profile.edit') }}</h3>

      <label>
        {{ $t('profile.name') }}:
        <input v-model="perfilEditado.name" type="text" />
      </label>

      <label>
        {{ $t('profile.lastname') }}:
        <input v-model="perfilEditado.lastname" type="text" />
      </label>

      <label>
        {{ $t('profile.email') }}:
        <input v-model="perfilEditado.email" type="email" />
      </label>

      <label>
        {{ $t('profile.phone') }}:
        <input v-model="perfilEditado.phone" type="text" />
      </label>

      <label>
        {{ $t('profile.birthdate') }}:
        <input :value="perfil.date" type="text" disabled />
      </label>

      <label>
        {{ $t('profile.username') }}:
        <input v-model="perfilEditado.username" type="text" />
      </label>

      <button class="guardar" @click="confirmarYActualizar">{{ $t('profile.save') }}</button>
    <!-- Botón de Cerrar Sesión -->
    <button class="logout" @click="logout">{{ $t('profile.logout') }}</button>
    </div>


  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUserProfile, updateUserProfile } from '@/service/apiService'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const router = useRouter()

const perfil = ref(null)
const perfilEditado = ref({
  name: '',
  lastname: '',
  email: '',
  phone: '',
  username: ''
})

onMounted(async () => {
  await verPerfil()
})

const changeLanguage = (lang) => {
  locale.value = lang
}

const verPerfil = async () => {
  try {
    const token = localStorage.getItem('token')
    const data = await getUserProfile(token)
    perfil.value = data

    perfilEditado.value = {
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      username: data.username
    }
  } catch (error) {
    console.error(error)
    Swal.fire({
      icon: 'error',
      title: 'Error al cargar el perfil',
      text: 'Hubo un problema al cargar los datos del perfil.'
    })
  }
}

const confirmarYActualizar = async () => {
  const camposModificados = []

  if (perfilEditado.value.name !== perfil.value.name) camposModificados.push(t('profile.name'))
  if (perfilEditado.value.lastname !== perfil.value.lastname) camposModificados.push(t('profile.lastname'))
  if (perfilEditado.value.email !== perfil.value.email) camposModificados.push(t('profile.email'))
  if (perfilEditado.value.phone !== perfil.value.phone) camposModificados.push(t('profile.phone'))
  if (perfilEditado.value.username !== perfil.value.username) camposModificados.push(t('profile.username'))

  if (camposModificados.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'No has modificado ningún campo',
      text: 'Debes hacer algún cambio para continuar.'
    })
    return
  }

  const mensaje = t('profile.fullConfirmMessage', {
    fields: camposModificados.join('\n- ')
  })

  const confirmado = await Swal.fire({
    icon: 'question',
    title: t('profile.confirmChangesTitle'),
    text: mensaje,
    showCancelButton: true,
    confirmButtonText: t('profile.confirmButton'),
    cancelButtonText: t('profile.cancelButton')
  })

  if (!confirmado.isConfirmed) return

  try {
    const token = localStorage.getItem('token')
    const dataActualizado = await updateUserProfile(token, perfilEditado.value)

    Swal.fire({
      icon: 'success',
      title: t('profile.updateSuccessTitle'),
      text: t('profile.updateSuccessText')
    })

    perfil.value = {
      ...perfil.value,
      ...perfilEditado.value
    }
  } catch (error) {
    console.error(error)
    Swal.fire({
      icon: 'error',
      title: 'Error al actualizar perfil',
      text: 'Hubo un problema al actualizar tu perfil.'
    })
  }
}

// Volver a la página anterior
const goBack = () => {
  router.back()
}

const logout = async () => {
  const result = await Swal.fire({
    title: t('profile.titlelogout'),
    text: t('profile.logouttext'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#42b883',
    cancelButtonColor: '#d33',
    confirmButtonText: t('profile.confirm'),
    cancelButtonText: t('profile.cancel'),
  })

  if (result.isConfirmed) {
    localStorage.removeItem('token') // Elimina el token (ajusta si usas Pinia)
    router.push('/login')
  }
}
</script>

<style scoped lang="scss">
@use "@/assets/perfil.scss" as *;
</style>
