import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../../../commons/constants/query-key";
import { getRoles } from "../../../../api/role";
import { TGetRolesParams } from "../../../../api/role/type";

export const useGetRoles = (params: TGetRolesParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.ROLES.LIST, params],
    queryFn: () => getRoles(params),
  });
};
