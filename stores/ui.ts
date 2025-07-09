import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    view: 1,
  }),

  getters: {
    isListView: state => state.view === 1,
    isTileView: state => state.view === 2,
  },

  actions: {
    setListView() {
      this.view = 1
    },
    setTileView() {
      this.view = 2
    },
  },

  persist: {
    storage: piniaPluginPersistedstate.cookies(),
  },
})
