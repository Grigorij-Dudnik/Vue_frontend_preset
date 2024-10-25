<template>
  <div class="form-container">
    <h1>Register</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <label for="repeatPassword">Repeat Password:</label>
        <input type="password" v-model="repeatPassword"required />
      </div>
      <div>
        <label for="role">Register as:</label>
        <select v-model="role" required>
          <option value="intern">Intern</option>
          <option value="campaign">Campaign Manager</option>
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      role: 'intern',
      apiUrl: import.meta.env.VITE_API_URL,
    };
  },
  methods: {
    async handleSubmit() {
      if (this.password !== this.repeatPassword) {
        alert('Passwords do not match');
        return;
      }
      const endpoint = this.role === 'intern' ? '/register/intern' : '/register/campaign';
      const payload = {
        email: this.email,
        password: this.password,
      };
      try {
        const response = await fetch(this.apiUrl + endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error('Registration failed');
        }
        alert('Registration successful');
        this.$router.push('/login');
      } 
      catch (error) {
        alert(error.message);
      } 
      finally {
        this.email = '';
        this.password = '';
        this.repeatPassword = '';
        this.role = 'intern';
      }
    },
  },
};
</script>

<style scoped src="@/assets/styles/forms.css"></style>
