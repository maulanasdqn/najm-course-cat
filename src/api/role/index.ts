import { PERMISSIONS } from "@/commons/constants/permissions";
import {
  TRoleCreateRequest,
  TRoleDetailResponse,
  TRoleGetRequest,
  TRoleListResponse,
  TRoleUpdateRequest,
} from "./type";

export const getRoles = (params: TRoleGetRequest): Promise<TRoleListResponse> => {
  console.log(params);
  return Promise.resolve({
    status_code: 200,
    data: {
      items: [
        {
          created_at: new Date().toISOString(),
          id: "1",
          name: "Admin",
          permissions: [
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
          updated_at: new Date().toISOString(),
        },
        {
          created_at: new Date().toISOString(),
          id: "2",
          name: "Super Admin",
          permissions: [
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
          updated_at: new Date().toISOString(),
        },
      ],
      meta: {
        total_page: 1,
        total: 2,
        page: 1,
        per_page: 10,
      },
    },
    version: "1.0.0",
  });
};

export const getRole = (id: string): Promise<TRoleDetailResponse> => {
  console.log(id);
  return Promise.resolve({
    status_code: 200,
    data: {
      created_at: new Date().toISOString(),
      id: "1",
      name: "Admin",
      permissions: [
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
      updated_at: new Date().toISOString(),
    },
    version: "1.0.0",
  });
};

export const createRole = (data: TRoleCreateRequest): Promise<TRoleDetailResponse> => {
  console.log(data);
  return Promise.resolve({
    status_code: 200,
    data: {
      created_at: new Date().toISOString(),
      id: "1",
      name: "Admin",
      permissions: [
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
      updated_at: new Date().toISOString(),
    },
    version: "1.0.0",
  });
};

export const updateRole = (id: string, data: TRoleUpdateRequest): Promise<TRoleDetailResponse> => {
  console.log(id, data);
  return Promise.resolve({
    status_code: 200,
    data: {
      created_at: new Date().toISOString(),
      id: "1",
      name: "Admin",
      permissions: [
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
      updated_at: new Date().toISOString(),
    },
    version: "1.0.0",
  });
};

export const deleteRole = (id: string): Promise<TRoleDetailResponse> => {
  console.log(id);
  return Promise.resolve({
    status_code: 200,
    data: {
      created_at: new Date().toISOString(),
      id: "1",
      name: "Admin",
      permissions: [
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
      updated_at: new Date().toISOString(),
    },
    version: "1.0.0",
  });
};
