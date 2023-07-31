<template>
  <div id="blogs" class="curser-pointer">
    <div class="max-w-md border-r border-gray-400">
      <img class="px-10" :src="blog.photo" alt="blog.title" />
      <div class="p-10">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-[#201F1F]"
        >
          {{ blog.title }}
        </h5>
        <p
          class="mb-3 font-normal text-gray-700 dark:text-gray-600 text-justify line-clamp-5 pb-6"
        >
          {{ blog.intro }}
        </p>

        <router-link :to="{ name: 'Blog', params: { id: blog.id } }">
          <button
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary hover:bg-secondary hover:text-primary focus:ring-2 focus:outline-none focus:ring-white dark:bg-primary dark:hover:bg-secondary dark:focus:ring-primary cursor-pointer"
          >
            Read more
            <svg
              class="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </router-link>
        <p class="float-right">
          By <span class="text-redness">@{{ blog?.user?.username }}</span>
        </p>
        <div class="border-t mt-5 border-gray-400"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  blog: {
    type: Object,
  },
});
</script>

<style></style>
