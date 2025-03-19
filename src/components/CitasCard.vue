<template>
  <div class="citas-card">
    <div class="citas-card__info">
      <div class="citas-card__center">{{ cita.center }}</div>
      <div class="citas-card__date">{{ cita.date }}</div>
    </div>
    <div class="citas-card__actions" v-if="showCancel">
      <button class="citas-card__cancel-button" @click="handleCancelarCita">Cancelar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cita: Object,
    showCancel: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCancelarCita() {
      this.$emit('cancelar', this.cita.center, this.cita.date);
    }
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/citasCard.scss" as *;
</style>
