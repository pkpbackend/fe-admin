import { useEffect, useState } from "react";
import _ from "lodash";

export default function useHook(
  query,
  options = {
    filtered: {
      defaultValue: {},
    },
    sorted: {
      defaultValue: [],
    },
    page: {
      defaultValue: {
        page: 1,
        pageSize: 10,
      },
    },
    withLimit: true,
  }
) {
  const defaultPage = options.withLimit
    ? options.page.defaultValue.page
    : undefined;
  const defaultPageSize = options.withLimit
    ? options.page.defaultValue.pageSize
    : undefined;
  const defaultSorted = options?.sorted?.defaultValue;

  const defaultFilter = options?.filtered?.defaultValue;

  const convertFilter = (filter) => {
    return _.filter(
      _.map(Object.keys(filter), (key) => {
        const value = filter[key];

        if (value === undefined) {
          return null;
        }

        return {
          id: key,
          value: filter[key],
        };
      }),
      (v) => v
    );
  };

  const [filter, setFilter] = useState(defaultFilter || {});
  const [page, setPage] = useState({
    page: defaultPage,
    pageSize: defaultPageSize,
  });
  const [hit, setHit] = useState(0);

  const [state, setState] = useState({
    data: {
      data: [],
      total: 0,
    },
    params: {
      page: defaultPage,
      pageSize: defaultPageSize,
      filtered: JSON.stringify(convertFilter(filter)),
      sorted: undefined,
      withLimit: options.withLimit || false,
    },
  });
  const qHook = query(state.params);

  // fetch on mount
  useEffect(() => {
    qHook.refetch();
  }, []);

  // jika ada perubahan pada filter, maka akan mengubah params
  // jika ada perubahan pada page, maka akan mengubah params
  useEffect(() => {
    const HitChange = setTimeout(() => {
      setHit(1);
    }, 500);

    return () => clearTimeout(HitChange);
  }, [page, filter]);

  useEffect(() => {
    const hitQuery = setTimeout(() => {
      if (hit === 0) return;
      setState({
        ...state,
        params: {
          ...state.params,
          filtered: JSON.stringify(convertFilter(filter)),
          ...page,
        },
      });
      setHit(0);
    }, 500);

    return () => clearTimeout(hitQuery);
  }, [hit]);

  let totalRows = qHook.data?.total || 0;
  if (qHook.data?.totalRow) totalRows = qHook.data?.totalRow;
  let pageCount = Math.ceil(state.data?.total / state.params.pageSize) || 1;
  if (qHook.data?.pages) pageCount = qHook.data?.pages;

  return {
    isLoading: qHook.isLoading || qHook.isFetching,
    data: qHook?.data?.data || [],
    totalRows,
    pageCount,
    page: state.params.page,
    pageSize: state.params.pageSize,
    getFilteredById: (id) => {
      if (_.isEmpty(filter)) return null;
      if (!Array.isArray(filter)) return null;
      return filter.filter((item) => item.id === id);
    },
    setFiltered: (id, value) => {
      const old = { ...filter };
      const newq = {
        ...filter,
      };
      newq[id] = value;

      setFilter({ ...newq });
    },
    removeFiltered: (id) => {
      setFilter({
        ...filter,
        [id]: undefined,
      });
    },
    setSorted: (key, sort = "asc") => {
      setState({
        ...state,
        params: {
          ...state.params,
          sorted: [{ id: key, desc: sort === "desc" }],
        },
      });
    },
    resetSorted: () => {
      setState({
        ...state,
        params: {
          ...state.params,
          sorted: defaultSorted,
        },
      });
    },
    resetFilter: () => {
      setFilter(defaultFilter);
    },
    setPage: (p) => {
      setPage({
        ...page,
        page: p || 1,
      });
    },
    setPageSize: (p) => {
      setPage({
        ...page,
        pageSize: p || 10,
      });
    },
    refetch: () => {
      qHook.refetch();
    },
  };
}
