<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (route) => {
router.push(route)
}
</script>

<template>
<div class="dashboard-container">
    <h2>Bienvenido al Dashboard</h2>
    
    <div class="buttons-container">
    <button @click="navigateTo('/centros')">Centros</button>
    <button @click="navigateTo('/citas')">Citas</button>
    <button @click="navigateTo('/perfil')">Perfil</button>
    </div>
</div>
</template>

<style scoped>
.dashboard-container {
max-width: 500px;
margin: auto;
padding: 20px;
text-align: center;
}

h2 {
font-size: 24px;
margin-bottom: 20px;
}

.buttons-container {
display: flex;
justify-content: center;
gap: 20px;
}

button {
padding: 10px 20px;
background-color: #42b883;
color: white;
border: none;
border-radius: 4px;
cursor: pointer;
font-size: 16px;
}

button:hover {
background-color: #36936d;
}
</style>
