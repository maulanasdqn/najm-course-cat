import { TResponseData } from "@/commons/types/response";
import {
  TGetUsersParams,
  TUserUpdateRequest,
  TUserDetailResponse,
  TUserCreateRequest,
  TUserPaginateResponse,
} from "./type";
import { PERMISSIONS } from "@/commons/constants/permissions";

export const getUsers = (params: TGetUsersParams): Promise<TUserPaginateResponse> => {
  console.log(params);
  return Promise.resolve({
    data: {
      items: [
        {
          avatar: "https://i.pravatar.cc/150?img=1",
          created_at: new Date().toISOString(),
          email: "admin@mail.com",
          fullname: "Admin",
          id: "1",
          password: "password",
          phone_number: "08123456789",
          referral_code: "123456789",
          referred_by: "1",
          role: {
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
          updated_at: new Date().toISOString(),
        },
      ],
      meta: {
        page: 1,
        per_page: 10,
        total: 0,
        total_page: 0,
      },
    },
    status_code: 200,
    version: "1.0.0",
  });
};

export const getUser = (id: string): Promise<TUserDetailResponse> => {
  console.log(id);
  return Promise.resolve({
    data: {
      avatar: "https://i.pravatar.cc/150?img=1",
      created_at: new Date().toISOString(),
      email: "admin@mail.com",
      fullname: "Admin",
      id: "1",
      password: "password",
      phone_number: "08123456789",
      referral_code: "123456789",
      referred_by: "1",
      role: {
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
      updated_at: new Date().toISOString(),
    },
    status_code: 200,
    version: "1.0.0",
  });
};

export const createUser = (data: TUserCreateRequest): Promise<TResponseData<null>> => {
  console.log(data);
  if (!data.fullname.includes("bagus")) {
    throw {
      status_code: 400,
      error_message: "Validation failed",
      stack_trace: "Validation failed",
      errors: [
        {
          key: "fullname",
          message: "Name harus mangandung 'bagus'",
        },
        {
          key: "email",
          message: "Email harus DOT",
        },
      ],
      version: "test",
    };
  }
  return Promise.resolve({
    data: null,
    status_code: 200,
    version: "1.0.0",
  });
};

export const updateUser = (id: string, data: TUserUpdateRequest): Promise<TResponseData<null>> => {
  console.log(id, data);
  return Promise.resolve({
    data: null,
    status_code: 200,
    version: "1.0.0",
  });
};

export const deleteUser = (id: string): Promise<TResponseData<null>> => {
  console.log(id);
  return Promise.resolve({
    data: null,
    status_code: 200,
    version: "1.0.0",
  });
};
