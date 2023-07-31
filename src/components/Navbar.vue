<template>
  <div>
    <nav
      class="bg-transparent flex flex-wrap justify-around items-center my-10 md:gap-y-0 gap-y-10"
    >
      <!-- Left Content: Logo -->
      <div class="">
        <img
          src="../assets/images/blog-logo.png"
          alt="Logo"
          class="md:w-52 w-44"
        />
      </div>

      <!-- Right Content -->
      <div class="" v-if="enrolledUser">
        <BlogGenerate />
      </div>
      <div
        class="flex items-center justify-center cursor-pointer"
        v-if="enrolledUser"
      >
        <p class="text-lg font-poppins">
          Hello
          <span class="font-bold text-redness">{{
            enrolledUser.username
          }}</span>
        </p>
        <LogoutIcon
          fillColor="#880808"
          class="mr-1 ml-5"
          @click="handleSignOut"
        />
        <span @click="handleSignOut" class="text-[#880808]">Logout</span>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { watchEffect, computed } from "vue";
import BlogGenerate from "./BlogGenerate.vue";
import LogoutIcon from "vue-material-design-icons/Logout.vue";
import { useAuthStore } from "../stores/userAuth";

const authStore = useAuthStore();

const enrolledUser = computed(() => {
  return authStore.user;
});

const handleSignOut = () => {
  authStore.signOut();
};

watchEffect(() => {
  authStore.checkForToken;
});
</script>
