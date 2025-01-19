import { TUserItem } from "../user/type";

export type TLoginParam = {
  email: string;
  name: string;
  password: string;
};

export type TLoginResponse = {
  data: {
    access_token: string;
    refresh_token: string;
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
};
