
export const app = {
  namespaced: true,
  state: () => ({
    isSearchFocused: false,
  }),
  actions: {
    toggleSearchFocus({ state }, status) {
      state.isSearchFocused = status;
    },
  },
};
