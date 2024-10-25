<template>
  <header>
    <div class="logo">
      <RouterLink to="/">
        <img src="@/assets/logo.svg" alt="Logo" />
      </RouterLink>
    </div>
    <nav>
      <div class="dropdown">
        <button class="dropbtn burger-menu" aria-label="Menu" @click="toggleDropdown">
          <span :class="{ open: isDropdownOpen }"></span>
          <span :class="{ open: isDropdownOpen }"></span>
          <span :class="{ open: isDropdownOpen }"></span>
        </button>
        <div class="dropdown-content" :class="{ show: isDropdownOpen }">
          <template v-if="authStore.isLoggedIn">
            <RouterLink to="/edit-profile" @click.prevent="editProfile">Edit profile</RouterLink>
            <RouterLink to="/change-password">Change password</RouterLink>
            <RouterLink to="/login" @click="handleLogout">Logout</RouterLink>
          </template>
          <template v-else>
            <RouterLink to="/login">Login</RouterLink>
            <RouterLink to="/register">Register</RouterLink>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
const router = useRouter()
const isDropdownOpen = ref(false)

authStore.checkAuth()

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function closeDropdown(event) {
  if (!event.target.closest('.dropdown')) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})

function editProfile() {
  // Logic for editing profile
}

async function handleLogout() {
  await logout()
  // The navigation will be handled by the RouterLink after logout completes
}

function logout() {
  authStore.logout()
  // Removed the redirection as it's now handled by RouterLink
}
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e7e7e7;
  z-index: 1000;
  height: 64px; /* Fixed height */
}

.logo img {
  height: 40px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.dropdown-content.show {
  display: block;
  opacity: 1;
  visibility: visible;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

@media (min-width: 768px) {
  .dropdown:hover .dropdown-content {
    display: block;
    opacity: 1;
    visibility: visible;
  }
}

.burger-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 2.5rem;
  height: 2.5rem;
  background: transparent;
  border: 1px solid #333;
  border-radius: 5px;
  cursor: pointer;
  padding: 0.5rem;
}

.burger-menu span {
  display: block;
  width: 100%;
  height: 0.2rem;
  background: #333;
  border-radius: 10px;
  transition: all 0.3s linear;
}

.burger-menu span.open {
  background: #666;
}
</style>