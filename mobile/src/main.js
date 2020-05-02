import Vue from 'vue'
import App from './App.vue'
import { Search } from 'vant';

Vue.use(Search);

import { Col, Row } from 'vant';

Vue.use(Col);
Vue.use(Row);

import { List } from 'vant';

Vue.use(List);

import { Cell, CellGroup } from 'vant';

Vue.use(Cell);
Vue.use(CellGroup);

import { Icon } from 'vant';
import router from './router'

Vue.use(Icon);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
