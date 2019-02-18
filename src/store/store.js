import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loading: true,
    rowDetails: '',
    currentPage: 0,
    sendData: {
      searchString: "",
      total: "",
      count: 10000000,
      perPage: 5,
      sortBy: "",
      order: "",
      payload: "",
      newCurerncy: "",
      offset: {
        start: 0,
        end: 5
      }
    }
  },
  mutations: {
    SET_LOADING_STATE(state, payload) {
      this.state.loading = payload;
    },
    SET_TEST_DATA(state, payload) {
      this.state.sendData = payload;
    },
    SET_CURRENT_PAGE(state, payload) {
      this.state.currentPage = payload;
    },
    UPDATE_ROW_DETAILS(state, payload) {
      this.state.rowDetails = payload;
    }, 
    UPDATE_TOTAL(state, payload) {
      this.state.sendData.total = payload;
    },
    CHANGE_ITEMS_PER_PAGE(state, payload) {
      this.state.sendData.perPage = payload;
    },
    CHANGE_PAGINATION_OFFSET(state, payload) {
      this.state.sendData.offset = payload;
    },
    CHANGE_ORDER(state, payload) {
      this.state.sendData.order = payload;
    },
    CHANGE_SORT_BY(state, payload) {
      this.state.sendData.sortBy = payload;
    },
  }
});