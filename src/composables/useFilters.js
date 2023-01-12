import { reactive, watch } from "vue";

export const useFilters = (onUrlChange) => {
  const state = reactive({
    searchText: "",
    filters: {
      year: "",
      programType: "",
      movie: "",
      series: "",
    },
    sorts: "",
  });

  const filterParams = (externalFilters) => {
    return Object.entries(externalFilters)
      .reduce((filters, [name, value]) => {
        if (value) {
          filters.push(`filter[${name}]=${value}`);
        }
        return filters;
      }, [])
      .join("&");
  };

  const getSortsParams = (sorts) => {
    return sorts && `_sort=${sorts}`;
  };

  watch(
    () => state,
    (state) => {
      let params = [filterParams(state.filters), getSortsParams(state.sorts)];

      const urlParams = params
        .filter((value) => value && value?.trim())
        .join("&");
      const finalUrl = `${window.location.pathname}?${urlParams}`;
      if (finalUrl != window.location.toString()) {
        onUrlChange && onUrlChange(urlParams);
      }
    },
    { deep: true }
  );

  return state;
};
