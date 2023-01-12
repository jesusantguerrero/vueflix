import axios from "axios";

export const movies = {
  namespaced: true,
  state: () => ({
    data: [],
  }),
  getters: {
    series(state) {
      return state.data.filter((stream) => stream.programType == "series");
    },

    movies({ state }) {
      return state.data.filter((stream) => stream.programType == "movies");
    },
  },
  actions: {
    fetchMovies({ state }) {
      axios.get(import.meta.env.VITE_API_URL).then(({ data }) => {
        state.data = data;
      });
    },
  },
};
