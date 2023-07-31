import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { HfInference } from "@huggingface/inference";

export const useBlogStore = defineStore("blog", () => {
  const hf = new HfInference(import.meta.env.API_KEY);
  const isLoading = ref(false);
  const blogsList = ref([]);
  const router = useRouter();

  const fetchData = computed(async () => {
    try {
      isLoading.value = true;
      const blogsData = await axios.get("http://localhost:3000/blogs");
      blogsList.value = blogsData.data;
      isLoading.value = false;

      return blogsList.value;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  });

  const generateImg = async () => {
    const generatedImgResult = await hf.textToImage({
      model: "stabilityai/stable-diffusion-2",
      inputs:
        "award winning high resolution photo of a giant tortoise/((ladybird)) hybrid, [trending on artstation]",
      parameters: {
        negative_prompt: "blurry",
      },
    });

    return URL.createObjectURL(generatedImgResult);
  };

  const createBlog = async (blogTitle) => {
    try {
      isLoading.value = true;
      const response = await axios.post(`http://localhost:3000/blogs`, {
        title: blogTitle,
      });

      const result = await response.data;

      blogsList.value.push(result);

      isLoading.value = false;

      router.push({ name: "Blog", params: { id: result.id } });
    } catch (error) {
      console.log("🚀 ~ file: blog.js:55 ~ handleUserInput ~ error:", error);
    }
  };

  const summarizeTextModel = async (text) => {
    isLoading.value = true;
    const summary = await hf.summarization({
      model: "facebook/bart-large-cnn",
      inputs: `${text}`,
      parameters: {
        max_length: 1000,
      },
    });
    isLoading.value = false;
    return summary.summary_text;
  };

  return { isLoading, blogsList, fetchData, createBlog, summarizeTextModel };
});
