import Vue from 'vue';
import Vuex from 'vuex';

import records from './modules/records7';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: { records }
});