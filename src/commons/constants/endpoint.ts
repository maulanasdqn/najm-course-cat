import { PREFIX } from "./prefix";

export const ENDPOINT = {
  AUTH: {
    LOGIN: `/v1${PREFIX.AUTH}/login`,
    VERIFY_EMAIL: `/v1${PREFIX.AUTH}/verify-email`,
    REGISTER: `/v1${PREFIX.AUTH}/register`,
    REFRESH: `/v1${PREFIX.AUTH}/refresh`,
    SEND_OTP: `/v1${PREFIX.AUTH}/send-otp`,
  },
  USERS: {
    LIST: `/v1${PREFIX.USERS}`,
    CREATE: `/v1${PREFIX.USERS}/create`,
    DETAIL: `/v1${PREFIX.USERS}/:id/detail`,
    UPDATE: `/v1${PREFIX.USERS}/:id/update`,
    DELETE: `/v1${PREFIX.USERS}/:id/delete`,
  },
  BOOKS: {
    LIST: `/v1${PREFIX.BOOKS}`,
    CREATE: `/v1${PREFIX.BOOKS}/create`,
    DETAIL: `/v1${PREFIX.BOOKS}/:id/detail`,
    UPDATE: `/v1${PREFIX.BOOKS}/:id/update`,
    DELETE: `/v1${PREFIX.BOOKS}/:id/delete`,
  },
  CATEGORIES: {
    LIST: `/v1${PREFIX.CATEGORIES}`,
    CREATE: `/v1${PREFIX.CATEGORIES}/create`,
    DETAIL: `/v1${PREFIX.CATEGORIES}/:id/detail`,
    UPDATE: `/v1${PREFIX.CATEGORIES}/:id/update`,
    DELETE: `/v1${PREFIX.CATEGORIES}/:id/delete`,
  },
  AUTHORS: {
    LIST: `/v1${PREFIX.AUTHORS}`,
    CREATE: `/v1${PREFIX.AUTHORS}/create`,
    DETAIL: `/v1${PREFIX.AUTHORS}/:id/detail`,
    UPDATE: `/v1${PREFIX.AUTHORS}/:id/update`,
    DELETE: `/v1${PREFIX.AUTHORS}/:id/delete`,
  },
};
