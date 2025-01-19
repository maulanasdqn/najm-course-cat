import { PERMISSIONS } from "@/commons/constants/permissions";
import {
  TPermissionCreateRequest,
  TPermissionDetailResponse,
  TGetPermissionsParams,
  TPermissionListResponse,
  TPermissionUpdateRequest,
} from "./type";

export const getPermissions = (params: TGetPermissionsParams): Promise<TPermissionListResponse> => {
  console.log(params);
  return Promise.resolve({
    status_code: 200,
    data: {
      items: [
        {
          created_at: new Date().toISOString(),
          id: "1",
          name: PERMISSIONS.USERS.READ_USERS,
          updated_at: new Date().toISOString(),
        },
        {
          created_at: new Date().toISOString(),
          id: "2",
          name: PERMISSIONS.PERMISSIONS.READ_PERMISSIONS,
          updated_at: new Date().toISOString(),
        },
        {
          created_at: new Date().toISOString(),
          id: "3",
          name: PERMISSIONS.ROLES.READ_ROLES,
          updated_at: new Date().toISOString(),
        },
      ],
      meta: {
        total_page: 2,
        total: 12,
        page: 1,
        per_page: 10,
      },
    },
    version: "1.0.0",
  });
};

export const getPermission = (id: string): Promise<TPermissionDetailResponse> => {
  console.log(id);
  return Promise.resolve({
    status_code: 200,
    data: {
      created_at: new Date().toISOString(),
      id: "1",
      name: PERMISSIONS.USERS.READ_USERS,
      updated_at: new Date().toISOString(),
    },
    version: "1.0.0",
  });
};

export const createPermission = (
  data: TPermissionCreateRequest,
): Promise<TPermissionDetailResponse> => {
  console.log(data);
  return Promise.resolve({
    status_code: 200,
    data: {
      created_at: new Date().toISOString(),
      id: "1",
      name: PERMISSIONS.USERS.READ_USERS,
      updated_at: new Date().toISOString(),
    },
    version: "1.0.0",
  });
};

export const updatePermission = (
  id: string,
  data: TPermissionUpdateRequest,
): Promise<TPermissionDetailResponse> => {
  console.log(id, data);
  return Promise.resolve({
    status_code: 200,
    data: {
      created_at: new Date().toISOString(),
      id: "1",
      name: PERMISSIONS.USERS.READ_USERS,
      updated_at: new Date().toISOString(),
    },
    version: "1.0.0",
  });
};

export const deletePermission = (id: string): Promise<TPermissionDetailResponse> => {
  console.log(id);
  return Promise.resolve({
    status_code: 200,
    data: {
      created_at: new Date().toISOString(),
      id: "1",
      name: PERMISSIONS.USERS.READ_USERS,
      updated_at: new Date().toISOString(),
    },
    version: "1.0.0",
  });
};
