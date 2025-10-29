import { createApp } from "vue";
import "./style/style.css";
import App from "./App.vue";
import  router  from "./router";
import { createPinia } from "pinia";
import { useSessionUser } from "./store/useSessionUser";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);


// initialze Supabase session 
const sessionUser = useSessionUser();
// calls supabsae 
await sessionUser.init(); 

app.use(router);
await router.isReady();
app.mount("#app");
