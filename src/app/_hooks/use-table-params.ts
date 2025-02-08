import { useSearchParams } from "react-router-dom";

interface TableParams {
  page: number;
  limit: number;
  search: string;
  sort?: string;
  order?: "asc" | "desc";
}

interface UseTableParamsProps {
  defaultLimit?: number;
}

export const useTableParams = ({ defaultLimit = 10 }: UseTableParamsProps = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || defaultLimit;
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || undefined;
  const order = searchParams.get("order") as "asc" | "desc" | undefined;

  const currentParams: TableParams = {
    page,
    limit,
    search,
    ...(sort && { sort }),
    ...(order && { order }),
  };

  const setParams = (params: Partial<TableParams>) => {
    const newParams = new URLSearchParams(searchParams);

    // Update only provided params
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        newParams.set(key, String(value));
      } else {
        newParams.delete(key);
      }
    });

    setSearchParams(newParams);
  };

  return {
    params: currentParams,
    setParams,
  };
};
