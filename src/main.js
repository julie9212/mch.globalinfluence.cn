import Vue from 'vue'
import App from './App.vue'
import router from './router'

import iview from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import api from './api';

//富文本编辑器====================================
import VueQuillEditor from "vue-quill-editor"; 
import 'quill/dist/quill.core.css'; 
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
// ==============================================

Vue.config.productionTip = false

Vue.use(iview);
Vue.use(api);
Vue.use(VueQuillEditor); //富文本编辑器

new Vue({
  el:"#app",
  router,
  render: h => h(App)
})