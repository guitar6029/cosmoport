import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import  router  from "./router";
import { createPinia } from "pinia";
import { useSessionUser } from "./store/useSessionUser";

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);


// initialze Supabase session 
const sessionUser = useSessionUser();
sessionUser.init();

app.mount("#app");
