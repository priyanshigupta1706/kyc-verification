import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createToast } from 'vue3-toastify';

import './index.css';

// Create the Vue app instance
const app = createApp(App);

// Use the router and the toast plugin
app.use(router);
app.use(createToast);

// Mount the app
app.mount('#app');

