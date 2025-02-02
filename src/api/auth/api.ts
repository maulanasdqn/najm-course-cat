import { ENDPOINT } from "@/commons/constants/endpoint";
import { api } from "@/libs/axios/api";
import {
  TLoginOidcParam,
  TLoginParam,
  TLoginResponse,
  TVerifyEmailParam,
  TVerifyEmailResponse,
  TRegisterParam,
  TRegisterResponse,
  TSendOtpParam,
  TSendOtpResponse,
  TForgotPasswordParam,
  TForgotPasswordResponse,
  TResetPasswordParam,
  TResetPasswordResponse,
} from "./type";
import { PERMISSIONS } from "@/commons/constants/permissions";

export const postLogin = async (payload: TLoginParam): Promise<TLoginResponse> => {
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
        phone_number: "08123456789",
        student_type: "student_type",
        referral_code: "referral_code",
        referred_by: "referred_by",
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
  const { data } = await api({
    url: ENDPOINT.AUTH.REGISTER,
    method: "POST",
    data: payload,
  });
  return data;
};

export const postVerifyEmail = async (
  payload: TVerifyEmailParam,
): Promise<TVerifyEmailResponse> => {
  const { data } = await api({
    url: ENDPOINT.AUTH.VERIFY_EMAIL,
    method: "POST",
    data: payload,
  });
  return data;
};

export const postSendOtp = async (payload: TSendOtpParam): Promise<TSendOtpResponse> => {
  const { data } = await api({
    url: ENDPOINT.AUTH.SEND_OTP,
    method: "POST",
    data: payload,
  });
  return data;
};

export const postForgotPassword = async (
  payload: TForgotPasswordParam,
): Promise<TForgotPasswordResponse> => {
  return {
    message: "Email telah dikirim",
  };
  const { data } = await api({
    url: ENDPOINT.AUTH.FORGOT_PASSWORD,
    method: "POST",
    data: payload,
  });
  return data;
};

export const postResetPassword = async (
  payload: TResetPasswordParam,
): Promise<TResetPasswordResponse> => {
  return {
    message: "Password berhasil diubah",
  };
  const { data } = await api({
    url: ENDPOINT.AUTH.RESET_PASSWORD,
    method: "POST",
    data: payload,
  });
  return data;
};
