import { ENDPOINT } from "@/commons/constants/endpoint";
import { api } from "@/libs/axios/api";
import {
  TLoginOidcParam,
  TLoginParam,
  TLoginResponse,
  TRegisterParam,
  TRegisterResponse,
} from "./type";
import { PERMISSIONS } from "@/commons/constants/permissions";

export const postLogin = async (payload: TLoginParam): Promise<TLoginResponse> => {
  return {
    data: {
      access_token: "access_token",
      refresh_token: "refresh_token",
      user: {
        id: "1",
        name: "Admin",
        email: "admin@mail.com",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        roles: [
          {
            id: "1",
            key: "admin",
            name: "Admin",
            permissions: [
              {
                id: "1",
                key: PERMISSIONS.USERS.READ_USERS,
                name: PERMISSIONS.USERS.READ_USERS,
              },
              {
                id: "2",
                key: PERMISSIONS.PERMISSIONS.READ_PERMISSIONS,
                name: PERMISSIONS.PERMISSIONS.READ_PERMISSIONS,
              },
              {
                id: "3",
                key: PERMISSIONS.ROLES.READ_ROLES,
                name: PERMISSIONS.ROLES.READ_ROLES,
              },
            ],
          },
        ],
      },
    },
  };
  const { data } = await api({
    url: ENDPOINT.AUTH.LOGIN,
    method: "POST",
    data: payload,
  });
  return data;
};

export const postLoginOidc = async (payload: TLoginOidcParam): Promise<TLoginResponse> => {
  return {
    data: {
      access_token: "access_token",
      refresh_token: "refresh_token",
      user: {
        id: "1",
        name: "Admin",
        email: "admin@mail.com",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        roles: [
          {
            id: "1",
            key: "admin",
            name: "Admin",
            permissions: [
              {
                id: "1",
                key: PERMISSIONS.USERS.READ_USERS,
                name: PERMISSIONS.USERS.READ_USERS,
              },
              {
                id: "2",
                key: PERMISSIONS.PERMISSIONS.READ_PERMISSIONS,
                name: PERMISSIONS.PERMISSIONS.READ_PERMISSIONS,
              },
              {
                id: "3",
                key: PERMISSIONS.ROLES.READ_ROLES,
                name: PERMISSIONS.ROLES.READ_ROLES,
              },
            ],
          },
        ],
      },
    },
  };
  const { data } = await api({
    url: ENDPOINT.AUTH.LOGIN,
    method: "POST",
    data: payload,
  });
  return data;
};

export const postRegister = async (payload: TRegisterParam): Promise<TRegisterResponse> => {
  return Promise.resolve({
    message: "Register Success",
  });
  const { data } = await api({
    url: ENDPOINT.AUTH.REGISTER,
    method: "POST",
    data: payload,
  });
  return data;
};
