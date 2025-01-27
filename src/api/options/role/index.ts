import { TRoleOptionResponse } from "./type";

export const getRoleOptions = (): Promise<TRoleOptionResponse> =>
  Promise.resolve({
    data: [
      {
        id: 1,
        name: "Admin",
      },
      {
        id: 2,
        name: "User",
      },
    ]
    ,
    meta: {
      page: 1,
      per_page: 10,
      total: 0,
      total_page: 0,
    },
    status_code: 200,
    version: "1.0.0",
  });
