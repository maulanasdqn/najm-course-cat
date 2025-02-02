export const ENDPOINT = {
  AUTH: {
    LOGIN: `/v1/auth/login`,
    VERIFY_EMAIL: `/v1/auth/verify-email`,
    REGISTER: `/v1/auth/register`,
    REFRESH: `/v1/auth/refresh`,
    SEND_OTP: `/v1/auth/send-otp`,
    FORGOT_PASSWORD: `/v1/auth/forgot-password`,
    RESET_PASSWORD: `/v1/auth/reset-password`,
  },
  USERS: {
    LIST: `/v1/users`,
    CREATE: `/v1/users/create`,
    DETAIL: `/v1/users/:id/detail`,
    UPDATE: `/v1/users/:id/update`,
    DELETE: `/v1/users/:id/delete`,
  },
  BOOKS: {
    LIST: `/v1/books`,
    CREATE: `/v1/books/create`,
    DETAIL: `/v1/books/:id/detail`,
    UPDATE: `/v1/books/:id/update`,
    DELETE: `/v1/books/:id/delete`,
  },
  CATEGORIES: {
    LIST: `/v1/categories`,
    CREATE: `/v1/categories/create`,
    DETAIL: `/v1/categories/:id/detail`,
    UPDATE: `/v1/categories/:id/update`,
    DELETE: `/v1/categories/:id/delete`,
  },
  AUTHORS: {
    LIST: `/v1/authors`,
    CREATE: `/v1/authors/create`,
    DETAIL: `/v1/authors/:id/detail`,
    UPDATE: `/v1/authors/:id/update`,
    DELETE: `/v1/authors/:id/delete`,
  },
};
