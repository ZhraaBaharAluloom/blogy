<template>
  <div>
    <form @submit="handleUserInput">
      <label
        for="search"
        class="text-sm font-medium text-gray-900 sr-only dark:text-white"
        >keyword</label
      >
      <div class="relative md:w-96 w-[345px] m-auto">
        <input
          type="search"
          id="search"
          class="w-full inline p-4 pl-6 text-sm text-gray-900 border border-gray-300 bg-transparent dark:bg-transparent dark:border-gray-600 dark:placeholder-primary dark:text-primary dark:focus:ring-redness dark:focus:border-redness outline-none"
          placeholder="Enter a title to generate a blog"
          v-model="blogKeywordInput"
          required
        />
        <button
          type="submit"
          :disabled="isLoading"
          :class="{
            'text-white disabled:opacity-25': true,
            'absolute right-2.5 bottom-2.5 bg-primary': true,
            'hover:bg-secondary': !isLoading,
            'dark:hover:text-primary': !isLoading,
            'focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 dark:bg-primary   dark:focus:ring-transparent': true,
          }"
        >
          {{ isLoading ? "Generating..." : "Generate" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useBlogStore } from "../stores/blog";

const blogStore = useBlogStore();

const blogKeywordInput = ref("");

const isLoading = computed(() => blogStore.isLoading);

const handleUserInput = async (event) => {
  event.preventDefault();
  await blogStore.createBlog(blogKeywordInput.value);
  blogKeywordInput.value = "";
};
</script>
