<template>
  <div class="background">
      <!-- Header fijo con los botones y título -->
      <header class="header">
        <button @click="goBack" class="back-button">←</button>
        <h2>{{ $t('citas.titleCreate') }}</h2>
        <div class="language-buttons">
          <button @click="changeLanguage('es')" class="language-button">
            <img src="/img/banderaesp.png" alt="Español" />
          </button>
          <button @click="changeLanguage('en')" class="language-button">
            <img src="/img/banderaUK.png" alt="English" />
          </button>
        </div>
      </header>

    <div class="citas-container">
    <form @submit.prevent="handleCrearCita">
      <label class="label">{{ $t('citas.centerLabel') }}</label>
      <select v-model="center" class="input-select">
        <option disabled value="">{{ $t('citas.selectCenter') }}</option>
        <option v-for="centro in centros" :key="centro.name" :value="centro.name">
          {{ centro.name }}
        </option>
      </select>

      <label class="label">{{ $t('citas.dateLabel') }}</label>
      <input v-model="fecha" type="date" class="input-field" @input="onFechaChange" />

      <label class="label">{{ $t('citas.hourLabel') }}</label>
      <select v-model="hora" class="input-select">
        <option disabled value="">{{ $t('citas.selectHour') }}</option>
        <option v-for="h in availableHours" :key="h" :value="h">
          {{ h }}
        </option>
      </select>

      <button class="btn-submit">{{ $t('citas.createBtn') }}</button>
    </form>
  </div>

    <!-- Listado de citas del día -->
    <div class="citasdia" v-if="citasDelDia.length > 0">
      <h2 class="title-citas">{{ $t('citas.todayAppointments') }}</h2>
      <div class="citas-list">
        <CitasCard
          v-for="cita in citasDelDia"
          :key="cita.date"
          :cita="cita"
        />
      </div>
    </div>

    <!-- Mis citas -->

    <h2 class="title-citas">{{ $t('citas.misCitas') }}</h2>
    <div class="citas-list">
      <CitasCard
        v-for="cita in citasUsuario"
        :key="cita.date"
        :cita="cita"
        :showCancel="true"
        @cancelar="handleCancelarCita"
      />
    </div>

    <!-- Todas las citas -->
    <h2 class="title-citas">{{ $t('citas.todasCitas') }}</h2>
    <div class="citas-list">
      <CitasCard
        v-for="cita in todasCitas"
        :key="cita.date"
        :cita="cita"
        :showCancel="false"
      />
    </div>
</div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import Swal from 'sweetalert2';
import CitasCard from '@/components/CitasCard.vue';
import { useRouter } from 'vue-router';  // Asegúrate de importar useRouter
import {
  crearCita,
  cancelarCita,
  getCitasUsuario,
  getTodasLasCitas,
  getCitasPorDia,
  getCenters
} from '@/service/apiService';

export default {
  components: {
    CitasCard
  },
  data() {
    return {
      center: '',
      fecha: '',
      hora: '',
      centros: [],
      citasUsuario: [],
      todasCitas: [],
      citasDelDia: [],
      availableHours: Array.from({ length: 13 }, (_, i) => `${i + 8}:00`),
    };
  },
  methods: {
    // Volver a la página anterior
    goBack() {
  this.$router.push('/dashboard');  // Redirigir a la página /dashboard
  },
    
    changeLanguage(lang) {
      this.$i18n.locale = lang;
    },
    

    async onFechaChange() {
      if (this.fecha && this.center) {
        const formattedFecha = this.formatFechaParaApi(this.fecha);
        try {
          this.citasDelDia = await getCitasPorDia(formattedFecha);
        } catch (error) {
          console.error(error);
          Swal.fire('Error', 'No se pudieron cargar las citas del día.', 'error');
        }
      }
    },

    async handleCrearCita() {
      if (!this.center || !this.fecha || !this.hora) {
        Swal.fire({
          title: this.$t('citas.error'),
          text: this.$t('citas.completeFields'),
          icon: 'warning',
        });
        return;
      }

      const nuevaCita = { center: this.center, date: `${this.fecha} ${this.hora}:00` };

      try {
        await crearCita(this.center, nuevaCita.date);
        Swal.fire({
          title: this.$t('citas.success'),
          text: this.$t('citas.citaCreated'),
          icon: 'success',
        });

        this.center = '';
        this.fecha = '';
        this.hora = '';
        this.citasDelDia = [];

        this.fetchCitas();
      } catch (error) {
        this.center = '';
        this.fecha = '';
        this.hora = '';
        this.citasDelDia = [];

        Swal.fire({
          title: this.$t('citas.error'),
          text: this.$t('citas.citaNotAvailable'),
          icon: 'error',
        });
      }
    },

    async handleCancelarCita(center, date) {
      try {
        await cancelarCita(center, date);
        Swal.fire({
          title: this.$t('citas.success'),
          text: this.$t('citas.citaCancelled'),
          icon: 'success',
        });
        this.fetchCitas();
      } catch (error) {
        Swal.fire('Error', 'No se pudo cancelar la cita.', 'error');
      }
    },

    async fetchCitas() {
      try {
        this.citasUsuario = await getCitasUsuario();
        this.todasCitas = await getTodasLasCitas();
      } catch (error) {
        Swal.fire('Error', 'Error al obtener las citas: ' + error.message, 'error');
      }
    },

    async fetchCenters() {
      try {
        const data = await getCenters(localStorage.getItem('token'));
        this.centros = data;
      } catch (error) {
        Swal.fire('Error', 'Error al obtener centros', 'error');
      }
    },

    formatFechaParaApi(fechaIso) {
      const [year, month, day] = fechaIso.split('-');
      return `${day}/${month}/${year}`;
    }
  },
  
  mounted() {
    this.fetchCenters();
    this.fetchCitas();
  }
  
};
</script>

<style scoped lang="scss">
@use "@/assets/citas.scss" as *;
</style>
