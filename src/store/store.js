 import Vue from 'vue';
import Vuex from 'vuex';
// import test from '../data/test.json';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loading: true,
    test: '',
    rowDetails: '',
    tableItemsNumber: 5,
    paginationRange: ''
  },
  mutations: {
    SET_LOADING_STATE(state, payload) {
      this.state.loading = payload;
    },
    SET_TEST_DATA(state, payload) {
      this.state.test = payload;
    },
    SET_CURRENT_PAGE(state, payload) {
      this.state.currentPage = payload;
    },
    UPDATE_ROW_DETAILS(state, payload) {
      this.state.rowDetails = payload;
    }, 
    CHANGE_TABLE_ITEMS_NUMBER(state, payload) {
      this.state.tableItemsNumber = payload;
    },
    CHANGE_PAGINATION_RANGE(state, payload) {
      this.state.paginationRange = payload;
    }
  }
});