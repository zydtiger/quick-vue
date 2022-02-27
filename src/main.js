import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './utils/spacingjs'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch, faXmark, faTrashCan, faArrowRight, faArrowLeft, faBold, faItalic, faUnderline, faStrikethrough } from '@fortawesome/free-solid-svg-icons';

library.add(faXmark, faSearch, faTrashCan, faArrowLeft, faArrowRight, faBold, faItalic, faUnderline, faStrikethrough);

createApp(App).use(store).use(router).component('fa-icon', FontAwesomeIcon).mount('#app')
