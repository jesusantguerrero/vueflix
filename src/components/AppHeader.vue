<script setup lang="ts">
import { AtUserButton } from "atmosphere-ui";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";
import { nextTick } from "vue";

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
</script>

<template>
  <header class="bg-white">
    <div class="flex justify-between px-10 py-3 border-b">
      <router-link to="/" class="flex items-center">
        <h1 class="text-xl font-bold text-red-500">VueFlix</h1>
      </router-link>

      <div class="max-w-7xl mx-auto">
        <slot />
      </div>
      <div class="flex space-x-1">
        <AtUserButton :options="userButtonOptions" @logout="onLogout()" />
      </div>
    </div>
  </header>
</template>
