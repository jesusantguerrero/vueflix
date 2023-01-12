<script setup>
import { AtButton } from "atmosphere-ui";
</script>


<template>
  <div
    class="rounded-md h-96 bg-cover w-full relative"
    :style="{
      backgroundImage:
        'url(https://streamcoimg-a.akamaihd.net/000/115/93/11593-PosterArt-33274b61ab0cb0e19cb7bff35824efb9.jpg)',
    }"
  >
    <div
      class="w-full h-full absolute bg-gradient-to-b from-transparent via-white/10 to-white"
    ></div>
    <footer class="px-4 py-2 absolute bottom-8 flex justify-between w-full">
      <AtButton class="text-white bg-red-600 rounded-md"> Watch now </AtButton>

      <h4 class="text-4xl text-gray-600 font-bold">
        Sherlock: The Abominable Bride
      </h4>
    </footer>
  </div>
</template>
