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
                  Create an account
              </h1>
             
              
              <form @submit.prevent="register">
            
                <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
      <input v-model="name" type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Name" required>
    </div>
    <div class="relative">
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
      <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required>
    </div>
    
    <button @click="sendOTP" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs focus:outline-none focus:shadow-outline absolute bottom-0 right-0 m-2">
      Send OTP
    </button>
  </div>
  
  <div class="flex items-center justify-between">
  <label for="otp" class="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Enter OTP
  </label>
  <div>
    <h2 v-if="verifymsg" class="text-emerald-500 font-bold">{{ verifymsg }}</h2>
    <h2 v-else-if="failedmsg" class="text-red-500 font-bold">{{ failedmsg }}</h2>
  </div>
</div>
<input type="text" v-model="enteredOTP" name="otp" id="otp" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter OTP" required>

  
       <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                  </div>
              
                   <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Register</button>
                  

                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <router-link to="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</router-link>
                  </p>
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
      name: '',
      email: '',
      password: '',
      data: '',
      otpcode: '',
      enteredOTP: '',
      verifymsg: '',
      failedmsg: ''
    };
  },

  watch: {
    enteredOTP(newValue) {
      if (newValue.length === 4) {
        this.verifyOTP();
      }
    },
  },


    methods: {
  showToast() {
    toast.success('successfully Registered', {
      autoClose: 3000,
    });
  },

  showToastError() {
    toast.error('Invalid OTP' , {
      autoClose: 3000,
    });
  },

  
  showToastSuccess() {
    toast.success('Email Verified' , {
      autoClose: 3000,
    });
  },

  register() {
  if (this.enteredOTP === this.otpcode) {
    axios.post('http://localhost:3000/registeredusers', {
      name: this.name,
      email: this.email,
      password: this.password
    })
    .then(response => {
      this.data = 1;
      console.log('API response:', response);
      this.showToast('Registration successful!');

      // Delay the router push after the toast message appears
      setTimeout(() => {
        this.$router.push("/uploadDoc");
      }, 2000); // Adjust the delay time (in milliseconds) as needed
    })
    .catch(error => {
      console.error('API error:', error);
      // Handle error if needed
    });
  } else {
    this.showToastError('Invalid OTP. Registration failed!');
  }
},

    async sendOTP() {
      try {
        const response = await axios.post('http://localhost:3000/sendOTP', { email: this.email });
        this.otpcode = response.data.message;
        console.log(this.otpcode);
      } catch (error) {
        console.error('Error sending OTP:', error);
      }
    },

    verifyOTP() {
      if (this.enteredOTP === this.otpcode) {
       // this.verifymsg = 'Email Verified';
        this.showToastSuccess();
      } else {
       // this.failedmsg = 'Invalid OTP';
        this.showToastError();
      }
    },
  },
};

</script>

<!-- <style>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style> -->