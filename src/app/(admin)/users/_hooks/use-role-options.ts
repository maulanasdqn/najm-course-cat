import { useQuery } from "@tanstack/react-query";
import { getRoles } from "@/api/role";
import { QUERY_KEY } from "@/commons/constants/query-key";

export const useRoleOptions = () => {
    const { data: rolesData, isLoading } = useQuery({
        queryKey: [QUERY_KEY.ROLES.LIST],
        queryFn: () => getRoles({ page: 1, limit: 100 }),
    });

    const options = rolesData?.data.map(role => ({
        value: role.id,
        label: role.name
    })) ?? [];

    return {
        options,
        isLoading
    };
};