<template>
    <div class="centros-container">
      <h2>Centros Disponibles</h2>
      <ul>
        <li v-for="center in centers" :key="center.name">
          <strong>{{ center.name }}</strong> - {{ center.address }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const centers = ref([])
  
  const fetchCenters = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://127.0.0.1:5000/centers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      })
  
      if (!response.ok) {
        throw new Error('Error al obtener los centros: ' + response.statusText)
      }
  
      const result = await response.json()
      centers.value = result
    } catch (error) {
      console.error(error)
      alert('No se pudieron cargar los centros: ' + error.message)
    }
  }
  
  onMounted(() => {
    fetchCenters()
  })
  </script>
  
  <style scoped>
  .centros-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    background-color: #f9f9f9;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  strong {
    display: block;
    font-size: 1.1em;
    margin-bottom: 5px;
  }
  </style>
  