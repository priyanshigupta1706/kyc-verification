<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="max-w-md w-full mx-auto">
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 class="text-2xl mb-6 text-center font-bold">Enter your email</h2>
        <input v-model="email" type="email" placeholder="Email Address" class="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500">
        <button @click="sendOTP" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Send OTP
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: ''
    };
  },
  methods: {
    async sendOTP() {
      try {
        const response = await axios.post('http://localhost:3000/sendOTP', { email: this.email });
        console.log(response.data); // Handle the response (success/error message)
      } catch (error) {
        console.error('Error sending OTP:', error);
      }
    }
  }
};
</script>
