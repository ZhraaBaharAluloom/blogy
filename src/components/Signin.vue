<template>
  <div
    class="max-h-screen bg-secondary py-6 flex flex-col justify-center sm:py-12"
  >
    <form
      @submit.prevent="handleSignIn"
      class="relative py-3 sm:max-w-xl sm:mx-auto"
    >
      <div
        class="absolute inset-0 bg-gradient-to-r from-primary to-redness shadow-xl transform -skew-y-6 sm:skew-y-0 -rotate-6"
      ></div>
      <div class="relative px-4 py-10 bg-secondary shadow-2xl sm:p-20">
        <div class="max-w-md mx-auto">
          <div>
            <h5 class="text-2xl font-medium text-gray-900 dark:text-primary">
              Sign up to our awesome
              <span class="text-redness"> Blogy</span>
            </h5>
          </div>
          <div class="divide-y divide-gray-200">
            <div
              class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
            >
              <div class="relative">
                <input
                  type="username"
                  name="username"
                  id="username"
                  v-model="usernameValue"
                  class="peer placeholder-transparent h-10 w-full border-b-2 border-primary text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent"
                  placeholder="Username"
                  required
                />

                <label
                  for="username"
                  class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >Username</label
                >
              </div>

              <div class="relative">
                <input
                  autocomplete="off"
                  id="password"
                  name="password"
                  type="password"
                  v-model="passwordValue"
                  class="peer placeholder-transparent h-10 w-full border-b-2 border-primary text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent"
                  placeholder="Password"
                  required
                />
                <label
                  for="password"
                  class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >Password</label
                >
              </div>

              <div class="relative">
                <button
                  type="submit"
                  class="w-full text-secondary bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-secondary hover:text-primary dark:focus:ring-blue-800"
                >
                  Login to your account
                </button>
                <div
                  class="text-sm font-medium text-gray-500 dark:text-primary pt-3"
                >
                  Not registered?

                  <router-link to="/auth/signup">
                    <span
                      class="text-redness hover:underline dark:text-redness"
                    >
                      Create account
                    </span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/userAuth";

const usernameValue = ref("");
const passwordValue = ref("");
const router = useRouter();

const authStore = useAuthStore();

const handleSignIn = async () => {
  const userCredentials = {
    username: usernameValue.value.trim(),
    password: passwordValue.value.trim(),
  };

  const authType = "signin";
  try {
    await authStore.authenticateUser(userCredentials, authType, router);
  } catch (error) {
    console.log("🚀 ~ file: Signin.vue:105 ~ handleSignIn ~ error:", error);
  }
};
</script>
