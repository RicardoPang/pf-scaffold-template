import { createApp } from 'vue';
import App from './App.vue';
import './styles/reset.css';

import PfComponents from '../../dist/<%= className %>.esm';

createApp(App).use(PfComponents).mount('#app');
