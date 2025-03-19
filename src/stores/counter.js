// counter.js
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

let inactivityTimer = null

// Manejador global que reinicia el temporizador (lo redefinimos dentro del store)
let resetTimerFn = null

export const useCounterStore = defineStore('counter', {
  state: () => ({
    token: localStorage.getItem('token') || null
  }),
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
    getToken() {
      return this.token
    },
    clearToken() {
      this.token = null
      localStorage.removeItem('token')
    },
    startInactivityTimer(router) {
      this.stopInactivityTimer()

      resetTimerFn = () => {
        clearTimeout(inactivityTimer)
        inactivityTimer = setTimeout(() => {
          this.clearToken()

          // 🔥 SweetAlert de sesión expirada
          Swal.fire({
            icon: 'warning',
            title: 'Sesión expirada',
            text: 'Serás redirigido al login',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            router.push('/login')
          })
        }, 10000) // 10 segundos
      }

      // Eventos que reinician el temporizador
      ['mousemove', 'keydown', 'click', 'scroll'].forEach(event => {
        window.addEventListener(event, resetTimerFn)
      })

      resetTimerFn()
    },
    stopInactivityTimer() {
      clearTimeout(inactivityTimer)
      if (resetTimerFn) {
        ['mousemove', 'keydown', 'click', 'scroll'].forEach(event => {
          window.removeEventListener(event, resetTimerFn)
        })
      }
    }
  }
})
