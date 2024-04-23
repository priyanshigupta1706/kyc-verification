<template>
   <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
       @drop="handleDrop"
       @dragover.prevent
       @dragenter.prevent="isDragging = true"
       @dragleave.prevent="isDragging = false"
       :class="{ 'border-dashed border-gray-500': isDragging }">
       <a class="flex flex-row items-center justify-center mb-6 text-2xl  font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
          KYC Verification  
      </a>
    <label for="fileInput" class="relative">
      <input
        type="file"
        id="fileInput"
        @change="handleImageUpload"
        class="hidden"
      />
      <div v-if="!selectedImage" class="rounded-lg p-12 cursor-pointer border-4 border-dashed text-center w-full shadow dark:border md:mt-0 sm:max-w-md  dark:bg-gray-800 dark:border-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mx-auto h-12 w-12 mb-4 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <!-- SVG Path -->
        </svg>
        <span class="text-lg font-semibold text-gray-500">Drag and Drop or Browse your Image</span>
        <span v-if="isDragging" class="block mt-2 text-sm text-gray-500">Drop image here</span>
      </div>
      <button
        v-else
        @click="sendImage"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg mt-6 transition duration-300"
      >
        Upload
      </button>
      <img
        v-if="uploadedImageUrl"
        :src="uploadedImageUrl"
        alt="Uploaded Image"
        class="mt-4 max-w-xs rounded-lg shadow-xl"
      />
    </label>
    <div class="fixed bottom-0 left-0 flex justify-start items-end w-full p-6">
      <!-- Previous button -->
      <button
        @click="goToPreviousPage"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300"
      >
        Previous
      </button>

  
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
      selectedImage: null,
      uploadedImageUrl: null,
      isDragging: false,
    };
  },
  methods: {

    showToast() {
    toast.success('successfully Uploaded', {
      autoClose: 3000,
    });
  },

  showToastError() {
    toast.error('Error' , {
      autoClose: 3000,
    });
  },

  goToPreviousPage() {
        this.$router.go(-1); 
      },

    handleImageUpload(event) {
      this.selectedImage = event.target.files[0];
      this.previewImage();
    },
    async sendImage() {
      if (this.selectedImage) {
        const formData = new FormData();
        formData.append('image', this.selectedImage);

        try {
          const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
          });
          // Handle response as needed
          console.log('Image uploaded!', response);
          this.showToast('Registration successful!');
          setTimeout(() => {
        this.$router.push("/uploadVideo");
      }, 2000); 
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      } else {
      this.showToastError('Invalid OTP. Registration failed!');
    }
    },
    handleDrop(event) {
      event.preventDefault();
      this.isDragging = false;
      if (event.dataTransfer.files.length > 0) {
        this.selectedImage = event.dataTransfer.files[0];
        this.previewImage();
      }
    },
    previewImage() {
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImageUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedImage);
    },
  },
};
</script>
