<script setup lang="ts">
import { AtUserButton } from "atmosphere-ui";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";
import { nextTick, ref, watch, computed } from "vue";
import {
  useBreakpoints,
  breakpointsTailwind,
  useWindowSize,
} from "@vueuse/core";
import { useStore } from "vuex";

const { logout } = useAuth();

defineProps({
  title: {
    type: String,
  },
  user: {
    type: Object,
  },
});

const userButtonOptions = {
  account: {
    label: "Options",
    sections: [
      ["Home", { emit: "home" }],
      ["Logout", { emit: "logout", separator: true }],
    ],
  },
};

defineEmits(["login", "logout", "createAccount"]);

const { push } = useRouter();
const onLogout = () => {
  logout().then(() => {
    nextTick(() => {
      push({ name: "login" });
    });
  });
};

// responsive
const { isSmaller } = useBreakpoints(breakpointsTailwind);
const checkIsMobile = () => {
  return isSmaller("md");
};

const isMobile = ref(checkIsMobile());

const { width } = useWindowSize();

watch(
  () => width,
  () => {
    isMobile.value = checkIsMobile();
  }
);
const store = useStore();
const isActiveSearch = computed(() => {
  return store.state.app.isSearchFocused && isMobile.value;
});
</script>

<template>
  <header class="bg-white">
    <div class="flex justify-between px-2 md:px-10 py-3 border-b">
      <router-link
        to="/"
        class="flex items-center mr-2 md:mr-0"
        v-if="!isActiveSearch"
      >
        <h1 class="text-xl font-bold text-red-500">VueFlix</h1>
      </router-link>

      <div
        class="mx-auto transition-all ease-in-out"
        :class="[isActiveSearch ? 'w-full' : 'max-w-7xl']"
      >
        <slot />
      </div>
      <div class="flex space-x-1 ml-2" v-if="!isActiveSearch">
        <AtUserButton :options="userButtonOptions" @logout="onLogout()" />
      </div>
    </div>
  </header>
</template>
