import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import uiComponents from "./ui-components";
import "./index.css";

const app = createApp(App);
uiComponents.map((component) => app.component(component.name, component));
app.use(store);
app.mount("#app");
