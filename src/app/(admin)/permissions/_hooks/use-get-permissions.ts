import { useQuery } from "@tanstack/react-query";
import { getPermissions } from "@/api/permission";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { TGetPermissionsParams } from "@/api/permission/type";

export const useGetPermissions = (params: TGetPermissionsParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.PERMISSIONS.LIST, params],
    queryFn: () => getPermissions(params),
  });
};
