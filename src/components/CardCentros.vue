<template>
    <div class="card-centro">
      <div class="card-centro-content">
        <h3 class="card-centro-name">{{ center.name }}</h3>
        <p class="card-centro-address">{{ center.address }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    center: {
      type: Object,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .card-centro {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 100%;
    max-width: 300px;
    margin: 20px;
  }
  
  .card-centro-content {
    padding: 15px;
  }
  
  .card-centro-name {
    font-size: 1.2em;
    margin: 0 0 10px;
    color: #333;
  }
  
  .card-centro-address {
    font-size: 1em;
    color: #555;
  }
  </style>
  