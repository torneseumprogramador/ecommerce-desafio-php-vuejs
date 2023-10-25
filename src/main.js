import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

const app = createApp(App);
app.use(router); // Use o Vue Router
app.mount('#app');

