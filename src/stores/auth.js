import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false);

  function login(token) {
    localStorage.setItem('token', token);
    isLoggedIn.value = true;
  }

  function logout() {
    localStorage.removeItem('token');
    isLoggedIn.value = false;
  }

  function checkAuth() {
    isLoggedIn.value = !!localStorage.getItem('token');
  }

  return { isLoggedIn, login, logout, checkAuth };
});