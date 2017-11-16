import Vue from 'vue';
import Vuex from 'vuex';

import drag from './modules/dragState';

Vue.use(Vuex);

const modules = { drag };

export default new Vuex.Store({
    modules
});