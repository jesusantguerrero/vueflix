<script setup>
import { nextTick, reactive } from "vue";
import { AtAuthBox, AtAuthForm } from "atmosphere-ui";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const { login, register } = useAuth();

const props = defineProps({
  mode: {
    type: String,
    default: "login",
  },
});
const authMethods = {
  login,
  register,
};

const state = reactive({
  isLoading: false,
  formData: {
    email: "",
    password: "",
  },
});

const { push } = useRouter();
const onSubmit = async (data) => {
  try {
    const user = await authMethods[props.mode](data);
    nextTick(() => {
      console.log(user);
      push({ name: "home" });
    });
  } catch (error) {
    alert(error.message);
  } finally {
    state.isLoading = false;
  }
};

const onLinkPressed = () => {
  const route = props.mode == "login" ? "register" : "login";
  push(route);
};
</script>

<template>
  <AtAuthBox>
    <AtAuthForm
      :is-loading="isLoading"
      :mode="mode"
      v-model="formData"
      @submit="onSubmit"
      @link-pressed="onLinkPressed"
      btn-class="mb-2 font-bold border-2 border-red-400 rounded-md bg-gradient-to-br from-red-600 to-red-800"
    >
      <template #brand>
        <router-link :to="{ name: 'home' }" class="w-full font-bold font-brand">
          Vueflix
        </router-link>
      </template>
    </AtAuthForm>
  </AtAuthBox>
</template>
