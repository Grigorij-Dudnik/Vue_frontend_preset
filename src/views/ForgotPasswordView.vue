<template>
  <div class="form-container">
    <h1>Forgot Password</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email Address:</label>
        <input type="email" v-model="email" required />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      apiUrl: import.meta.env.VITE_API_URL,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const formData = new FormData();
        formData.append('email', this.email);
        await fetch(this.apiUrl + '/forgot-password', {
          method: 'POST',
          body: formData,
        });
        alert('Password reset instructions sent if email exists.');
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