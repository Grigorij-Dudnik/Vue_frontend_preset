<template>
  <div class="form-container">
    <h1>Change Password</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="current-password">Current Password:</label>
        <input type="password" v-model="currentPassword" required />
      </div>
      <div>
        <label for="new-password">New Password:</label>
        <input type="password" v-model="newPassword" required />
      </div>
      <div>
        <label for="confirm-new-password">Confirm New Password:</label>
        <input type="password" v-model="confirmNewPassword" required />
      </div>
      <button type="submit">Change Password</button>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      apiUrl: import.meta.env.VITE_API_URL,
    };
  },
  methods: {
    async handleSubmit() {
      if (this.newPassword !== this.confirmNewPassword) {
        alert('New passwords do not match');
        return;
      }

      const formData = new FormData();
      formData.append('current_password', this.currentPassword);
      formData.append('new_password', this.newPassword);

      try {
        const response = await fetch(this.apiUrl + '/change-password', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        });
        if (!response.ok) {
          throw new Error('Password change failed');
        }

        alert('Password changed successfully');
        this.$router.push('/');
      } catch (error) {
        alert(error.message);
      } finally {
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmNewPassword = '';
      }
    },
  },
};
</script>

<style scoped src="@/assets/styles/forms.css"></style>