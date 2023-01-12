import axios from "axios";

export const movies = {
  namespaced: true,
  state: () => ({
    data: [],
  }),
  actions: {
    fetchMovies({ state }) {
      axios.get(import.meta.env.VITE_API_URL).then(({ data }) => {
        state.data = data;
      });
    },
  },
};
