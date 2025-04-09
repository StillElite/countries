import "./assets/main.css";
import router from "./router";
import "@fontsource/nunito-sans";

import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.use(router);

app.mount("#app");
