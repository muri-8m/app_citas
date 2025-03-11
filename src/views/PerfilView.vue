<script setup>
import { ref } from 'vue'

// Estado para mostrar los datos del perfil
const perfil = ref(null)

// Datos editables para actualización
const perfilEditado = ref({
  name: '',
  lastname: '',
  email: '',
  phone: '',
  date: ''
})

// Función para obtener el perfil del usuario logueado
const verPerfil = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await response.json()
    perfil.value = data

    // También rellenamos los campos editables por si quiere modificar
    perfilEditado.value.name = data.name
    perfilEditado.value.lastname = data.lastname
    perfilEditado.value.email = data.email
    perfilEditado.value.phone = data.phone
    perfilEditado.value.date = data.date
  } catch (error) {
    console.error('Error al obtener el perfil:', error)
  }
}

// Función para actualizar el perfil del usuario
const actualizarPerfil = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/currentUser', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(perfilEditado.value)
    })
    const data = await response.json()
    console.log('Perfil actualizado:', data)
    alert('Perfil actualizado correctamente')
  } catch (error) {
    console.error('Error al actualizar perfil:', error)
  }
}
</script>

<template>
  <div class="perfil-container">
    <h2>Perfil de Usuario</h2>

    <div class="acciones">
      <button @click="verPerfil">Ver Perfil</button>
      <button @click="actualizarPerfil">Actualizar Perfil</button>
    </div>

    <div v-if="perfil" class="perfil-datos">
      <h3>Datos actuales:</h3>
      <ul>
        <li><strong>Nombre:</strong> {{ perfil.name }}</li>
        <li><strong>Apellidos:</strong> {{ perfil.lastname }}</li>
        <li><strong>Email:</strong> {{ perfil.email }}</li>
        <li><strong>Teléfono:</strong> {{ perfil.phone }}</li>
        <li><strong>Fecha:</strong> {{ perfil.date }}</li>
        <li><strong>Username:</strong> {{ perfil.username }}</li>
      </ul>
    </div>

    <div v-if="perfil" class="form-actualizar">
      <h3>Editar Datos:</h3>
      <label>
        Nombre:
        <input v-model="perfilEditado.name" type="text" />
      </label>
      <label>
        Apellidos:
        <input v-model="perfilEditado.lastname" type="text" />
      </label>
      <label>
        Email:
        <input v-model="perfilEditado.email" type="email" />
      </label>
      <label>
        Teléfono:
        <input v-model="perfilEditado.phone" type="text" />
      </label>
      <label>
        Fecha (dd/mm/yyyy):
        <input v-model="perfilEditado.date" type="text" />
      </label>
    </div>
  </div>
</template>

<style scoped>
.perfil-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.acciones {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #42b883;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #36936d;
}

.perfil-datos ul {
  list-style: none;
  padding: 0;
}

.form-actualizar {
  margin-top: 20px;
}

.form-actualizar label {
  display: block;
  margin-bottom: 10px;
}

input {
  padding: 8px;
  width: 100%;
  max-width: 400px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
