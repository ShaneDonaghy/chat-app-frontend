import './app.css'
import App from './App.svelte'
import {mount} from "svelte";
import './i18n';

const app = mount(App, {target: document.getElementById("app")});

export default app
