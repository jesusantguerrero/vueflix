import { createStore } from "vuex";
import { movies } from "./movies";

export const store = createStore({
    modules: {
        movies
    }
})