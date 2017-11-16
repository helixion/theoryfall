import {get, post, put} from 'axios';

const namespace = false;

const state = {
    records: [],
    classList: [],
    meta: null
};

const getters = {
    records: state => state.records,
    meta: state => state.meta,
    classList: state => state.classList,
};

const mutations = {

    'UPDATE_RECORDS'(state, powers) {
        state.records = powers;
    },

    'UPDATE_META'(state, meta) {
        state.meta = meta;
    },

    'SET_CLASS_LIST'(state, list) {
        state.classList = list;
    }
};

const actions = {

    async initRecords({commit}) {
        try {
            const response = await get('/powers');
            if (response.data.powers.results.length > 0) {
                commit('UPDATE_RECORDS', response.data.powers.results);
                commit('UPDATE_META', response.data.meta);
            } else {
                console.log('Problem fetching results..');
            }
        } catch (e) {
            if (e.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);                
            } else if (e.request) {
                console.log(e.request)
            } else {
                console.log('Error', error.message);
            }
            consone.log(e.config);
        }
    },

    async fetchClassList({commit}) {
        try {
            const response = await get('/classes');
            if (response.data.classes.length > 0) {
                commit('SET_CLASS_LIST', response.data.classes);
            } else {
                console.log('Problem fetching results...');
            }
        } catch (e) {
            if (e.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);                
            } else if (e.request) {
                console.log(e.request)
            } else {
                console.log('Error', error.message);
            }
            consone.log(e.config);
        }
    }
};

export default {
    namespace,
    state,
    getters,
    mutations,
    actions
}