import Vue from 'vue';
import Vuex from 'vuex';
import test from '../data/test.json';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    test,
    rowDetails: ''
  },
  mutations: {
    UPDATE_ROW_DETAILS(state, payload) {
      this.state.rowDetails = payload;
    }
  }
});