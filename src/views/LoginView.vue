<template>
  <div class="form-container">
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
      <div class="forgot-password-link">
        <router-link to="/forgot-password">Forgot Password?</router-link>
      </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      apiUrl: import.meta.env.VITE_API_URL,
    };
  },
  methods: {
    async handleSubmit() {
      const formData = new URLSearchParams();
      formData.append('username', this.email);
      formData.append('password', this.password);
      try {
        const response = await fetch(this.apiUrl + '/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData,
        });
        if (!response.ok) {
          throw new Error('Login failed');
        }
        const data = await response.json();
        const authStore = useAuthStore();
        authStore.login(data.access_token);
        alert('Login successful');
        this.$router.push('/');
      } catch (error) {
        alert(error.message);
      } finally {
        this.email = '';
        this.password = '';
      }
    },
  },
};
</script>

<style scoped src="@/assets/styles/forms.css"></style>

<style scoped>
.forgot-password-link {
  text-align: center;
  margin-top: 1rem;
}

.forgot-password-link a {
  color: #007bff;
  text-decoration: none;
}

.forgot-password-link a:hover {
  text-decoration: underline;
}
</style>
