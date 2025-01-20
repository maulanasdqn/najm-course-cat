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
      token: {
        access_token: "access_token",
        refresh_token: "refresh_token",
      },
      user: {
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
      token: {
        access_token: "access_token",
        refresh_token: "refresh_token",
      },
      user: {
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
