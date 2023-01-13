import { createStore } from "vuex";
import { movies } from "./movies";
import { app } from "./app";

export const store = createStore({
  modules: {
    movies,
    app,
  },
});
