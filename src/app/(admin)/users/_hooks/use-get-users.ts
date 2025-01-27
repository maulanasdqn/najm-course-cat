import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/user";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { TGetUsersParams } from "@/api/user/type";

export const useGetUsers = (params: TGetUsersParams) => {
    return useQuery({
        queryKey: [
            QUERY_KEY.USERS.LIST,
            params.page,
            params.limit,
            params.search,
            params.sort,
            params.order
        ],
        queryFn: () => getUsers(params),
    });
};