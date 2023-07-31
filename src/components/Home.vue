<template>
  <div id="main">
    <h1 class="text-center text-2xl font-bold font-poppins my-12">
      Blogy Blogs
    </h1>
    <div
      class="flex justify-center items-center gap-y-5 flex-wrap md:w-11/12 m-auto"
      v-if="!isLoading"
    >
      <BlogsListVue
        v-for="(blog, index) in blogCards"
        :blog="blog"
        :index="index"
        :key="blog.id"
      />
    </div>
    <div v-else>
      <LoaderVue />
    </div>
  </div>
  <div id="footer" class="flex justify-around items-center"></div>
</template>

<script setup>
import { computed, ref } from "vue";

import BlogsListVue from "./BlogsListVue.vue";
import LoaderVue from "./LoaderVue.vue";

import { useBlogStore } from "../stores/blog";

const blogStore = useBlogStore();

const isLoading = computed(() => blogStore.isLoading);
const blogCards = ref([]);

blogStore.fetchData.then((blogsData) => {
  blogCards.value = blogsData;
});
</script>
