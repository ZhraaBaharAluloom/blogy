import { defineStore } from "pinia";
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import decode from "jwt-decode";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("user", () => {
  const router = useRouter();
  let isLoading = ref(false);
  let user = ref(null);

  const setUser = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("myToken", token);
    user.value = decode(token);
  };

  const authenticateUser = async (userCredentials, authType, router) => {
    try {
      const createdUserToken = await axios.post(
        `http://localhost:3000/auth/${authType}`,
        { ...userCredentials }
      );

      setUser(createdUserToken.data.token);

      router.push("/");
    } catch (error) {
      console.log("🚀 ~ file: Signin.vue:90 ~ singIn ~ error:", error);
    }
  };

  const signOut = () => {
    // delete axios.defaults.headers.common.Authorization;
    localStorage.removeItem("myToken");
    user.value = null;
    router.push("/auth/signin");
  };

  const checkForToken = computed(() => {
    const token = localStorage.getItem("myToken");
    if (token) {
      setUser(token);
    } else {
      signOut();
    }
  });

  return { isLoading, user, authenticateUser, signOut, checkForToken };
});
