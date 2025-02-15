import { ENDPOINT } from "@/commons/constants/endpoint";
import { api } from "@/libs/axios/api";
import {
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

export const postLogin = async (payload: TLoginParam): Promise<TLoginResponse> => {
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
  const { data } = await api({
    url: ENDPOINT.AUTH.NEW_PASSWORD,
    method: "POST",
    data: payload,
  });
  return data;
};
