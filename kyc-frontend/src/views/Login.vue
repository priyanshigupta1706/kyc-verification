<template>
   <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
          KYC Verification  
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login to your account!
              </h1>
              <form @submit.prevent="login">
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
      <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required>
    </div>
    
    <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                  </div>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">login</button>
</form>
            
                </div>
                </div>
                </div>

   </section>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css'

export default {
  data() {
    return {
      email: '',
      password: '',
      data: null // Initialize data as null or whatever initial value suits your logic
    };
  },
  methods: {
    showToast() {
    toast.success('successfully Logged in', {
      autoClose: 3000,
    });
  },
  showToastError() {
    toast.error('Invalid Password' , {
      autoClose: 3000,
    });
  },

  async login() {
  try {
    const response = await axios.post('http://localhost:3000/login', {
      email: this.email,
      password: this.password,
    });

    if (response && response.status === 200) {
      // Assuming the backend sends a response with user data upon successful login
      this.data = response.data.user;
      console.log('API response:', response.data);
      // Toast for successful login
      this.showToast('Logged in successful!');

      // Delay the router push after the toast message appears
      setTimeout(() => {
        this.$router.push("/uploadDoc");
      }, 2000);
    } else {
      // Handle scenarios where data is not received or doesn't match the expected structure
      console.error('Invalid credentials or unexpected response');
      this.showToastError('Login failed. Invalid credentials.');
    }
  } catch (error) {
    console.error('API error:', error);
    // Handle error if needed
    this.showToastError('Error during login. Please try again.');
  }
},

  }
}
</script>
