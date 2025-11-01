import { defineStore } from "pinia";

export const useProfile = defineStore('profile', {
  state: () => ({ initialized:false, seenIntro:false }),
  /* bootstrap stays as you wrote earlier */
})
