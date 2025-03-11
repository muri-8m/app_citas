// counter.js
import { defineStore } from 'pinia'

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
    }
  }
})
