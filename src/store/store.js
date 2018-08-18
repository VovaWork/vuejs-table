import Vue from 'vue';
import Vuex from 'vuex';
import test from '../data/test.json';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    test,
    rowDetails: '',
    tableItemsNumber: 10
  },
  mutations: {
    UPDATE_ROW_DETAILS(state, payload) {
      this.state.rowDetails = payload;
    }, 
    CHANGE_TABLE_ITEMS_NUMBER(state, payload) {
      this.state.tableItemsNumber = payload;
    }
  }
});