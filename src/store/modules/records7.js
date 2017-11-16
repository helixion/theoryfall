import {get, post, put} from 'axios';

const namespace = false;

const state = {
    id: 0,
    powers: [],
    disciplines: [],
    classes: [],
    tags: [],
    meta: {},
    active: ''
};

const getters = {
    records: state => state[state.active],
    meta: state => state.meta,
    id: state => state.id
};

const mutations = {
    'SET_POWERS'(state, powers) {
        state.powers = powers;
    },

    'SET_DISCIPLINES'(state, powers) {
        state.disciplines = disciplines;
    },

    'SET_CLASSES'(state, powers) {
        state.classes = classes;
    },

    'SET_TAGS'(state, powers) {
        state.tags = tags;
    },

    'SET_ACTIVE'(state, active) {
        state.active = active;
    },

    'SET_META'(state, meta) {
        state.meta = meta;
    },

    'SET_ID'(state, id) {
        if (state.id === id) {
            state.id = 0;
        } else {
            state.id = id;
        }
    }
};

const actions = {

    init({commit}, payload) {
        const type = payload.type.toUpperCase();
        commit('SET_ACTIVE', payload.type);
        return get(`/${payload.type}`)
            .then(res => {
                commit('SET_META', res.data[payload.type].meta);
                commit(`SET_${type}`, res.data[payload.type].results);
            })
            .catch(e => {
                if (e.response) {
                    console.error(e.response.headers);
                    console.error(e.response.status);
                } else {
                    console.log(e.config);
                }
            })
    }
}

export default {
    namespace,
    state,
    getters,
    mutations,
    actions
}