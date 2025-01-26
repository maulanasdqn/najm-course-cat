import { TUserItem } from "../user/type";

export type TLoginParam = {
  email: string;
  password: string;
  remember?: boolean;
};

export type TLoginResponse = {
  data: {
    token: {
      access_token: string;
      refresh_token: string;
    };
    user: TUserItem;
  };
};

export type TLoginOidcParam = {
  code: string;
};

export type TLoginOidcResponse = {
  data: {
    access_token: string;
    refresh_token: string;
    user: TUserItem;
  };
};

export type TRegisterParam = {
  avatar?: string;
  created_at: string;
  email: string;
  fullname: string;
  password: string;
  phone_number: string;
  referral_code: string;
  referred_by: string;
  student_type: string;
  interests: string[];
};

export type TRegisterResponse = {
  message: string;
  version: string;
};

export type TVerifyEmailParam = {
  otp: string;
  email: string;
};

export type TVerifyEmailResponse = {
  message: string;
};

export type TSendOtpParam = {
  email: string;
};

export type TSendOtpResponse = {
  message: string;
};
