import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 101,
    products: [
      {
        name: '鼠标', price: 20
      },
      {
        name: '键盘', price: 40
      },
      {
        name: '耳机', price: 60
      },
      {
        name: '显示屏', price: 80
      }
    ]
  },
  getters: {
    count: (state) => {
      return state.count
    },
    products(state) {
      return state.products
    }
  },
  mutations: {
    increment(state) {
      state.products.forEach(item => item.price++);
    },
    add(state) {
      console.log(2222);
      // state.count++;
      console.log(state.count++)
    },
    reduce(state, payload) {
      state.count = state.count - payload;
      console.log(state.count);
    } 
  },
  actions: {
    add({commit}) {
      console.log('1111');
      commit('add');
    },
    increment({commit, state}) {
      commit('increment');
    }
  },
  modules: {}
});
