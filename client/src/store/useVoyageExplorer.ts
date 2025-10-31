import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { VoyageSetup } from "../types/Voyage";
import type { VoyageStatus } from "../types/VoyageStatus";

// ===== State =====
/* this is used for to keep track of the voyages and ship selected

each voyage will store the voyage and ship details
along with the number of voyages completed

*/
export const useVoyageExplorer = defineStore("voyageExplorer", () => {
  const voyages = ref<VoyageSetup[]>([]);

  // getters
  const getMyVoyages = computed(() => voyages.value);

  //setters
  const setVoyage = (voyagesetup: VoyageSetup) => {
    // first push the new voyage to the array of voyages
    voyages.value.push(voyagesetup);

    //then change the status of the voyage from available to in-progress
    updateVoyageStatus(voyagesetup.voyage?.id!, "in-progress");
  };

  //update voyage status
  const updateVoyageStatus = (voyageId: number, status: VoyageStatus) => {
    const found = voyages.value.find((v) => v.voyage?.id === voyageId);
    if (found?.voyage) found.voyage.status = status;
  };

  //clear voyages
  function clearVoyages() {
    voyages.value = [];
  }

  return {
    clearVoyages,
    getMyVoyages,

    setVoyage,
    voyages,
  };
});
