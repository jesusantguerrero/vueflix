import axios from "axios";
const endpoint = import.meta.env.VITE_API_URL;

export const movies = {
  namespaced: true,
  state: () => ({
    data: [],
    searchResults: [],
    searchParams: "",
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
      axios.get(endpoint).then(({ data }) => {
        state.data = data;
      });
    },
    executeSearch({ state }, searchParams) {
      state.searchParams = searchParams;
      axios.get(`${endpoint}?${searchParams}`).then(({ data }) => {
        state.searchResults = data;
      });
    },
  },
};
