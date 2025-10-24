export const usePagination = (totalItems: Ref<number>, itemsPerPage: Ref<number>) => {
    const currentPage = ref(1);

    const goToPreviousPage = () => {
        if (currentPage.value > 1) {
          currentPage.value--;
        }
      };
      const goToNextPage = () => {
        if (currentPage.value < totalPages.value) {
          currentPage.value++;
        }
      };
      // Pagination methods
    const goToPage = (page: number) => {  
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };
    const totalPages = computed(() =>
        Math.ceil(totalItems.value / itemsPerPage.value),
      );
      const startItem = computed(
        () => (currentPage.value - 1) * itemsPerPage.value + 1,
      );
      const endItem = computed(() =>
        Math.min(currentPage.value * itemsPerPage.value, totalItems.value),
      );

      // Generate page numbers for pagination
const pageNumbers = computed(() => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
  
    if (totalPages.value <= maxVisiblePages) {
      for (let i = 1; i <= totalPages.value; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage.value <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages.value);
      } else if (currentPage.value >= totalPages.value - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages.value - 3; i <= totalPages.value; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages.value);
      }
      console.log("pages", pages)
    }
 
    return pages;
  });

    return {
        currentPage,
        endItem,
        goToNextPage,
        goToPage,
        goToPreviousPage,
        pageNumbers,
        startItem,
        totalItems,
        totalPages
    };
  };
  