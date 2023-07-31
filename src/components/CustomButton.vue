<template>
  <button
    :class="{
      'fixed bottom-40 md:right-0 right-[-11px] border-r-0 lg:border-r-2 lg:right-20':
        !isStuck || !sumStuck,
      'fixed bottom-24 md:right-0 right-[-11px] border-r-0 lg:border-r-2 lg:right-20':
        isStuck && sumStuck,
      absolute: !isStuck,
    }"
    @click="handleClick"
    class="md:w-36 w-32 md:px-0 border-t-4 border-t-redness border-x-2 border-x-primary border-b-2 border-b-primary py-2 md:bg-transparent bg-secondary"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  sumStuck: {
    type: Boolean,
  },
});

const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click");
};

const isStuck = ref(false);

const handleScroll = () => {
  isStuck.value = window.scrollY > 0.3 * window.innerHeight;
};

onMounted(() => {
  // Add the scroll event listener when the component is mounted
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  // Remove the scroll event listener before the component is unmounted
  window.removeEventListener("scroll", handleScroll);
});

// Call handleScroll initially to set the initial value of isStuck
handleScroll();
</script>
