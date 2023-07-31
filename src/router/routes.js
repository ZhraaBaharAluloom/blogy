import Home from "../components/Home.vue";
import BlogVue from "../components/BlogVue.vue";
import Signup from "../components/Signup.vue";
import Signin from "../components/Signin.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Blog",
    path: "/blog/:id",
    component: BlogVue,
  },
  {
    name: "Signup",
    path: "/auth/signup",
    component: Signup,
  },
  {
    name: "Signin",
    path: "/auth/signin",
    component: Signin,
  },
];

export default routes;
