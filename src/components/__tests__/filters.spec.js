import { describe, it, expect } from "vitest";
import {
  parseFilterParams,
  parseParams,
  parseSortParams,
} from "../../composables/useFilters";

const paramsConfig = {
  sorts: {
    title: {
      value: true,
      direction: "desc",
    },
    releaseYear: {
      value: true,
      direction: "asc",
    },
  },
  filters: {
    releaseYear: {
      value: "2016",
    },
    programType: {
      value: "series",
    },
  },
};

const emptyParamsConfig = {
  sorts: {
    title: {
      value: false,
      direction: "desc",
    },
    releaseYear: {
      value: false,
      direction: "asc",
    },
  },
  filters: {
    releaseYear: {
      value: "",
    },
    programType: {
      value: "",
    },
  },
};
describe("Filters Transforms", async () => {
  it("transform one sort properly", async () => {
    const params = parseSortParams({
      title: {
        value: true,
        direction: "asc",
      },
      releaseYear: {
        value: false,
        direction: "",
      },
    });
    expect(params).toBe("_sort=title&_order=asc");
  });

  it("transform multiple sorts properly", async () => {
    const params = parseSortParams({
      title: {
        value: true,
        direction: "desc",
      },
      releaseYear: {
        value: true,
        direction: "asc",
      },
    });
    expect(params).toBe("_sort=title,releaseYear&_order=desc,asc");
  });

  it("transforms one filter properly", async () => {
    const params = parseFilterParams({
      releaseYear: {
        value: "2016",
      },
    });
    expect(params).toBe("releaseYear=2016");
  });

  it("transforms multiple filter properly", async () => {
    const params = parseFilterParams(paramsConfig.filters);

    expect(params).toBe("releaseYear=2016&programType=series");
  });

  it("it should combine filter and sort params", async () => {
    const params = parseParams(paramsConfig);

    expect(params).toBe(
      "releaseYear=2016&programType=series&_sort=title,releaseYear&_order=desc,asc"
    );
  });

  it("it should be empty", async () => {
    const params = parseParams(emptyParamsConfig);

    expect(params).toBeFalsy();
  });

  it("it should parse fulltext search", async () => {
    const params = parseParams({
      searchText: "hello world",
      filters: {},
      sorts: {},
    });

    expect(params).toBe("q=hello world");
  });
});
