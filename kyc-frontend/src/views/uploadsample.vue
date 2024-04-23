<template>
    <div>
      <input type="file" @change="onFileChange">
      <button @click="uploadImage">Upload Image</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedFile: null,
      };
    },
    methods: {
      onFileChange(event) {
        this.selectedFile = event.target.files[0];
      },
      uploadImage() {
        const formData = new FormData();
        formData.append('image', this.selectedFile);
  
        fetch('http://localhost:3000/documents', {
          method: 'POST',
          body: formData,
        })
        .then(response => {
          if (response.ok) {
            console.log('Image uploaded successfully');
          } else {
            throw new Error('Image upload failed.');
          }
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
      },
    },
  };
  </script>
  