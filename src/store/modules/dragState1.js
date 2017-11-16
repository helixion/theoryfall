import {get, post, put} from 'axios';

const namespace = false;

const state = {
    records: [],
    classList: [],
    groups: [],
    meta: null
};

const getters = {
    records: state => state.records,
    meta: state => state.meta,
    classList: state => state.classList,
    groups: state => state.groups
};

const mutations = {

    'UPDATE_RECORDS'(state, powers) {
        state.records = powers;
    },

    'UPDATE_META'(state, meta) {
        state.meta = meta;
    },

    'CREATE_GROUP'(state, group) {
        state.groups.push(group);
    },

    'REMOVE_GROUP'(state, index) {
        state.groups.splice(index, 1);
    },

    'EXPAND_COLLAPSE_GROUP'(state, group) {
        state.groups[group.index] = group.expand;
    },

    'CHANGE_GROUP_NAME'(state, group) {
        state.groups[group.index].name = group.name;
    },

    'CREATE_GROUP_MEMBER'(state, group) {
        state.groups[group.index].members.push(group.member);
    },

    'REMOVE_GROUP_MEMBER'(state, group) {
        state.groups[group.index].members.splice(group.memberIndex, 1);
    },

    'CHANGE_GROUP_MEMBER_TITLE'(state, group) {
        state.groups[group.index].members[group.memberIndex].title = group.title;
    },

    'UPDATE_GROUP_MEMBER_ABILITY_BAR'(state, data) {
        state.groups[data.groupIndex]
            .members[data.memberIndex]
            .trays[data.activeTray]
            .splice(data.dropIndex, 0, data.dragData);
    },

    'CHANGE_ABILITY_TRAY'(state, data) {
        state.groups[data.groupIndex]
            .members[data.memberIndex]
            .activeTray = data.activeTray;
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
    },

    setDragData({commit}, data) {
        commit('SET_DRAG_DATA', data);
    }
};

export default {
    namespace,
    state,
    getters,
    mutations,
    actions
}