<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <nav>
    <RouterLink to="/login" class="btn">INICIAR SESION</RouterLink>
    <RouterLink to="/registro" class="btn">REGISTRARSE</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped>
nav {
  text-align: center;
  margin-top: 2rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border-radius: 5px;
  background-color: #42b883;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.btn:hover {
  background-color: #36936d;
}
</style>
