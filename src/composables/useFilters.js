import { reactive, toRefs, watch } from "vue";

export const parseFilterParams = (filterConfig) => {
  return Object.entries(filterConfig)
    .reduce((filters, [name, filter]) => {
      if (filter.value) {
        filters.push(`${name}=${filter.value}`);
      }
      return filters;
    }, [])
    .join("&");
};

export const parseSortParams = (sortConfig) => {
  const params = Object.entries(sortConfig).reduce(
    (sortValues, [name, sort]) => {
      if (sort.value) {
        sortValues._sort.push(name);
        sortValues._order.push(sort.direction);
      }
      return sortValues;
    },
    {
      _sort: [],
      _order: [],
    }
  );
  return (
    Object.entries(params)
      // eslint-disable-next-line no-unused-vars
      .filter(([_name, sorts]) => sorts.length)
      .map(([name, values]) => `${name}=${values.join(",")}`)
      .join("&")
  );
};

export const parseParams = (paramsConfig) => {
  let params = [
    parseFilterParams(paramsConfig.filters),
    parseSortParams(paramsConfig.sorts),
  ];

  return params.filter((value) => value?.trim()).join("&");
};

const DEFAULT_CONFIG = {
  searchText: "",
  filters: {
    releaseYear: {
      label: "Year",
      value: "",
    },
    programType: {
      label: "Type",
      value: "",
      options: ["movie", "series"],
    },
  },
  sorts: {
    title: {
      label: "Name",
      value: "",
      direction: "",
    },
    releaseYear: {
      label: "Year",
      value: "",
      direction: "",
    },
  },
};

export const useFilters = (onUrlChange) => {
  const state = reactive({ ...DEFAULT_CONFIG });

  watch(
    () => state,
    (paramsConfig) => {
      const urlParams = parseParams(paramsConfig);
      const finalUrl = `${window.location.pathname}?${urlParams}`;

      if (finalUrl != window.location.toString()) {
        onUrlChange && onUrlChange(urlParams);
      }
    },
    { deep: true }
  );

  const reset = () => {
    state.searchText = DEFAULT_CONFIG.searchText;
    state.filters = DEFAULT_CONFIG.filters;
    state.sorts = DEFAULT_CONFIG.sorts;
  };

  return {
    ...toRefs(state),
    reset,
  };
};
