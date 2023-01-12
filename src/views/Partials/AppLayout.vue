<script setup>
import AppHeader from "@/components/AppHeader.vue";

</script>

<template>
  <main>
    <AppHeader>
      <slot name="header" />
    </AppHeader>
    <slot />
  </main>
</template>
