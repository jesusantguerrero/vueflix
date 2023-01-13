<script setup>
import { nextTick, reactive } from "vue";
import { AtAuthBox, AtAuthForm, AtButton } from "atmosphere-ui";
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
  shouldValidateEmail: false,
});

const resolveRedirection = () => {
  if (props.mode == "register") {
    state.shouldValidateEmail = true;
  } else {
    push({ name: "home" });
  }
};

const { push } = useRouter();
const onSubmit = async (data) => {
  try {
    await authMethods[props.mode](data);
    nextTick(() => {
      resolveRedirection();
    });
  } catch (error) {
    alert(error.message);
  } finally {
    state.isLoading = false;
  }
};

const onLinkPressed = () => {
  const route = props.mode == "login" ? "register" : "login";
  state.shouldValidateEmail = false;
  push(route);
};
</script>

<template>
  <AtAuthBox>
    <AtAuthForm
      :is-loading="state.isLoading"
      :mode="mode"
      v-model="formData"
      @submit="onSubmit"
      @link-pressed="onLinkPressed"
      link-class="text-red-400 hover:text-red-500"
      btn-class="mb-2 font-bold border-2 border-red-400 rounded-md bg-gradient-to-br from-red-600 to-red-800"
      v-if="!state.shouldValidateEmail"
      :hide-action="state.shouldValidateEmail"
    >
      <template #brand>
        <router-link :to="{ name: 'home' }" class="w-full font-bold font-brand">
          Vueflix
        </router-link>
      </template>
    </AtAuthForm>
    <article v-else class="space-y-4 mb-10 text-center">
      <p>We had sent you an email to check your identity</p>

      <p>Please, Confirm your email to validate your account.</p>

      <AtButton
        class="mb-2 font-bold border-2 border-red-400 rounded-md bg-gradient-to-br from-red-600 to-red-800"
        @click="onLinkPressed"
      >
        Back to login
      </AtButton>
    </article>
  </AtAuthBox>
</template>
