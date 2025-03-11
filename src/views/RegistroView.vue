<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  username: '',
  password: '',
  name: '',
  lastname: '',
  email: '',
  phone: '',
  date: ''
})

const register = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })
    
    if (!response.ok) {
      throw new Error('Error al registrar usuario: ' + response.statusText)
    }

    const result = await response.json()
    alert('Registro exitoso')

    // Redirigir a otra página después de un registro exitoso
    router.push('/login') // puedes cambiar la ruta si lo necesitas

  } catch (error) {
    console.error(error)
    alert('Error al registrar usuario: ' + error.message)
  }
}
</script>

<template>
  <div class="register-container">
    <h2>Registro</h2>
    <form @submit.prevent="register">
      <input v-model="form.username" type="text" placeholder="Usuario" required />
      <input v-model="form.password" type="password" placeholder="Contraseña" required />
      <input v-model="form.name" type="text" placeholder="Nombre" required />
      <input v-model="form.lastname" type="text" placeholder="Apellido" required />
      <input v-model="form.email" type="email" placeholder="Correo" required />
      <input v-model="form.phone" type="tel" placeholder="Telefono" required />
      <input v-model="form.date" type="date" placeholder="Fecha Nacimiento" required />
      <button type="submit">REGISTRO</button>
    </form>
  </div>
</template>

<style scoped>
.register-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: center;
}

input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #36936d;
}
</style>
