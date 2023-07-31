<template>
  <div id="blog" class="text-center w-1/2 md:w-full m-auto" v-if="!isLoading">
    <h1 class="text-4xl font-poppins font-bold m-12">{{ blog?.title }}</h1>
    <div id="info" class="flex justify-center gap-5">
      <img
        class="w-14 h-14 rounded-full"
        :src="blog?.user.profileImg"
        alt="Rounded avatar"
      />
      <div class="text-left">
        <p class="text-lg font-bold text-redness">
          {{ blog?.user.username }}
        </p>
        <p class="text-sm">{{ blog?.formattedCreatedDate }}</p>
      </div>
    </div>
    <div class="flex justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-24 w-24"
        fill="black"
        viewBox="0 0 28 28"
        stroke="currentColor"
      >
        <circle cx="5" cy="12" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
      </svg>
    </div>
    <div id="blogContent" class="flex flex-col items-center">
      <img :src="blog?.photo" alt="" class="md:w-1/2" />
      <div
        id="blogInfo"
        class="text-justify lg:max-w-4xl max-w-xl"
        v-if="!summarization"
      >
        <div class="py-10">
          <h2 class="pb-2 text-2xl font-bold">Introduction</h2>
          <p class="text-lg">
            {{ blog?.intro }}
          </p>
        </div>
        <div class="py-10">
          <h2 class="pb-2 text-2xl font-bold">Outlines</h2>
          <ul>
            <li
              v-for="(outline, index) in blog?.outlines"
              :key="index"
              class="text-left list-disc py-1 text-lg"
            >
              {{ outline }}
            </li>
          </ul>
        </div>
        <div class="py-10">
          <div v-html="formattedContent" class="markdown-content"></div>
        </div>
      </div>
      <div v-else class="text-justify max-w-3xl my-10">
        <p>{{ summarization }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <LoaderVue />
  </div>
  <div class="flex justify-end relative">
    <custom-button @click="scrollToTop"> Back to top </custom-button>
    <custom-button
      @click="handleSummarizationButton"
      :sumStuck="sumStuck"
      class="fixed bottom-[95px]"
    >
      {{ !summarization ? "Summarize it" : "Origin content" }}
    </custom-button>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

import { useBlogStore } from "../stores/blog.js";
import CustomButton from "./CustomButton.vue";
import LoaderVue from "./LoaderVue.vue";

import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true, // Enable HTML tags in source
  xhtmlOut: true, // Use '/' to close single tags (<br />).
  // This is only for full CommonMark compatibility.
  breaks: true, // Convert '\n' in paragraphs into <br>
});

const blogStore = useBlogStore();

const blogCards = ref([]);
const sumStuck = ref(true);
const blogId = ref(route.params.id);
let summarization = ref(null);
let blog = ref(null);

const route = useRoute();
const isLoading = computed(() => blogStore.isLoading);

blogStore.fetchData.then((blogsData) => {
  blogCards.value = blogsData;
});

watchEffect(() => {
  blog.value = blogCards.value.find(
    (blogItem) => blogItem.id === Number(blogId.value)
  );
  return blog.value;
});

const formattedContent = computed(() => {
  if (blog.value && blog.value.content) {
    try {
      return md.render(JSON.parse(blog.value.content).data[0].content);
    } catch (error) {
      console.error("Error parsing blog content:", error);
    }
  }

  return null;
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleSummarizationButton = async () => {
  if (summarization.value) {
    summarization.value = null;
    return summarization.value;
  } else {
    summarization.value = await blogStore.summarizeTextModel(
      JSON.parse(blog.value.content).data[0].content
    );
    return summarization.value;
  }
};
</script>

<style>
.markdown-content {
  font-family: Arial, sans-serif;
  font-size: 20px;
  line-height: 1.8;
  color: #333;
}

.markdown-content h1 {
  font-size: 24px;
  font-weight: bold;
  padding: 20px 0px 0px;
  text-align: left;
}

.markdown-content h2 {
  font-size: 20px;
  font-weight: bold;
}

.markdown-content h3 {
  font-size: 18px;
  font-weight: bold;
}

.markdown-content a {
  color: #007bff;
}

.markdown-content code {
  background-color: #f2f2f2;
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
}

.markdown-content p {
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}

.markdown-content ol {
  list-style-type: number;
}
.markdown-content li {
  padding: 10px 0px;
}
</style>
