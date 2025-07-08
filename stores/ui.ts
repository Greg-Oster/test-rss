import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    view: 1,
  }),

  getters: {
    getTest: (state) => {
      return state.count
    },
  },

  actions: {
    increment() {
      this.test++
    },
    decrement() {
      this.test--
    },
  },

  persist: {
    storage: piniaPluginPersistedstate.cookies(),
  },
})
