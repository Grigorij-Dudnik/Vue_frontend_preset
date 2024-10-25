<template>
  <div class="form-container">
    <h1>Reset Password</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="password">New Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" v-model="confirmPassword" required />
      </div>
      <button type="submit">Reset Password</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
      apiUrl: import.meta.env.VITE_API_URL,
      token: this.$route.params.token,
    };
  },
  methods: {
    async handleSubmit() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      try {
        const formData = new FormData();
        formData.append('new_password', this.password);
        const response = await fetch(`${this.apiUrl}/reset-password/${this.token}`, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        alert(data.message);
        this.$router.push('/login');
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      }
    },
  },
};
</script>

<style scoped src="@/assets/styles/forms.css"></style>