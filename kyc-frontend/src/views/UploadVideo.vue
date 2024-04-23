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
    <label for="videoInput" class="relative">
      <input
        type="file"
        id="videoInput"
        ref="videoInputRef"
        @change="handleVideoUpload"
        accept="video/*"
        class="hidden"
      />
      <div v-if="!uploadedVideoUrl" class="rounded-lg p-12 cursor-pointer border-4 border-dashed text-center w-full shadow dark:border md:mt-0 sm:max-w-md  dark:bg-gray-800 dark:border-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mx-auto h-12 w-12 mb-4 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <!-- SVG Path -->
        </svg>
        <span class="text-lg font-semibold text-gray-500"> Drag and Drop OR Browse your video</span>
        <span v-if="isDragging" class="block mt-2 text-sm text-gray-500">Drop video here</span>
        <label for="videoInput" class="block w-full h-full absolute top-0 left-0 cursor-pointer"></label>
      </div>
      <button
        v-else
        @click="sendVideo"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300"
      >
        Upload
      </button>
      <video v-if="uploadedVideoUrl" :src="uploadedVideoUrl" controls class="mt-4 max-w-xs"></video>
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
      selectedVideo: null,
      uploadedVideoUrl: null,
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

    openVideoInput() {
      this.$refs.videoInputRef.click();
    },
    handleVideoUpload(event) {
      this.selectedVideo = event.target.files[0];
      this.previewVideo();
    },
    async sendVideo() {
      if (this.selectedVideo) {
        const formData = new FormData();
        formData.append('video', this.selectedVideo);

        try {
          const response = await fetch('http://localhost:3000/uploadVideoDifferent', {
            method: 'POST',
            body: formData,
          });
          // Handle response as needed
          console.log('Video uploaded!', response);
          this.showToast('Registration successful!');
          
        } catch (error) {
          console.error('Error uploading video:', error);
        }
      } else {
      this.showToastError('Invalid OTP. Registration failed!');
    }
    },
    handleDrop(event) {
      event.preventDefault();
      this.isDragging = false;
      if (event.dataTransfer.files.length > 0) {
        this.selectedVideo = event.dataTransfer.files[0];
        this.previewVideo();
      }
    },
    previewVideo() {
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedVideoUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedVideo);
    },
  },
};
</script>

<style>
/* Add Tailwind classes or custom styles here */
</style>
