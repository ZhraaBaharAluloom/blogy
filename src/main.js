import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

import { createRouter, createWebHistory } from "vue-router";
import routes from "./router/routes.js";
// import dotenv from "dotenv";

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();

// dotenv.config();

app.use(router);
app.use(pinia);
app.mount("#app");
